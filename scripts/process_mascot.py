"""Turns the raw AI-generated mascot drawings in gorseller/ into clean, aligned web frames.

For every image: removes sprite-sheet guide lines, makes the white background transparent,
then aligns all frames of an animation (same canvas, feet on the same ground line) and saves WebP.

Usage:  python scripts/process_mascot.py
Edit GROUPS below when new drawings are added.
"""

from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "gorseller"
OUT = ROOT / "public" / "mascot" / "su"
ICONS = ROOT / "public" / "icons"

TARGET_HEIGHT = 640  # px height of the tallest frame in a group
BG_COLOR = (255, 251, 245)  # --bg, used for opaque app icons

# animation name -> source files in play order
GROUPS = {
    "idle": ["normal.png"],
    "explain": ["gösterme.png"],
    "think": ["düşünme.png"],
    "celebrate": ["sevinç.png"],
    "surprise": ["şaşırma.png"],
    "walk": [f"yürüme{i}.png" for i in range(1, 7)],
    "newyear-celebrate": ["yılbaşı1.png.jpg"] + [f"yılbaşı{i}.png" for i in range(2, 7)],
}


def load_rgb(path: Path) -> np.ndarray:
    im = Image.open(path).convert("RGBA")
    white = Image.new("RGBA", im.size, (255, 255, 255, 255))
    white.alpha_composite(im)
    return np.asarray(white.convert("RGB")).astype(np.int16)


def remove_guide_lines(rgb: np.ndarray) -> np.ndarray:
    """Erase long straight rows/columns (sprite-sheet borders, ground lines) and bridge the gaps they leave."""
    rgb = rgb.copy()
    lum = rgb.mean(axis=2)
    dark = lum < 110
    h, w = dark.shape

    # Guide lines run (almost) edge to edge; hair never does. Include the anti-aliased rim around them.
    def with_rim(idx: np.ndarray, limit: int) -> np.ndarray:
        rim = {j for i in idx for j in range(i - 3, i + 4) if 0 <= j < limit}
        return np.array(sorted(rim), dtype=int)

    line_rows = with_rim(np.where(dark.mean(axis=1) > 0.85)[0], h)
    # Frame borders can be partial, but only sit near the edges — a straight body line in the middle is not one.
    edge = max(4, int(w * 0.06))
    cols = np.where(dark.mean(axis=0) > 0.5)[0]
    line_cols = with_rim(cols[(cols < edge) | (cols >= w - edge)], w)

    def bridge_rows(rows: np.ndarray):
        row_set = set(rows.tolist())
        for y in rows:
            above = y - 1
            while above in row_set:
                above -= 1
            below = y + 1
            while below in row_set:
                below += 1
            for x in range(w):
                keep = 0 <= above and below < h and dark[above, x] and dark[below, x]
                rgb[y, x] = rgb[above, x] if keep else 255

    bridge_rows(line_rows)
    for x in line_cols:
        rgb[:, x] = 255
    return rgb


def to_rgba(rgb: np.ndarray) -> np.ndarray:
    """White background connected to the image border becomes transparent; edges get soft alpha."""
    lum = rgb.mean(axis=2)
    whiteish = lum > 232
    labels, _ = ndimage.label(whiteish)
    border = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    background = np.isin(labels, border[border > 0])
    # Large enclosed white areas (between legs, arm and body) are background too; eyes and teeth are small.
    sizes = ndimage.sum(whiteish, labels, range(1, labels.max() + 1))
    big = np.where(sizes > whiteish.size * 0.0028)[0] + 1  # tuned: eye whites of the surprised face stay below this
    background |= np.isin(labels, big)

    alpha = np.where(background, 0, 255).astype(np.float32)
    # Soften the 2px rim next to the background so there is no white halo on dark mode.
    rim = ndimage.binary_dilation(background, iterations=2) & ~background
    alpha[rim] = np.clip((255 - lum[rim]) * 2.2, 0, 255)

    # Drop tiny specks left from erased lines.
    solid = alpha > 40
    labels, n = ndimage.label(solid)
    if n:
        sizes = ndimage.sum(solid, labels, range(1, n + 1))
        tiny = np.isin(labels, np.where(sizes < 12)[0] + 1)
        alpha[tiny] = 0

    return np.dstack([rgb.astype(np.uint8), alpha.astype(np.uint8)])


def bbox(rgba: np.ndarray):
    ys, xs = np.where(rgba[:, :, 3] > 20)
    return ys.min(), ys.max() + 1, xs.min(), xs.max() + 1


def process_group(name: str, files: list[str]):
    frames = []
    for f in files:
        rgba = to_rgba(remove_guide_lines(load_rgb(SRC / f)))
        y0, y1, x0, x1 = bbox(rgba)
        crop = rgba[y0:y1, x0:x1]
        # Horizontal anchor = median x of the drawing, so the figure doesn't jitter between frames.
        cx = float(np.median(np.where(crop[:, :, 3] > 20)[1]))
        frames.append((crop, cx))

    scale = TARGET_HEIGHT / max(c.shape[0] for c, _ in frames)
    left = max(cx for _, cx in frames) * scale
    right = max(c.shape[1] - cx for c, cx in frames) * scale
    pad = 12
    width = int(left + right) + 2 * pad
    height = TARGET_HEIGHT + 2 * pad

    OUT.mkdir(parents=True, exist_ok=True)
    for i, (crop, cx) in enumerate(frames, start=1):
        img = Image.fromarray(crop, "RGBA")
        img = img.resize((max(1, round(img.width * scale)), max(1, round(img.height * scale))), Image.LANCZOS)
        canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        x = round(pad + left - cx * scale)
        y = height - pad - img.height  # feet on the same ground line
        canvas.alpha_composite(img, (x, y))
        canvas.save(OUT / f"{name}_{i:02d}.webp", "WEBP", quality=88, method=6)
    print(f"{name}: {len(frames)} frame(s) {width}x{height}")


def process_head():
    rgba = to_rgba(load_rgb(SRC / "kafa.jpg"))
    y0, y1, x0, x1 = bbox(rgba)
    crop = Image.fromarray(rgba[y0:y1, x0:x1], "RGBA")
    side = max(crop.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.alpha_composite(crop, ((side - crop.width) // 2, (side - crop.height) // 2))

    OUT.mkdir(parents=True, exist_ok=True)
    ICONS.mkdir(parents=True, exist_ok=True)
    square.resize((256, 256), Image.LANCZOS).save(OUT / "head.webp", "WEBP", quality=90, method=6)
    square.resize((64, 64), Image.LANCZOS).save(ICONS / "favicon-64.png")

    # App icons need an opaque background (iOS turns transparency black) and safe-zone padding.
    for size, inset in [(180, 0.12), (192, 0.12), (512, 0.12), (512, 0.22)]:
        icon = Image.new("RGBA", (size, size), BG_COLOR + (255,))
        inner = round(size * (1 - 2 * inset))
        icon.alpha_composite(square.resize((inner, inner), Image.LANCZOS), ((size - inner) // 2,) * 2)
        name = "apple-touch-icon.png" if size == 180 else f"icon-{size}{'-maskable' if inset > 0.15 else ''}.png"
        icon.convert("RGB").save(ICONS / name)
    print("head + icons done")


if __name__ == "__main__":
    for group, files in GROUPS.items():
        process_group(group, files)
    process_head()

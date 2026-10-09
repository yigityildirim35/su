"""Rewrites the Material Symbols <link> in index.html so it only downloads the icons the app uses.

Scans src/ for quoted snake_case strings and keeps those that are real Material Symbols names.
Run after adding a new <Icon name="…" />:  python scripts/update_icons.py
"""

import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CODEPOINTS = "https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsOutlined%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints"

valid = {line.split()[0] for line in urllib.request.urlopen(CODEPOINTS).read().decode().splitlines() if line.strip()}
found = set()
for f in (ROOT / "src").rglob("*.ts*"):
    found |= set(re.findall(r"['\"]([a-z][a-z0-9_]{2,})['\"]", f.read_text(encoding="utf-8")))
icons = sorted(found & valid)

url = (
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..600,0..1,0"
    f"&icon_names={','.join(icons)}&display=block"
)
html_path = ROOT / "index.html"
html = html_path.read_text(encoding="utf-8")
html = re.sub(r'(<link id="icon-font" href=")[^"]*(")', lambda m: m.group(1) + url.replace("&", "&amp;") + m.group(2), html)
html_path.write_text(html, encoding="utf-8")
print(f"{len(icons)} icons")

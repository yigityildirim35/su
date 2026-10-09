import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { LEVEL_NAMES, PageHeader, Segmented } from '../components/ui'
import { lessons, OVERVIEW_ID } from '../content/lessons'
import { tenseLessons } from '../content/tenses'
import { LEVELS, useSettings, type Level } from '../store/settings'

const TENSE_IDS = new Set(tenseLessons.map((t) => t.id))

export function Lessons() {
  const { l, tx, settings } = useSettings()
  const [params, setParams] = useSearchParams()
  const fromUrl = params.get('level') as Level | null
  const level: Level = fromUrl && LEVELS.includes(fromUrl) ? fromUrl : settings.level
  const list = lessons.filter((x) => x.level === level && x.id !== OVERVIEW_ID)

  return (
    <div className="rise">
      <PageHeader title={l('Konular', 'Lessons')} subtitle={l('A1’den B2’ye, kısa ve akılda kalıcı anlatımlar.', 'Short, memorable lessons from A1 to B2.')} />

      <div className="grid gap-3 sm:grid-cols-2">
        <Link to={`/lessons/${OVERVIEW_ID}`} className="card flex items-center gap-4 bg-primary-soft/40 p-4 transition hover:shadow-lift">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary">
            <Icon name="history_edu" size={26} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-bold text-primary">{l('12 Zaman', 'The 12 Tenses')}</p>
            <p className="text-[13px] text-text-2">{l('Bütün zamanlar tek tabloda', 'All tenses on one page')}</p>
          </div>
          <Icon name="arrow_forward" className="text-primary" />
        </Link>
        <Link to="/street" className="card flex items-center gap-4 bg-accent-soft/40 p-4 transition hover:shadow-lift">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <Icon name="forum" size={26} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-bold text-accent">{l('Sokak İngilizcesi', 'Street English')}</p>
            <p className="text-[13px] text-text-2">{l('Yerliler gerçekte nasıl konuşuyor?', 'How native speakers really talk')}</p>
          </div>
          <Icon name="arrow_forward" className="text-accent" />
        </Link>
      </div>

      <Segmented className="mt-6" value={level} onChange={(lv) => setParams({ level: lv }, { replace: true })} options={LEVELS.map((lv) => ({ value: lv, label: lv }))} />
      <p className="eyebrow mb-3 mt-5 text-muted">
        {level} · {tx(LEVEL_NAMES[level])} · {l(`${list.length} konu`, `${list.length} lessons`)}
      </p>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 [&>*]:min-w-0">
        {list.map((lesson, i) => (
          <li key={lesson.id}>
            <Link to={`/lessons/${lesson.id}`} className="card flex h-full items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lift">
              <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-3 text-sm font-bold text-primary">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-bold">
                  <span className="truncate">{lesson.title}</span>
                  {TENSE_IDS.has(lesson.id) && <span className="tag tag-lav shrink-0">{l('Zaman', 'Tense')}</span>}
                </p>
                <p className="truncate text-[13px] text-muted">{tx(lesson.subtitle)}</p>
              </div>
              <Icon name="chevron_right" className="text-outline" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

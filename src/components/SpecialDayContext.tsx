import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { getSpecialDay, type SpecialDay } from '../lib/specialDays'
import { useSettings } from '../store/settings'

const SpecialDayContext = createContext<SpecialDay | null>(null)

export function SpecialDayProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings()
  const day = useMemo(() => (settings.specialDays ? getSpecialDay() : null), [settings.specialDays])

  useEffect(() => {
    if (day) document.documentElement.dataset.special = day.id
    else delete document.documentElement.dataset.special
  }, [day])

  return <SpecialDayContext.Provider value={day}>{children}</SpecialDayContext.Provider>
}

export function useSpecialDay() {
  return useContext(SpecialDayContext)
}

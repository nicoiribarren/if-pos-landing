import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in view using IntersectionObserver.
 * No scroll listeners (taste-skill 5.D).
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    // Sections mount lazily: keep attaching until every id is observed.
    const observed = new Set<string>()
    let retry = 0
    const attach = () => {
      for (const id of ids) {
        if (observed.has(id)) continue
        const el = document.getElementById(id)
        if (el) {
          observer.observe(el)
          observed.add(id)
        }
      }
      if (observed.size < ids.length && retry < 40) {
        retry += 1
        timer = window.setTimeout(attach, 500)
      }
    }
    let timer = window.setTimeout(attach, 0)

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [ids])

  return active
}

const WEEK = 7 * 24 * 3600 * 1000

// 권장 페이스(남은 한도/남은 시간) ÷ 현재 페이스(사용량/경과시간)
export function paceRatio(percentUsed: number, resetsAtMs: number, nowMs: number): number {
  const t = Math.min(Math.max(1 - (resetsAtMs - nowMs) / WEEK, 0), 1)
  const u = Math.min(Math.max(percentUsed / 100, 0), 1)
  if (u >= 1) return 0
  if (t >= 1) return Infinity
  const current = u / t
  return current === 0 ? Infinity : (1 - u) / (1 - t) / current
}

export function arrow(ratio: number): { text: string; color: string } {
  if (ratio >= 2) return { text: '⇈', color: 'blue' }
  if (ratio > 1.2) return { text: '↑', color: 'blue' }
  if (ratio > 1 / 1.2) return { text: '→', color: 'gray' }
  if (ratio > 0.5) return { text: '↓', color: 'red' }
  return { text: '⇊', color: 'red' }
}

// 지난 리셋 이후 경과한 주의 비율 (%)
export const elapsedPercent = (resetsAtMs: number, nowMs: number) =>
  Math.min(Math.max(1 - (resetsAtMs - nowMs) / WEEK, 0), 1) * 100

import { test, expect } from 'claude-code/testing'
import { arrow, paceRatio, elapsedPercent } from './pace'

const DAY = 24 * 3600 * 1000
const now = 1_000_000_000_000

test('pace arrows', () => {
  // 3.5일 경과(50%), 10% 사용 → 권장 0.9/0.5 vs 현재 0.2 → 9배 → ⇈
  expect(arrow(paceRatio(10, now + 3.5 * DAY, now)).text).toBe('⇈')
  // 50% 경과, 50% 사용 → 1배 → →
  expect(arrow(paceRatio(50, now + 3.5 * DAY, now)).text).toBe('→')
  // 50% 경과, 80% 사용 → 0.4/1.6 = 0.25 → ⇊
  expect(arrow(paceRatio(80, now + 3.5 * DAY, now)).text).toBe('⇊')
  expect(arrow(paceRatio(100, now + DAY, now)).text).toBe('⇊')
  expect(arrow(paceRatio(0, now + DAY, now)).text).toBe('⇈')
})

test('elapsed', () => {
  expect(elapsedPercent(now + 6.3 * DAY, now).toFixed(0)).toBe('10')
})

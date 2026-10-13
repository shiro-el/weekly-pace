import { atom, read, update } from 'claude-code'
import type { Register, SessionRateLimit } from 'claude-code'

import type { Week } from '../types'
import { arrow, paceRatio, elapsedPercent } from './pace'

const week = atom({ plugin: 'weekly-pace', key: 'week' } as const, null)

const pick = (limits: SessionRateLimit[]): Week | null => {
  const w = limits.find(l => l.kind === 'seven_day')
  return w?.resetsAt ? { percentUsed: w.percentUsed, resetsAt: w.resetsAt } : null
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const r = await next(e)
    const u = await $.session.usage()
    await update($, week, () => pick(u.rateLimits))
    return r
  })

  on('session.measure', async ($, e, next) => {
    await update($, week, () => pick(e.rateLimits))
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const w = await read($, week)
    if (e.props.hasSurvey || w === null) return next(e)

    const now = await $.clock.now()
    const resetsAt = Date.parse(w.resetsAt)
    const a = arrow(paceRatio(w.percentUsed, resetsAt, now))
    const elapsed = elapsedPercent(resetsAt, now)
    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box>
        <Text color={a.color} bold>{a.text}</Text>
        <Text dimColor>
          {' '}Weekly {w.percentUsed}% / {elapsed.toFixed(0)}%
        </Text>
      </Box>
    )
  })
}

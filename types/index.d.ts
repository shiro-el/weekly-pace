export type Week = { percentUsed: number; resetsAt: string }

declare module 'claude-code' {
  interface PluginState {
    'weekly-pace': { week: Week | null }
  }
}

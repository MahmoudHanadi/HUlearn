import { practicePlugins } from './plugins'
import type { PracticeActivity, PracticePlugin } from './types'

const registry = new Map<PracticeActivity['type'], PracticePlugin>()

for (const plugin of practicePlugins) {
  registry.set(plugin.type, plugin)
}

export function getPracticePlugin(activityType: PracticeActivity['type']) {
  return registry.get(activityType) ?? null
}


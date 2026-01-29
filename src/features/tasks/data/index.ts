// Central data export point
export type { OrganizationalTask, Sprint, TaskStats, VulnerabilityInstance, LinkedVulnerability } from './organizational-tasks'
export type { Task } from './schema'
export { taskSchema } from './schema'
export { tasks } from './tasks'
export { mockOrganizationalTasks, getOrganizationalTaskStats } from './mock-organizational-tasks'
export { mockSprints, getTaskStats } from './mock-tasks'

// Consolidate mock data exports
import { mockOrganizationalTasks } from './mock-organizational-tasks'
import { tasks as legacyMockTasks, mockSprints as legacyMockSprints } from './mock-tasks'

export const mockData = {
  organizational: mockOrganizationalTasks,
  tasks: legacyMockTasks,
  sprints: legacyMockSprints,
}

// Consolidated stats functions
import { getOrganizationalTaskStats } from './mock-organizational-tasks'
import { getTaskStats } from './mock-tasks'

export const statsFunctions = {
  organizational: getOrganizationalTaskStats,
  tasks: getTaskStats,
}

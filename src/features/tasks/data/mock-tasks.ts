import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(12345)

export const tasks = Array.from({ length: 100 }, () => {
  const statuses = [
    'todo',
    'in progress',
    'done',
    'canceled',
    'backlog',
  ] as const
  const labels = ['bug', 'feature', 'documentation'] as const
  const priorities = ['low', 'medium', 'high'] as const

  return {
    id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
    title: faker.lorem.sentence({ min: 5, max: 15 }),
    status: faker.helpers.arrayElement(statuses),
    label: faker.helpers.arrayElement(labels),
    priority: faker.helpers.arrayElement(priorities),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    assignee: faker.person.fullName(),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    dueDate: faker.date.future(),
  }
})

export const mockSprints = [
  {
    id: 'sprint-1',
    name: 'Sprint 1 - Security Foundation',
    state: 'active' as const,
    startDate: '2024-01-15',
    endDate: '2024-01-29',
    goal: 'Complete critical vulnerability fixes and establish security baseline'
  },
  {
    id: 'sprint-2',
    name: 'Sprint 2 - Enhancement',
    state: 'future' as const,
    startDate: '2024-01-30',
    endDate: '2024-02-13',
    goal: 'Implement advanced security features and improve monitoring'
  },
  {
    id: 'sprint-3',
    name: 'Sprint 3 - Optimization',
    state: 'future' as const,
    startDate: '2024-02-14',
    endDate: '2024-02-28',
    goal: 'Optimize performance and automate security processes'
  }
]

export const getTaskStats = (tasks: any[]) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const inProgressTasks = tasks.filter(t => t.status === 'in progress').length
  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length
  const overdueTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done').length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return {
    totalTasks,
    completedTasks,
    inProgressTasks,
    highPriorityTasks,
    overdueTasks,
    completionRate
  }
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Users, Target, AlertTriangle } from 'lucide-react'
import { OrganizationalTask } from '../data/organizational-tasks'

interface Sprint {
  id: string
  name: string
  state: 'active' | 'closed' | 'future'
  startDate?: string
  endDate?: string
  goal?: string
}

interface TasksBacklogProps {
  sprints: Sprint[]
  tasks: OrganizationalTask[]
}

export function TasksBacklog({ sprints, tasks }: TasksBacklogProps) {
  const activeSprint = sprints.find(sprint => sprint.state === 'active')
  const futureSprints = sprints.filter(sprint => sprint.state === 'future')
  
  const getSprintTasks = (sprintId?: string) => {
    if (!sprintId) return []
    return tasks.filter(task => task.sprint === sprintId)
  }

  const getSprintStats = (sprintId?: string) => {
    const sprintTasks = getSprintTasks(sprintId)
    const completed = sprintTasks.filter(task => task.status === 'Done').length
    const total = sprintTasks.length
    
    return {
      total,
      completed,
      inProgress: sprintTasks.filter(task => task.status === 'In Progress').length,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Active Sprint */}
      {activeSprint && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                {activeSprint.name}
              </CardTitle>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            {activeSprint.goal && (
              <p className="text-sm text-muted-foreground">{activeSprint.goal}</p>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sprint Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{getSprintStats(activeSprint.id).total}</div>
                  <div className="text-sm text-muted-foreground">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{getSprintStats(activeSprint.id).completed}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{getSprintStats(activeSprint.id).inProgress}</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{getSprintStats(activeSprint.id).completionRate.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sprint Progress</span>
                  <span>{getSprintStats(activeSprint.id).completionRate.toFixed(1)}%</span>
                </div>
                <Progress value={getSprintStats(activeSprint.id).completionRate} className="h-2" />
              </div>

              {/* Sprint Tasks */}
              <div className="space-y-2">
                <h4 className="font-medium">Sprint Tasks</h4>
                <div className="space-y-2">
                  {getSprintTasks(activeSprint.id).slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div>
                          <div className="font-medium text-sm">{task.title}</div>
                          <div className="text-xs text-muted-foreground">{task.key}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={task.status === 'Done' ? 'default' : 'secondary'}>
                          {task.status}
                        </Badge>
                        {task.assignee && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assigneeAvatar} />
                            <AvatarFallback className="text-xs">
                              {getInitials(task.assignee)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  {getSprintTasks(activeSprint.id).length > 5 && (
                    <div className="text-center text-sm text-muted-foreground">
                      +{getSprintTasks(activeSprint.id).length - 5} more tasks
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Future Sprints */}
      {futureSprints.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upcoming Sprints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {futureSprints.map((sprint) => {
              const stats = getSprintStats(sprint.id)
              return (
                <Card key={sprint.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{sprint.name}</CardTitle>
                      <Badge variant="outline">Future</Badge>
                    </div>
                    {sprint.goal && (
                      <p className="text-sm text-muted-foreground">{sprint.goal}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Tasks Planned</span>
                        <span>{stats.total}</span>
                      </div>
                      {sprint.startDate && sprint.endDate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Unassigned Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Unassigned Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.filter(task => !task.sprint).slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <div className="font-medium text-sm">{task.title}</div>
                    <div className="text-xs text-muted-foreground">{task.key}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{task.priority}</Badge>
                </div>
              </div>
            ))}
            {tasks.filter(task => !task.sprint).length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                All tasks are assigned to sprints
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

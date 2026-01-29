import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { OrganizationalTask } from '../data/organizational-tasks'

interface TasksAnalyticsProps {
  tasks: OrganizationalTask[]
}

export function TasksAnalytics({ tasks }: TasksAnalyticsProps) {
  // Calculate analytics data
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'Done').length
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length
  const blockedTasks = tasks.filter(t => t.status === 'Blocked').length
  
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  
  // Priority distribution
  const criticalTasks = tasks.filter(t => t.priority === 'Critical').length
  const highTasks = tasks.filter(t => t.priority === 'High').length
  const mediumTasks = tasks.filter(t => t.priority === 'Medium').length
  const lowTasks = tasks.filter(t => t.priority === 'Low').length
  
  // Category distribution
  const appSecTasks = tasks.filter(t => t.category === 'appsec').length
  const offSecTasks = tasks.filter(t => t.category === 'offsec').length
  const remediationTasks = tasks.filter(t => t.category === 'remediation').length
  
  // Overdue tasks
  const overdueTasks = tasks.filter(t => {
    if (!t.dueDate || t.status === 'Done') return false
    return new Date(t.dueDate) < new Date()
  }).length
  
  // Tasks by assignee (top 5)
  const tasksByAssignee = tasks.reduce((acc, task) => {
    if (task.assignee) {
      acc[task.assignee] = (acc[task.assignee] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  const topAssignees = Object.entries(tasksByAssignee)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks} of {totalTasks} completed
            </p>
            <Progress value={completionRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Tasks</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{blockedTasks}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              Past due date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Critical', count: criticalTasks, color: 'bg-red-500' },
                { label: 'High', count: highTasks, color: 'bg-orange-500' },
                { label: 'Medium', count: mediumTasks, color: 'bg-yellow-500' },
                { label: 'Low', count: lowTasks, color: 'bg-green-500' },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    <span className="text-sm">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{count}</span>
                    <Badge variant="secondary">
                      {totalTasks > 0 ? ((count / totalTasks) * 100).toFixed(1) : 0}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'AppSec', count: appSecTasks, color: 'bg-blue-500' },
                { label: 'OffSec', count: offSecTasks, color: 'bg-red-500' },
                { label: 'Remediation', count: remediationTasks, color: 'bg-purple-500' },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    <span className="text-sm">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{count}</span>
                    <Badge variant="secondary">
                      {totalTasks > 0 ? ((count / totalTasks) * 100).toFixed(1) : 0}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Assignees */}
      {topAssignees.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Assignees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topAssignees.map(([assignee, count], index) => (
                <div key={assignee} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{assignee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{count} tasks</span>
                    <Badge variant="secondary">
                      {totalTasks > 0 ? ((count / totalTasks) * 100).toFixed(1) : 0}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

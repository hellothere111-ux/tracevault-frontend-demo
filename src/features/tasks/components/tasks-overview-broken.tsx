import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Target, AlertCircle, AlertTriangle, TrendingUp, Shield, Sword, BarChart3 } from 'lucide-react'
import { OrganizationalTask } from '../data/organizational-tasks'

interface TasksOverviewProps {
  stats: {
    totalTasks: number
    inProgressTasks: number
    completedTasks: number
    blockedTasks: number
    highPriorityTasks: number
    overdueTasks: number
    completionRate: number
    appSecTasks: number
    offSecTasks: number
    remediationTasks: number
    currentTasks: number
    futureTasks: number
  }
}

export function TasksOverview({ stats }: TasksOverviewProps) {

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              Total Remediation Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{remediationCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Active vulnerability fixes and patches
            </p>
          </CardContent>
        </Card>

        {/* SLA Approaching */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              SLA Approaching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{slaData.approaching}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Tasks approaching SLA deadline
            </p>
          </CardContent>
        </Card>

        {/* SLA Breaches */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              SLA Breaches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{slaData.breached}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Tasks past SLA deadline
            </p>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.completed} of {stats.total} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              AppSec Tasks
            </CardTitle>
            <CardDescription>
              Application security vulnerability fixes and implementations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Tasks</span>
              <Badge variant="secondary">{appSecCount}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completion Rate</span>
                <span>{appSecCount > 0 ? ((tasks.filter(t => t.category === 'appsec' && t.status === 'Done').length / appSecCount) * 100).toFixed(1) : 0}%</span>
              </div>
              <Progress 
                value={appSecCount > 0 ? ((tasks.filter(t => t.category === 'appsec' && t.status === 'Done').length / appSecCount) * 100) : 0} 
                className="h-2" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">
                  {tasks.filter(t => t.category === 'appsec' && t.priority === 'Critical').length}
                </div>
                <div className="text-xs text-muted-foreground">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-orange-600">
                  {tasks.filter(t => t.category === 'appsec' && t.priority === 'High').length}
                </div>
                <div className="text-xs text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sword className="h-5 w-5 text-red-600" />
              OffSec Tasks
            </CardTitle>
            <CardDescription>
              Offensive security assessments and penetration testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Tasks</span>
              <Badge variant="secondary">{offSecCount}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completion Rate</span>
                <span>{offSecCount > 0 ? ((tasks.filter(t => t.category === 'offsec' && t.status === 'Done').length / offSecCount) * 100).toFixed(1) : 0}%</span>
              </div>
              <Progress 
                value={offSecCount > 0 ? ((tasks.filter(t => t.category === 'offsec' && t.status === 'Done').length / offSecCount) * 100) : 0} 
                className="h-2" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center">
                <div className="text-lg font-semibold text-red-600">
                  {tasks.filter(t => t.category === 'offsec' && t.priority === 'Critical').length}
                </div>
                <div className="text-xs text-muted-foreground">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-orange-600">
                  {tasks.filter(t => t.category === 'offsec' && t.priority === 'High').length}
                </div>
                <div className="text-xs text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Priority Distribution
          </CardTitle>
          <CardDescription>
            Breakdown of tasks by priority level across all categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {tasks.filter(t => t.priority === 'Critical').length}
              </div>
              <div className="text-sm text-muted-foreground">Critical</div>
              <div className="w-full bg-red-100 rounded-full h-2 mt-2">
                <div 
                  className="bg-red-600 h-2 rounded-full" 
                  style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.priority === 'Critical').length / tasks.length) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {tasks.filter(t => t.priority === 'High').length}
              </div>
              <div className="text-sm text-muted-foreground">High</div>
              <div className="w-full bg-orange-100 rounded-full h-2 mt-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full" 
                  style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.priority === 'High').length / tasks.length) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {tasks.filter(t => t.priority === 'Medium').length}
              </div>
              <div className="text-sm text-muted-foreground">Medium</div>
              <div className="w-full bg-yellow-100 rounded-full h-2 mt-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full" 
                  style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.priority === 'Medium').length / tasks.length) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {tasks.filter(t => t.priority === 'Low').length}
              </div>
              <div className="text-sm text-muted-foreground">Low</div>
              <div className="w-full bg-green-100 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.priority === 'Low').length / tasks.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

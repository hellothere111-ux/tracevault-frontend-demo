import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Target, Shield, Sword, X } from 'lucide-react'
import type { OrganizationalTask } from '../data/organizational-tasks'

interface TaskDetailDialogProps {
  task: OrganizationalTask | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskDetailDialog({ task, open, onOpenChange }: TaskDetailDialogProps) {
  if (!task) return null

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'High':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'To Do':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      case 'Blocked':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'In Review':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryBadge = (category: string) => {
    const categories: Record<string, { label: string; color: string }> = {
      appsec: { label: 'AppSec', color: 'bg-blue-100 text-blue-800' },
      offsec: { label: 'OffSec', color: 'bg-red-100 text-red-800' },
      remediation: { label: 'Remediation', color: 'bg-purple-100 text-purple-800' },
      current: { label: 'Current', color: 'bg-green-100 text-green-800' },
    }
    return categories[category] || { label: category, color: 'bg-gray-100 text-gray-800' }
  }

  const category = getCategoryBadge(task.category)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-semibold mb-2 leading-tight">
                <span className="text-xs text-muted-foreground mr-2 font-normal">{task.key}</span>
                {task.title}
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed">
                {task.description}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Priority
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge className={getPriorityColor(task.priority)} variant="secondary">
                  {task.priority}
                </Badge>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex items-center justify-center">
                <Badge className={getStatusColor(task.status)} variant="secondary">
                  {task.status}
                </Badge>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Category
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex items-center justify-center">
                <Badge className={category.color} variant="secondary">{category.label}</Badge>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  CVSS Score
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-bold">{task.cvssScore || 'N/A'}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="assignment">Assignment</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Task Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-sm font-medium">Due Date:</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                        </span>
                      </div>
                    </div>
                    {task.source && (
                      <div className="flex items-center gap-3">
                        <Target className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-sm font-medium">Source:</span>
                          <span className="text-sm text-muted-foreground ml-2">{task.source}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Asset/Host Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {task.assetHostDetails && (
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">Asset/Host:</span>
                        <span className="text-sm font-mono bg-muted px-2 py-1 rounded max-w-[200px] break-all">{task.assetHostDetails}</span>
                      </div>
                    )}
                    {task.vulnerableComponent && (
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">Vulnerable Component:</span>
                        <span className="text-sm font-mono bg-muted px-2 py-1 rounded max-w-[200px] break-all">{task.vulnerableComponent}</span>
                      </div>
                    )}
                    {!task.assetHostDetails && !task.vulnerableComponent && (
                      <div className="text-sm text-muted-foreground">
                        No asset/host details available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {task.vulnerableInstances && task.vulnerableInstances.length > 0 && (
                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Vulnerable Instances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {task.vulnerableInstances.map((instance, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-mono bg-red-50 text-red-700 border-red-200">
                            {instance}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {task.labels && task.labels.length > 0 && (
                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Labels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {task.labels.map((label, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Assignment Tab */}
            <TabsContent value="assignment" className="space-y-4 mt-6">
              <Card className="border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Assignment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={task.assigneeAvatar} />
                      <AvatarFallback className="text-sm">
                        {task.assignee ? task.assignee.split(' ').map(n => n[0]).join('').toUpperCase() : 'UN'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-base">{task.assignee || 'Unassigned'}</p>
                      <p className="text-sm text-muted-foreground">{task.department || 'No department'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-4 mt-6">
              <Card className="border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Task Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="text-sm font-medium">Created:</span>
                      <span className="text-sm text-muted-foreground ml-2">{new Date(task.createdDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {task.updatedDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-sm font-medium">Last Updated:</span>
                        <span className="text-sm text-muted-foreground ml-2">{new Date(task.updatedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                  {task.dueDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-sm font-medium">Due Date:</span>
                        <span className={`text-sm ml-2 ${new Date(task.dueDate) < new Date() && task.status !== 'Done' ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
                          {new Date(task.dueDate).toLocaleDateString()}
                          {new Date(task.dueDate) < new Date() && task.status !== 'Done' && (
                            <span className="ml-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Overdue</span>
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

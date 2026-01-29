import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { OrganizationalTask } from '../data/organizational-tasks'
import { getPriorityColor, getStatusColor } from '../utils/task-utils'

interface TasksTableProps {
  tasks: OrganizationalTask[]
  onTaskView?: (task: OrganizationalTask) => void
  onTaskEdit?: (task: OrganizationalTask) => void
  onTaskDelete?: (task: OrganizationalTask) => void
}

export function TasksTable({ tasks, onTaskView, onTaskEdit, onTaskDelete }: TasksTableProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No tasks found</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Task
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Assignee
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Priority
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Due Date
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-4 align-middle">
                  <div className="space-y-1">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.key}</div>
                    {task.labels && task.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {task.labels.slice(0, 2).map((label) => (
                          <Badge key={label} variant="outline" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                        {task.labels.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{task.labels.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4 align-middle">
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={task.assigneeAvatar} />
                        <AvatarFallback className="text-xs">
                          {getInitials(task.assignee)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{task.assignee}</div>
                        {task.department && (
                          <div className="text-xs text-muted-foreground">{task.department}</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Unassigned</span>
                  )}
                </td>
                <td className="p-4 align-middle">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </td>
                <td className="p-4 align-middle">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </td>
                <td className="p-4 align-middle">
                  {task.dueDate ? (
                    <div className="text-sm">
                      {formatDate(task.dueDate)}
                      {new Date(task.dueDate) < new Date() && task.status !== 'Done' && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Overdue
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No due date</span>
                  )}
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    {onTaskView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTaskView(task)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {onTaskEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTaskEdit(task)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onTaskDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTaskDelete(task)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, RotateCcw } from 'lucide-react'

export interface TaskFilters {
  searchTerm: string
  status: string
  priority: string
  assignee: string
}

interface TasksFiltersProps {
  onFiltersChange: (filters: TaskFilters) => void
  assignees: string[]
  currentFilters: TaskFilters
}

export function TasksFilters({ onFiltersChange, assignees, currentFilters }: TasksFiltersProps) {
  const handleFilterChange = (key: keyof TaskFilters, value: string) => {
    onFiltersChange({
      ...currentFilters,
      [key]: value
    })
  }

  const resetFilters = () => {
    onFiltersChange({
      searchTerm: '',
      status: '',
      priority: '',
      assignee: ''
    })
  }

  const hasActiveFilters = currentFilters.searchTerm || 
                          currentFilters.status || 
                          currentFilters.priority || 
                          currentFilters.assignee

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select 
              value={currentFilters.status} 
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="backlog">Backlog</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select 
              value={currentFilters.priority} 
              onValueChange={(value) => handleFilterChange('priority', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Assignee</label>
            <Select 
              value={currentFilters.assignee} 
              onValueChange={(value) => handleFilterChange('assignee', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Assignees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Assignees</SelectItem>
                {assignees.map((assignee) => (
                  <SelectItem key={assignee} value={assignee}>
                    {assignee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Active Filters</label>
            <div className="flex flex-wrap gap-1">
              {currentFilters.status && (
                <Badge variant="secondary">
                  Status: {currentFilters.status}
                </Badge>
              )}
              {currentFilters.priority && (
                <Badge variant="secondary">
                  Priority: {currentFilters.priority}
                </Badge>
              )}
              {currentFilters.assignee && (
                <Badge variant="secondary">
                  Assignee: {currentFilters.assignee}
                </Badge>
              )}
              {!hasActiveFilters && (
                <span className="text-sm text-muted-foreground">No active filters</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

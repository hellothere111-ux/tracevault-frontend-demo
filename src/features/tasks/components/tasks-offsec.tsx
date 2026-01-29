import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Shield, Zap, Server, Database, Globe, Monitor, Sword, AlertCircle, PieChart, Target, AlertTriangle, TrendingUp, Filter, MoreHorizontal, Eye, ChevronLeft, ChevronRight, Check, Play, Clock, ChevronUp, CheckCircle2, Calendar, Activity, X } from 'lucide-react'
import { OrganizationalTask } from '../data/organizational-tasks'
import { useState } from 'react'
import { TaskDetailDialog } from './task-detail-dialog'

interface OffSecTabProps {
  tasks: OrganizationalTask[]
}

type SortField = 'priority' | 'status' | 'updated' | 'created'
type SortOrder = 'asc' | 'desc'
type ViewMode = 'list' | 'board' | 'timeline'

export function OffSecTab({ tasks }: OffSecTabProps) {
  const offSecTasks = tasks.filter(task => task.category === 'offsec')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedTask, setSelectedTask] = useState<OrganizationalTask | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [sortField, setSortField] = useState<SortField>('priority')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [timelineMonth, setTimelineMonth] = useState<string>(new Date().toISOString())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const itemsPerPage = 10
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done': return <CheckCircle2 className="h-4 w-4" />
      case 'In Progress': return <Clock className="h-4 w-4" />
      case 'To Do': return <Target className="h-4 w-4" />
      case 'Blocked': return <AlertCircle className="h-4 w-4" />
      case 'In Review': return <Eye className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // Filter and sort tasks
  const filteredAndSortedTasks = offSecTasks
    .filter(task => {
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority
      const matchesMonth = selectedMonth === 'all' || task.createdDate.startsWith(selectedMonth)
      return matchesStatus && matchesPriority && matchesMonth
    })
    .sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortField) {
        case 'priority':
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'updated':
          aValue = new Date(a.updatedDate || a.createdDate)
          bValue = new Date(b.updatedDate || b.createdDate)
          break
        case 'created':
          aValue = new Date(a.createdDate)
          bValue = new Date(b.createdDate)
          break
        default:
          return 0
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedTasks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTasks = filteredAndSortedTasks.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType: 'status' | 'priority', value: string) => {
    if (filterType === 'status') {
      setSelectedStatus(value)
    } else {
      setSelectedPriority(value)
    }
    setCurrentPage(1)
  }

  // Handle task detail view
  const handleViewTask = (task: OrganizationalTask) => {
    setSelectedTask(task)
    setIsDetailDialogOpen(true)
  }

  const stats = {
    total: offSecTasks.length,
    todo: offSecTasks.filter(t => t.status === 'To Do').length,
    inProgress: offSecTasks.filter(t => t.status === 'In Progress').length,
    inReview: offSecTasks.filter(t => t.status === 'In Review').length,
    completed: offSecTasks.filter(t => t.status === 'Done').length,
    blocked: offSecTasks.filter(t => t.status === 'Blocked').length,
    critical: offSecTasks.filter(t => t.priority === 'Critical').length,
    high: offSecTasks.filter(t => t.priority === 'High').length,
    medium: offSecTasks.filter(t => t.priority === 'Medium').length,
    low: offSecTasks.filter(t => t.priority === 'Low').length,
    overdue: offSecTasks.filter(t => {
      if (!t.dueDate || t.status === 'Done') return false
      return new Date(t.dueDate) < new Date()
    }).length,
  }

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0

  // Calculate MTTR for OffSec (in days)
  const offSecMTTR = 5.2 // Mock calculation - would be based on actual OffSec task completion times

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'To Do': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      case 'Blocked': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'In Review': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* OffSec Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              Total Remediation Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-2">
              OffSec remediation items (completed + ongoing)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              SLA Approaching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.blocked}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Need immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              SLA Breaches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.overdue}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Past SLA deadline
            </p>
          </CardContent>
        </Card>

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

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-600" />
              MTTR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{offSecMTTR}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Mean Time To Resolution (days)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* OffSec Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sword className="h-5 w-5" />
            OffSec Security Assessments
            <Badge variant="outline">{filteredAndSortedTasks.length} items</Badge>
          </CardTitle>
          
          {/* Filters and Controls */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedStatus}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Done">Done</option>
                <option value="Blocked">Blocked</option>
              </select>
              
              <select
                value={selectedPriority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              
              <select
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-')
                  setSortField(field as SortField)
                  setSortOrder(order as SortOrder)
                }}
                className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="priority-desc">Priority (High to Low)</option>
                <option value="priority-asc">Priority (Low to High)</option>
                <option value="status-asc">Status (A to Z)</option>
                <option value="status-desc">Status (Z to A)</option>
                <option value="updated-desc">Recently Updated</option>
                <option value="updated-asc">Least Recently Updated</option>
                <option value="created-desc">Newest First</option>
                <option value="created-asc">Oldest First</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'board' ? 'default' : 'outline'}
                onClick={() => setViewMode('board')}
              >
                Board
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'timeline' ? 'default' : 'outline'}
                onClick={() => setViewMode('timeline')}
              >
                Timeline
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'list' && (
            <div className="space-y-2">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 rounded-t-lg font-medium text-sm text-muted-foreground">
                <div className="col-span-1">Type</div>
                <div className="col-span-4">Summary</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2">Assignee</div>
                <div className="col-span-1">Due Date</div>
                <div className="col-span-2">Actions</div>
              </div>
              
              {/* Task Rows */}
              {paginatedTasks.map((task) => (
                <div key={task.id} className="grid grid-cols-12 gap-4 p-3 border-b hover:bg-muted/30 transition-colors">
                  <div className="col-span-1">
                    <div className="flex items-center gap-2">
                      <Sword className="h-4 w-4 text-red-500" />
                      <span className="text-xs text-muted-foreground font-mono">{task.key}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-4">
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm hover:text-blue-600 cursor-pointer">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <div className="col-span-1">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assigneeAvatar} />
                        <AvatarFallback className="text-xs">
                          {task.assignee ? getInitials(task.assignee) : 'UN'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignee || 'Unassigned'}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    {task.dueDate ? (
                      <span className="text-sm">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">No due date</span>
                    )}
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleViewTask(task)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty State */}
              {filteredAndSortedTasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Sword className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No OffSec remediation items found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
          )}
          
          {viewMode === 'board' && (
            <div className="space-y-6">
              {[
                { status: 'SLA Breached', color: 'bg-red-500', filter: (t: any) => {
                  if (!t.dueDate || t.status === 'Done') return false
                  const dueDate = new Date(t.dueDate)
                  const today = new Date()
                  return dueDate.toDateString() === today.toDateString() || dueDate < today
                }},
                { status: 'SLA Approaching', color: 'bg-amber-500', filter: (t: any) => {
                  if (!t.dueDate || t.status === 'Done') return false
                  const dueDate = new Date(t.dueDate)
                  const today = new Date()
                  const warningDate = new Date(dueDate.getTime() - (3 * 24 * 60 * 60 * 1000))
                  const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                  return warningDate.toDateString() === today.toDateString() && daysUntilDue > 0
                }},
                { status: 'In Progress', color: 'bg-blue-500', filter: (t: any) => t.status === 'In Progress' || t.status === 'In Review' },
                { status: 'To Do', color: 'bg-gray-400', filter: (t: any) => t.status === 'To Do' },
                { status: 'Done', color: 'bg-green-500', filter: (t: any) => t.status === 'Done' },
                { status: 'Blocked', color: 'bg-red-500', filter: (t: any) => t.status === 'Blocked' }
              ].map((section) => (
                <div key={section.status} className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${section.color}`} />
                      <h3 className="font-semibold text-sm">{section.status}</h3>
                    </div>
                    <Badge variant="secondary" className="font-medium">
                      {filteredAndSortedTasks.filter(section.filter).length}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-3 overflow-x-auto">
                    {filteredAndSortedTasks
                      .filter(section.filter)
                      .map((task) => (
                        <Card key={task.id} className="group cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-border/50 bg-gradient-to-br from-card to-card/80 flex-shrink-0 w-80" onClick={() => handleViewTask(task)}>
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">{task.key}</span>
                                <Badge className={`${getPriorityColor(task.priority)} text-xs font-medium shrink-0`}>
                                  {task.priority}
                                </Badge>
                              </div>
                            </div>
                            
                            <h4 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                              {task.title}
                            </h4>
                            
                            {task.description && (
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                {task.description}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 ring-2 ring-background">
                                  <AvatarImage src={task.assigneeAvatar} />
                                  <AvatarFallback className="text-xs font-medium">
                                    {task.assignee ? getInitials(task.assignee) : 'UN'}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground truncate max-w-[80px]">
                                  {task.assignee || 'Unassigned'}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    
                    {filteredAndSortedTasks.filter(section.filter).length === 0 && (
                      <div className="flex flex-col items-center justify-center w-80 h-48 text-muted-foreground/50 border-2 border-dashed border-muted-foreground/20 rounded-xl">
                        <p className="text-xs">No tasks</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {viewMode === 'timeline' && (
            <div className="space-y-8">
              {/* Calendar Timeline Navigation */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentDate = new Date(timelineMonth)
                    currentDate.setMonth(currentDate.getMonth() - 1)
                    setTimelineMonth(currentDate.toISOString())
                  }}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Month
                </Button>
                
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {new Date(timelineMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentDate = new Date(timelineMonth)
                    currentDate.setMonth(currentDate.getMonth() + 1)
                    setTimelineMonth(currentDate.toISOString())
                  }}
                  className="flex items-center gap-1"
                >
                  Next Month
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Full Month Calendar */}
              <div className="border rounded-xl shadow-sm overflow-hidden">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 bg-muted/30 border-b">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-sm font-semibold text-muted-foreground border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 bg-background">
                  {(() => {
                    const monthStart = new Date(timelineMonth)
                    monthStart.setDate(1)
                    const startDate = new Date(monthStart)
                    startDate.setDate(startDate.getDate() - monthStart.getDay()) // Start from Sunday
                    
                    const calendarDays = []
                    const today = new Date()
                    
                    for (let i = 0; i < 42; i++) { // 6 weeks max
                      const currentDate = new Date(startDate)
                      currentDate.setDate(startDate.getDate() + i)
                      
                      const isCurrentMonth = currentDate.getMonth() === monthStart.getMonth()
                      const isToday = currentDate.toDateString() === today.toDateString()
                      
                      // Get timeline events for this day (creation dates and SLA events)
                      const dayEvents = []
                      
                      // Add task creation events
                      filteredAndSortedTasks.forEach(task => {
                        const taskDate = new Date(task.createdDate)
                        if (taskDate.toDateString() === currentDate.toDateString()) {
                          dayEvents.push({
                            type: 'created',
                            task: task,
                            title: `Created: ${task.key}`,
                            color: task.priority === 'Critical' ? 'bg-red-500' :
                                   task.priority === 'High' ? 'bg-orange-500' :
                                   task.priority === 'Medium' ? 'bg-yellow-500' :
                                   'bg-blue-500'
                          })
                        }
                      })
                      
                      // Add SLA breach events
                      filteredAndSortedTasks.forEach(task => {
                        if (task.dueDate && task.status !== 'Done') {
                          const dueDate = new Date(task.dueDate)
                          
                          // Check if this is the day the SLA was breached (regardless of when we're viewing)
                          if (dueDate.toDateString() === currentDate.toDateString()) {
                            dayEvents.push({
                              type: 'sla-breached',
                              task: task,
                              title: `SLA Breached: ${task.key}`,
                              color: 'bg-red-600'
                            })
                          }
                        }
                      })
                      
                      // Add SLA approaching events (3 days before due date)
                      filteredAndSortedTasks.forEach(task => {
                        if (task.dueDate && task.status !== 'Done') {
                          const dueDate = new Date(task.dueDate)
                          
                          // Check if this is 3 days before due date
                          const warningDate = new Date(dueDate.getTime() - (3 * 24 * 60 * 60 * 1000))
                          if (warningDate.toDateString() === currentDate.toDateString()) {
                            dayEvents.push({
                              type: 'sla-approaching',
                              task: task,
                              title: `SLA Approaching: ${task.key}`,
                              color: 'bg-amber-500'
                            })
                          }
                        }
                      })
                      
                      calendarDays.push({
                        date: currentDate,
                        isCurrentMonth,
                        isToday,
                        events: dayEvents
                      })
                    }
                    
                    return calendarDays.map((dayData, index) => {
                      const eventCount = dayData.events.length
                      const hasEvents = eventCount > 0
                      
                      return (
                        <div
                          key={index}
                          onClick={() => hasEvents && setSelectedDate(dayData.date.toISOString())}
                          className={`min-h-[100px] p-3 border-r border-b last:border-r-0 cursor-pointer transition-all duration-200 ${
                            !dayData.isCurrentMonth ? 'bg-muted/20 text-muted-foreground' : 'bg-background'
                          } ${
                            dayData.isToday ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-950/20' : ''
                          } ${
                            hasEvents ? 'hover:bg-muted/30 hover:shadow-sm' : ''
                          } ${
                            index % 7 === 6 || index % 7 === 0 ? 'border-l' : ''
                          }`}
                        >
                          <div className={`text-sm font-bold mb-2 ${
                            dayData.isToday ? 'text-emerald-600 dark:text-emerald-400' : ''
                          } ${!dayData.isCurrentMonth ? 'opacity-50' : ''}`}>
                            {dayData.date.getDate()}
                          </div>
                          
                          {hasEvents && (
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-1">
                                {(() => {
                                  const eventTypes = new Set()
                                  dayData.events.forEach(event => eventTypes.add(event.type))
                                  
                                  return Array.from(eventTypes).map(eventType => (
                                    <div
                                      key={eventType}
                                      className="w-5 h-5 flex items-center justify-center rounded transition-transform hover:scale-110"
                                      title={`${eventType} events`}
                                    >
                                      {eventType === 'created' && <Target className="w-4 h-4 text-blue-600" />}
                                      {eventType === 'sla-breached' && <AlertCircle className="w-4 h-4 text-red-600" />}
                                      {eventType === 'sla-approaching' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                                    </div>
                                  ))
                                })()}
                              </div>
                              <div className="text-xs text-muted-foreground font-medium">
                                {eventCount} event{eventCount !== 1 ? 's' : ''}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
              
              {/* Day Detail Modal */}
              {selectedDate && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-background rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden border">
                    <div className="p-6 border-b bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {new Date(selectedDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {filteredAndSortedTasks.filter(task => 
                              new Date(task.createdDate).toDateString() === new Date(selectedDate).toDateString()
                            ).length} OffSec assessments found
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDate(null)}
                          className="rounded-full hover:bg-muted/80"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                      <div className="space-y-3">
                        {(() => {
                          const dayEvents = []
                          const selectedDateObj = new Date(selectedDate)
                          
                          // Get all events for the selected date
                          filteredAndSortedTasks.forEach(task => {
                            const taskDate = new Date(task.createdDate)
                            if (taskDate.toDateString() === selectedDateObj.toDateString()) {
                              dayEvents.push({
                                type: 'created',
                                task: task,
                                title: `Created: ${task.key}`,
                                description: `OffSec assessment created on this day`,
                                color: task.priority === 'Critical' ? 'bg-red-500' :
                                       task.priority === 'High' ? 'bg-orange-500' :
                                       task.priority === 'Medium' ? 'bg-yellow-500' :
                                       'bg-blue-500'
                              })
                            }
                            
                            // Add SLA events
                            if (task.dueDate && task.status !== 'Done') {
                              const dueDate = new Date(task.dueDate)
                              
                              // Check if this is the day the SLA was breached
                              if (dueDate.toDateString() === selectedDateObj.toDateString()) {
                                dayEvents.push({
                                  type: 'sla-breached',
                                  task: task,
                                  title: `SLA Breached: ${task.key}`,
                                  description: `OffSec assessment missed its SLA deadline`,
                                  color: 'bg-red-600'
                                })
                              }
                              
                              // Check if this is 3 days before due date
                              const warningDate = new Date(dueDate.getTime() - (3 * 24 * 60 * 60 * 1000))
                              if (warningDate.toDateString() === selectedDateObj.toDateString()) {
                                dayEvents.push({
                                  type: 'sla-approaching',
                                  task: task,
                                  title: `SLA Approaching: ${task.key}`,
                                  description: `SLA deadline in 3 days`,
                                  color: 'bg-amber-500'
                                })
                              }
                            }
                          })
                          
                          // Sort events by type priority
                          dayEvents.sort((a, b) => {
                            const priority = { 'sla-breached': 0, 'sla-approaching': 1, 'created': 2 }
                            return priority[a.type] - priority[b.type]
                          })
                          
                          return dayEvents.map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              onClick={() => handleViewTask(event.task)}
                              className="p-4 border rounded-xl cursor-pointer hover:shadow-md hover:border-red-200 dark:hover:border-red-800 transition-all duration-200 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-5 h-5 flex items-center justify-center rounded">
                                    {event.type === 'created' && <Target className="w-4 h-4 text-blue-600" />}
                                    {event.type === 'sla-breached' && <AlertCircle className="w-4 h-4 text-red-600" />}
                                    {event.type === 'sla-approaching' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                                  </div>
                                  <div>
                                    <span className="font-semibold text-sm">{event.title}</span>
                                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{event.task.title}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs font-medium">
                                    {event.task.priority}
                                  </Badge>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>
                            </div>
                          ))
                        })()}
                        
                        {(() => {
                          const selectedDateObj = new Date(selectedDate)
                          const hasEvents = filteredAndSortedTasks.some(task => {
                            const taskDate = new Date(task.createdDate)
                            if (taskDate.toDateString() === selectedDateObj.toDateString()) return true
                            
                            if (task.dueDate && task.status !== 'Done') {
                              const dueDate = new Date(task.dueDate)
                              const today = new Date()
                              const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
                              
                              if (daysOverdue === 0 && dueDate.toDateString() === selectedDateObj.toDateString()) return true
                              
                              const warningDate = new Date(dueDate.getTime() - (3 * 24 * 60 * 60 * 1000))
                              if (warningDate.toDateString() === selectedDateObj.toDateString() && daysOverdue < 0) return true
                            }
                            
                            return false
                          })
                          
                          if (!hasEvents) {
                            return (
                              <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                  <Calendar className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground">No events found for this day</p>
                                <p className="text-sm text-muted-foreground mt-1">Try selecting a different date</p>
                              </div>
                            )
                          }
                          
                          return null
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Task Detail Dialog */}
      <TaskDetailDialog
        task={selectedTask}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </div>
  )
}

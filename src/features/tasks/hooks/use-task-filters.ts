import { useState, useMemo } from 'react'
import { OrganizationalTask } from '../data/organizational-tasks'

export type SortField = 'priority' | 'status' | 'updated' | 'created'
export type SortOrder = 'asc' | 'desc'
export type ViewMode = 'list' | 'board' | 'timeline'

interface TaskFiltersState {
  selectedStatus: string
  selectedPriority: string
  selectedMonth: string
  currentPage: number
  sortField: SortField
  sortOrder: SortOrder
  viewMode: ViewMode
  timelineWeekOffset: number
  timelineMonth: string
  selectedDate: string | null
}

interface UseTaskFiltersOptions {
  itemsPerPage?: number
}

export function useTaskFilters(
  tasks: OrganizationalTask[],
  options: UseTaskFiltersOptions = {}
) {
  const { itemsPerPage = 10 } = options

  const [filters, setFilters] = useState<TaskFiltersState>({
    selectedStatus: 'all',
    selectedPriority: 'all',
    selectedMonth: 'all',
    currentPage: 1,
    sortField: 'priority',
    sortOrder: 'desc',
    viewMode: 'list',
    timelineWeekOffset: 0,
    timelineMonth: new Date().toISOString(),
    selectedDate: null,
  })

  const updateFilter = <K extends keyof TaskFiltersState>(
    key: K,
    value: TaskFiltersState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    
    // Reset to page 1 when filters change (except pagination)
    if (key !== 'currentPage') {
      setFilters(prev => ({ ...prev, currentPage: 1 }))
    }
  }

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesStatus = filters.selectedStatus === 'all' || task.status === filters.selectedStatus
      const matchesPriority = filters.selectedPriority === 'all' || task.priority === filters.selectedPriority
      const matchesMonth = filters.selectedMonth === 'all' || task.createdDate.startsWith(filters.selectedMonth)
      return matchesStatus && matchesPriority && matchesMonth
    })

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (filters.sortField) {
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
          aValue = new Date(a.updatedDate).getTime()
          bValue = new Date(b.updatedDate).getTime()
          break
        case 'created':
          aValue = new Date(a.createdDate).getTime()
          bValue = new Date(b.createdDate).getTime()
          break
        default:
          return 0
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

    return filtered
  }, [tasks, filters.selectedStatus, filters.selectedPriority, filters.selectedMonth, filters.sortField, filters.sortOrder])

  const pagination = useMemo(() => {
    const totalPages = Math.ceil(filteredAndSortedTasks.length / itemsPerPage)
    const startIndex = (filters.currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedTasks = filteredAndSortedTasks.slice(startIndex, endIndex)

    return {
      totalPages,
      startIndex,
      endIndex,
      paginatedTasks,
      totalItems: filteredAndSortedTasks.length
    }
  }, [filteredAndSortedTasks, filters.currentPage, itemsPerPage])

  const resetFilters = () => {
    setFilters({
      selectedStatus: 'all',
      selectedPriority: 'all',
      selectedMonth: 'all',
      currentPage: 1,
      sortField: 'priority',
      sortOrder: 'desc',
      viewMode: 'list',
      timelineWeekOffset: 0,
      timelineMonth: new Date().toISOString(),
      selectedDate: null,
    })
  }

  return {
    filters,
    updateFilter,
    filteredAndSortedTasks,
    pagination,
    resetFilters,
  }
}

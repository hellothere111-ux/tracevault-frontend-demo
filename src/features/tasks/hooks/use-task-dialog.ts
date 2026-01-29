import { useState } from 'react'
import { OrganizationalTask } from '../data/organizational-tasks'

export function useTaskDialog() {
  const [selectedTask, setSelectedTask] = useState<OrganizationalTask | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const openTaskDialog = (task: OrganizationalTask) => {
    setSelectedTask(task)
    setIsDetailDialogOpen(true)
  }

  const closeTaskDialog = () => {
    setIsDetailDialogOpen(false)
    setSelectedTask(null)
  }

  return {
    selectedTask,
    isDetailDialogOpen,
    openTaskDialog,
    closeTaskDialog,
  }
}

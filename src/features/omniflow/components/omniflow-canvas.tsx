import { useState, useRef } from 'react'
import { Building2, Shield, Search, Clock, AlertTriangle, CheckCircle2, XCircle, RotateCcw, Users, Calendar, Activity, Zap, Target, Eye, ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Types
interface FlowBox {
  id: string
  title: string
  type: 'approval' | 'appsec-scan' | 'appsec-results' | 'ticket-creation' | 'remediation' | 'verification' | 'risk-acceptance' | 'offsec-vapt' | 'offsec-report' | 'sla-tracking' | 'quarterly-schedule'
  status: 'scheduled' | 'in-progress' | 'pending-review' | 'remediation-required' | 'sla-at-risk' | 'sla-missed' | 'completed' | 'risk-accepted'
  data: {
    team?: 'appsec' | 'offsec' | 'development'
    scanType?: 'snyk' | 'sast' | 'sca' | 'dast' | 'manual-vapt'
    vulnerabilities?: { critical: number; high: number; medium: number; low: number }
    sla?: { dueDate: string; remainingDays: number }
    tickets?: number
    riskLevel?: 'critical' | 'high' | 'medium' | 'low'
    scheduledDate?: string
    completedDate?: string
    cycleNumber?: number // For verification cycles
  }
  position: { x: number, y: number }
  connections: string[]
  team?: string
  progress?: number
  priority?: 'critical' | 'high' | 'medium' | 'low'
  isDragging?: boolean // Add dragging state
}

interface Tenant {
  id: string
  name: string
  type: string
  status: string
  assets_count: number
  vulnerabilities_count: number
  risk_score: number
  last_scan: string
  environments: Array<{
    id: string
    name: string
    type: string
    description: string
    url: string
    status: string
    vulnerabilities_count: number
    risk_score: number
  }>
}

interface OmniFlowCanvasProps {
  flowBoxes: FlowBox[]
  isLoading: boolean
  selectedFlow: string | null
  setSelectedFlow: (flow: string | null) => void
  selectedTenant: string
  setSelectedTenant: (tenant: string) => void
  focusedTenant: string
  setFocusedTenant: (tenant: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  zoom: number
  setZoom: (zoom: number) => void
  canvasOffset: { x: number, y: number }
  setCanvasOffset: (offset: { x: number, y: number }) => void
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
  dragStart: { x: number, y: number }
  setDragStart: (start: { x: number, y: number }) => void
  draggedBox: string | null
  setDraggedBox: (box: string | null) => void
  boxDragStart: { x: number, y: number }
  setBoxDragStart: (start: { x: number, y: number }) => void
  setFlowBoxes: (boxes: FlowBox[]) => void
  mockTenants: Tenant[]
}

export function OmniFlowCanvas({
  flowBoxes,
  isLoading,
  selectedFlow,
  setSelectedFlow,
  selectedTenant,
  setSelectedTenant,
  focusedTenant,
  setFocusedTenant,
  searchQuery,
  setSearchQuery,
  zoom,
  setZoom,
  canvasOffset,
  setCanvasOffset,
  isDragging,
  setIsDragging,
  dragStart,
  setDragStart,
  draggedBox,
  setDraggedBox,
  boxDragStart,
  setBoxDragStart,
  setFlowBoxes,
  mockTenants
}: OmniFlowCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Helper functions
  const getStatusColor = (status: FlowBox['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-blue-500'
      case 'pending-review': return 'bg-yellow-500'
      case 'remediation-required': return 'bg-orange-500'
      case 'sla-at-risk': return 'bg-red-400'
      case 'sla-missed': return 'bg-red-600'
      case 'risk-accepted': return 'bg-purple-500'
      case 'scheduled': return 'dark:bg-background0'
      default: return 'bg-gray-400'
    }
  }

  const getStatusIcon = (status: FlowBox['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4" />
      case 'in-progress': return <Activity className="h-4 w-4" />
      case 'pending-review': return <Clock className="h-4 w-4" />
      case 'remediation-required': return <AlertTriangle className="h-4 w-4" />
      case 'sla-at-risk': return <AlertTriangle className="h-4 w-4" />
      case 'sla-missed': return <XCircle className="h-4 w-4" />
      case 'risk-accepted': return <Shield className="h-4 w-4" />
      case 'scheduled': return <Calendar className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: FlowBox['type']) => {
    switch (type) {
      case 'approval': return <Shield className="h-5 w-5" />
      case 'appsec-scan': return <Zap className="h-5 w-5" />
      case 'appsec-results': return <Target className="h-5 w-5" />
      case 'ticket-creation': return <Users className="h-5 w-5" />
      case 'remediation': return <RotateCcw className="h-5 w-5" />
      case 'verification': return <Eye className="h-5 w-5" />
      case 'risk-acceptance': return <Shield className="h-5 w-5" />
      case 'offsec-vapt': return <Target className="h-5 w-5" />
      case 'offsec-report': return <Target className="h-5 w-5" />
      case 'sla-tracking': return <Clock className="h-5 w-5" />
      case 'quarterly-schedule': return <Calendar className="h-5 w-5" />
      default: return <Activity className="h-5 w-5" />
    }
  }

  // Canvas drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent text selection
    e.preventDefault()
    
    // Check if clicking on empty canvas space (not on flow boxes)
    const target = e.target as HTMLElement
    const isFlowBox = target.closest('.flow-box')
    const isCanvasClick = !isFlowBox && (
      target === containerRef.current || 
      target.classList.contains('canvas-container') ||
      target.classList.contains('canvas-dots-light') ||
      target.classList.contains('canvas-dots-dark') ||
      target.classList.contains('transition-transform') // Inner canvas div
    )
    
    console.log('Canvas click check:', { 
      target: target.tagName, 
      targetClass: target.className,
      isCanvasClick,
      isFlowBox,
      containerRef: containerRef.current?.tagName
    })
    
    if (isCanvasClick) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y })
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    console.log('Mouse move:', { isDragging, draggedBox, canvasOffset })
    
    // Handle canvas panning
    if (isDragging && !draggedBox) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      console.log('Canvas panning to:', { newX, newY })
      setCanvasOffset({ x: newX, y: newY })
    }
    
    // Handle box dragging
    if (draggedBox) {
      const newX = e.clientX - boxDragStart.x
      const newY = e.clientY - boxDragStart.y
      
      setFlowBoxes((prev: FlowBox[]) => prev.map((box: FlowBox) => 
        box.id === draggedBox 
          ? { ...box, position: { x: newX, y: newY } }
          : box
      ))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedBox(null)
  }

  // Box drag handlers
  const handleBoxMouseDown = (e: React.MouseEvent, boxId: string) => {
    e.preventDefault()
    e.stopPropagation()
    const box = flowBoxes.find(b => b.id === boxId)
    if (box) {
      setDraggedBox(boxId)
      setBoxDragStart({ x: e.clientX - box.position.x, y: e.clientY - box.position.y })
    }
  }

  const handleBoxMouseMove = (e: React.MouseEvent) => {
    if (draggedBox) {
      const newX = e.clientX - boxDragStart.x
      const newY = e.clientY - boxDragStart.y
      
      setFlowBoxes((prev: FlowBox[]) => prev.map((box: FlowBox) => 
        box.id === draggedBox 
          ? { ...box, position: { x: newX, y: newY } }
          : box
      ))
    }
  }

  const handleBoxMouseUp = () => {
    setDraggedBox(null)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom(prevZoom => Math.min(Math.max(prevZoom * delta, 0.3), 3))
  }

  // Asset tree conversion
  const convertToTreeNodes = (tenants: Tenant[]) => {
    return tenants.map(tenant => ({
      id: tenant.id,
      name: tenant.name,
      type: 'tenant',
      children: tenant.environments.map(env => ({
        id: env.id,
        name: env.name,
        type: 'environment',
        parent: tenant.id
      }))
    }))
  }

  const assetTreeNodes = convertToTreeNodes(mockTenants)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-lg font-medium">Loading OmniFlow...</p>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <style>{`
        .canvas-dots-light {
          background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .canvas-dots-dark {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
      <div className="flex h-screen dark:bg-background dark:bg-background">
        {/* Sidebar */}
        <div className="w-80 dark:bg-card dark:bg-card border-r dark:border-border dark:border-border">
          <div className="p-4 border-b dark:border-border dark:border-border">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold dark:text-foreground dark:text-foreground">OmniFlow</h2>
            </div>
            <p className="text-sm dark:text-muted-foreground dark:text-muted-foreground mt-1">Security Workflow Visualization</p>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tenants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Asset Tree */}
          <ScrollArea className="flex-1 h-[calc(100vh-200px)]">
            <div className="p-4">
              <div className="space-y-2">
                {assetTreeNodes.map(node => (
                  <div key={node.id} className="space-y-1">
                    <div
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        focusedTenant === node.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'dark:hover:bg-muted dark:hover:bg-gray-700 dark:text-foreground dark:text-foreground'
                      }`}
                      onClick={() => setFocusedTenant(node.id)}
                    >
                      <Building2 className="h-4 w-4" />
                      <span className="font-medium">{node.name}</span>
                      <Badge variant="outline" className="ml-auto">
                        {node.children?.length || 0}
                      </Badge>
                    </div>
                    {node.children?.map(child => (
                      <div
                        key={child.id}
                        className="ml-4 flex items-center gap-2 p-2 rounded-lg dark:hover:bg-muted dark:hover:bg-gray-700 cursor-pointer transition-colors dark:text-muted-foreground dark:text-muted-foreground"
                      >
                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                        <span className="text-sm">{child.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          {/* Controls */}
          <div className="p-4 border-t dark:border-border dark:border-border">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(1)}
                className="flex items-center gap-1"
              >
                <Maximize2 className="h-4 w-4" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(zoom * 1.2)}
                className="flex items-center gap-1"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(zoom * 0.8)}
                className="flex items-center gap-1"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="dark:bg-card dark:bg-card border-b dark:border-border dark:border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold dark:text-foreground dark:text-foreground">
                  Security Workflow Visualization
                </h1>
                {focusedTenant && (
                  <div className="ml-4 flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {mockTenants.find(t => t.id === focusedTenant)?.name}
                    </span>
                    <button
                      onClick={() => setFocusedTenant('')}
                      className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  {flowBoxes.length} Flows
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {Math.round(zoom * 100)}%
                </Badge>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={containerRef}
            className="flex-1 relative overflow-hidden dark:bg-background dark:bg-background canvas-container canvas-dots-light dark:canvas-dots-dark select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            style={{ 
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <div
              ref={canvasRef}
              className="relative transition-transform duration-100 select-none"
              style={{
                transform: `scale(${zoom}) translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
                transformOrigin: '0 0',
                width: '10000px',
                height: '1400px'
              }}
            >
              {/* Connection Lines */}
              <svg className="absolute top-0 left-0 pointer-events-none" style={{ width: '10000px', height: '1400px' }}>
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="12"
                    markerHeight="8"
                    refX="11"
                    refY="4"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 12 4, 0 8"
                      fill="#6B7280"
                    />
                  </marker>
                </defs>
                {flowBoxes.map(box => 
                  box.connections.map(connectionId => {
                    const targetBox = flowBoxes.find(b => b.id === connectionId)
                    if (!targetBox) return null
                    
                    const startX = box.position.x + 90
                    const startY = box.position.y + 40
                    const endX = targetBox.position.x
                    const endY = targetBox.position.y + 40
                    
                    // Calculate control points for tree-like curved path
                    const midX = (startX + endX) / 2
                    const midY = (startY + endY) / 2
                    
                    // Create tree-like branching
                    let controlX, controlY
                    if (endY < startY) {
                      // Branching upward - curve up more
                      controlX = midX
                      controlY = startY - 80
                    } else if (endY > startY) {
                      // Branching downward - curve down more
                      controlX = midX
                      controlY = startY + 80
                    } else {
                      // Same level - gentle curve
                      controlX = midX + 50
                      controlY = midY
                    }
                    
                    // Check if this is a loop-back connection from the last Fixed block to Revalidation
                    const isLoopBack = box.id.includes('revalidation-fixed') && connectionId.includes('revalidation')
                    
                    // Create proper loop-back path for Fixed → Revalidation
                    let pathData
                    if (isLoopBack) {
                      // Create a proper loop-back that goes around the outside
                      const startX = box.position.x + 180 // Right edge of Fixed block
                      const startY = box.position.y + 40  // Center of Fixed block
                      const endX = targetBox.position.x // Left edge of Revalidation block
                      const endY = targetBox.position.y + 40 // Center of Revalidation block
                      
                      // Create loop-back path that goes around the outside:
                      // Use safer coordinates that stay within canvas bounds
                      const pathDownX = Math.min(startX + 150, 9500) // Keep within canvas
                      const pathDownY = Math.min(startY + 150, 1250) // Keep within canvas
                      const pathLeftX = Math.max(endX - 150, 500) // Keep within canvas
                      const pathLeftY = pathDownY // Stay at down level
                      const pathUpX = pathLeftX // Stay at left position
                      const pathUpY = endY // Go up to revalidation
                      
                      pathData = `M ${startX} ${startY} 
                                  L ${pathDownX} ${pathDownY} 
                                  L ${pathLeftX} ${pathLeftY} 
                                  L ${pathUpX} ${pathUpY}`
                    } else {
                      // Normal curved connection - use dynamic positions
                      const midX = (startX + endX) / 2
                      const midY = (startY + endY) / 2
                      
                      // Create tree-like branching
                      let controlX, controlY
                      if (endY < startY) {
                        // Branching upward - curve up more
                        controlX = midX
                        controlY = startY - 80
                      } else if (endY > startY) {
                        // Branching downward - curve down more
                        controlX = midX
                        controlY = startY + 80
                      } else {
                        // Same level - gentle curve
                        controlX = midX + 50
                        controlY = midY
                      }
                      
                      pathData = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`
                    }
                    
                    return (
                      <g key={`${box.id}-${connectionId}`}>
                        <path
                          d={pathData}
                          stroke={isLoopBack ? "#DC2626" : "#6B7280"}
                          strokeWidth={isLoopBack ? "3" : "2"}
                          fill="none"
                          markerEnd="url(#arrowhead)"
                          className={`transition-all duration-300 ${isLoopBack ? 'animate-pulse' : ''}`}
                          strokeDasharray={isLoopBack ? "5,5" : "none"}
                        />
                      </g>
                    )
                  })
                )}
              </svg>

              {/* Flow Boxes */}
              {flowBoxes.map(box => (
                <div
                  key={box.id}
                  className={`flow-box absolute bg-white dark:bg-card rounded-lg shadow-lg border-2 transition-all duration-300 select-none ${
                    selectedFlow === box.id
                      ? 'border-blue-500 shadow-xl'
                      : 'border-gray-200 dark:border-border hover:border-gray-300 dark:hover:border-gray-600'
                  } ${draggedBox === box.id ? 'cursor-grabbing z-50' : 'cursor-grab'}`}
                  style={{
                    left: `${box.position.x}px`,
                    top: `${box.position.y}px`,
                    width: '180px',
                    minHeight: '80px'
                  }}
                  onClick={() => setSelectedFlow(box.id)}
                  onMouseDown={(e) => handleBoxMouseDown(e, box.id)}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1 rounded ${getStatusColor(box.status)}  text-white`}>
                        {getTypeIcon(box.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium dark:text-foreground dark:text-foreground truncate">
                          {box.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(box.status)}  text-white`}>
                        {getStatusIcon(box.status)}
                        <span className="capitalize">{box.status.replace('-', ' ')}</span>
                      </div>
                    </div>

                    {/* Additional Info */}
                    {box.data.vulnerabilities && (
                      <div className="text-xs dark:text-muted-foreground dark:text-muted-foreground">
                        <div className="flex justify-between gap-2">
                          <span>C: {box.data.vulnerabilities.critical}</span>
                          <span>H: {box.data.vulnerabilities.high}</span>
                          <span>M: {box.data.vulnerabilities.medium}</span>
                          <span>L: {box.data.vulnerabilities.low}</span>
                        </div>
                      </div>
                    )}
                    
                    {box.data.tickets && (
                      <div className="text-xs dark:text-muted-foreground dark:text-muted-foreground mt-1">
                        Tickets: {box.data.tickets}
                      </div>
                    )}
                    
                    {box.data.sla && (
                      <div className="text-xs dark:text-muted-foreground dark:text-muted-foreground mt-1">
                        SLA: {box.data.sla.remainingDays} days
                      </div>
                    )}
                    
                    {box.data.completedDate && (
                      <div className="text-xs dark:text-muted-foreground dark:text-muted-foreground mt-1">
                        Completed: {box.data.completedDate}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

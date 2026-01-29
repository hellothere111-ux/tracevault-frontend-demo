import { useState, useEffect } from 'react'
import { OmniFlowCanvas } from './components/omniflow-canvas'

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

export function OmniFlow() {
  const [flowBoxes, setFlowBoxes] = useState<FlowBox[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null)
  const [selectedTenant, setSelectedTenant] = useState<string>('')
  const [focusedTenant, setFocusedTenant] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [zoom, setZoom] = useState(1)
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [draggedBox, setDraggedBox] = useState<string | null>(null)
  const [boxDragStart, setBoxDragStart] = useState({ x: 0, y: 0 })

  // Mock tenant data
  const mockTenants: Tenant[] = [
    {
      id: 'TENANT-001',
      name: 'Acme Corporation',
      type: 'enterprise',
      status: 'active',
      assets_count: 156,
      vulnerabilities_count: 23,
      risk_score: 7.2,
      last_scan: '2024-06-15',
      environments: [
        {
          id: 'ENV-001',
          name: 'Production',
          type: 'production',
          description: 'Main production environment',
          url: 'https://app.acme.com',
          status: 'active',
          vulnerabilities_count: 15,
          risk_score: 8.1
        },
        {
          id: 'ENV-002',
          name: 'Staging',
          type: 'staging',
          description: 'Staging environment for testing',
          url: 'https://staging.acme.com',
          status: 'active',
          vulnerabilities_count: 8,
          risk_score: 5.3
        }
      ]
    },
    {
      id: 'TENANT-002',
      name: 'Tech Startup Inc',
      type: 'startup',
      status: 'active',
      assets_count: 45,
      vulnerabilities_count: 12,
      risk_score: 4.8,
      last_scan: '2024-06-14',
      environments: [
        {
          id: 'ENV-003',
          name: 'Production',
          type: 'production',
          description: 'Production environment',
          url: 'https://app.techstartup.com',
          status: 'active',
          vulnerabilities_count: 12,
          risk_score: 4.8
        }
      ]
    }
  ]

  // Mock flow data
  useEffect(() => {
    const generateFlowBoxes = (tenantId?: string): FlowBox[] => {
      if (tenantId) {
        const tenant = mockTenants.find(t => t.id === tenantId)
        if (!tenant) return []
        
        // Acme Corporation - Active
        if (tenantId === 'TENANT-001') {
          return [
            // Main trunk
            {
              id: `${tenantId}-main`,
              title: `${tenant.name} - Security Activities`,
              type: 'approval',
              status: 'in-progress',
              position: { x: 600, y: 400 },
              connections: [`${tenantId}-appsec`, `${tenantId}-offsec`],
              data: { team: 'appsec' }
            },
            
            // AppSec Branch (upward) - More spread out with padding
            {
              id: `${tenantId}-appsec`,
              title: 'AppSec Pipeline',
              type: 'appsec-scan',
              status: 'in-progress',
              position: { x: 900, y: 250 },
              connections: [`${tenantId}-sca`, `${tenantId}-sast`, `${tenantId}-dast`],
              data: { team: 'appsec', scanType: 'sca' }
            },
            {
              id: `${tenantId}-sca`,
              title: 'SCA - Dependencies Scan',
              type: 'appsec-scan',
              status: 'completed',
              position: { x: 1200, y: 200 },
              connections: [`${tenantId}-vulnerabilities`],
              data: {
                team: 'appsec',
                scanType: 'sca',
                vulnerabilities: { critical: 3, high: 7, medium: 12, low: 18 },
                completedDate: '2024-06-10'
              }
            },
            {
              id: `${tenantId}-sast`,
              title: 'SAST - Code Analysis',
              type: 'appsec-scan',
              status: 'in-progress',
              position: { x: 1200, y: 400 },
              connections: [`${tenantId}-vulnerabilities`],
              data: {
                team: 'appsec',
                scanType: 'sast',
                vulnerabilities: { critical: 1, high: 4, medium: 8, low: 11 }
              }
            },
            {
              id: `${tenantId}-dast`,
              title: 'DAST - Dynamic Testing',
              type: 'appsec-scan',
              status: 'pending-review',
              position: { x: 1200, y: 600 },
              connections: [`${tenantId}-vulnerabilities`],
              data: {
                team: 'appsec',
                scanType: 'dast',
                vulnerabilities: { critical: 0, high: 2, medium: 5, low: 7 }
              }
            },
            
            // Vulnerabilities aggregation
            {
              id: `${tenantId}-vulnerabilities`,
              title: 'Vulnerability Findings',
              type: 'appsec-results',
              status: 'remediation-required',
              position: { x: 1600, y: 400 },
              connections: [`${tenantId}-remediation-queue`],
              data: {
                team: 'appsec',
                vulnerabilities: { critical: 4, high: 13, medium: 25, low: 36 }
              }
            },
            
            // Remediation cycle with loop-back
            {
              id: `${tenantId}-remediation-queue`,
              title: 'Remediation Queue',
              type: 'ticket-creation',
              status: 'remediation-required',
              position: { x: 2000, y: 400 },
              connections: [`${tenantId}-accepted-risk`, `${tenantId}-fixed`],
              data: {
                team: 'development',
                tickets: 15,
                riskLevel: 'high'
              }
            },
            {
              id: `${tenantId}-accepted-risk`,
              title: 'Accepted Risk',
              type: 'risk-acceptance',
              status: 'risk-accepted',
              position: { x: 2400, y: 250 },
              connections: [],
              data: {
                team: 'appsec',
                riskLevel: 'medium',
                vulnerabilities: { critical: 0, high: 3, medium: 5, low: 8 }
              }
            },
            {
              id: `${tenantId}-fixed`,
              title: 'Fixed Vulnerabilities',
              type: 'remediation',
              status: 'completed',
              position: { x: 2400, y: 550 },
              connections: [],
              data: {
                team: 'development',
                tickets: 12,
                completedDate: '2024-06-15'
              }
            },
            
            // OffSec Branch (downward) - Symmetrical with AppSec
            {
              id: `${tenantId}-offsec`,
              title: 'OffSec Pipeline',
              type: 'offsec-vapt',
              status: 'in-progress',
              position: { x: 900, y: 650 },
              connections: [`${tenantId}-manual-vapt`],
              data: { team: 'offsec', scanType: 'manual-vapt' }
            },
            {
              id: `${tenantId}-manual-vapt`,
              title: 'Manual VAPT Testing',
              type: 'offsec-vapt',
              status: 'completed',
              position: { x: 1200, y: 650 },
              connections: [`${tenantId}-offsec-vulnerabilities`],
              data: {
                team: 'offsec',
                scanType: 'manual-vapt',
                vulnerabilities: { critical: 2, high: 5, medium: 8, low: 12 },
                completedDate: '2024-06-12'
              }
            },
            {
              id: `${tenantId}-offsec-vulnerabilities`,
              title: 'Vulnerability Findings',
              type: 'offsec-report',
              status: 'remediation-required',
              position: { x: 1600, y: 650 },
              connections: [`${tenantId}-offsec-remediation`],
              data: {
                team: 'offsec',
                vulnerabilities: { critical: 2, high: 5, medium: 8, low: 12 }
              }
            },
            {
              id: `${tenantId}-offsec-remediation`,
              title: 'Remediation Queue',
              type: 'ticket-creation',
              status: 'remediation-required',
              position: { x: 2000, y: 650 },
              connections: [`${tenantId}-offsec-accepted`, `${tenantId}-offsec-fixed`],
              data: {
                team: 'development',
                tickets: 8,
                riskLevel: 'high'
              }
            },
            {
              id: `${tenantId}-offsec-accepted`,
              title: 'Accepted Risk',
              type: 'risk-acceptance',
              status: 'risk-accepted',
              position: { x: 2400, y: 600 },
              connections: [],
              data: {
                team: 'offsec',
                riskLevel: 'medium',
                vulnerabilities: { critical: 0, high: 1, medium: 2, low: 3 }
              }
            },
            {
              id: `${tenantId}-offsec-fixed`,
              title: 'Fixed Vulnerabilities',
              type: 'remediation',
              status: 'completed',
              position: { x: 2400, y: 700 },
              connections: [],
              data: {
                team: 'development',
                tickets: 7,
                completedDate: '2024-06-16'
              }
            }
          ]
        }
        
        // Tech Startup Inc - Inactive
        if (tenantId === 'TENANT-002') {
          return [{
            id: `${tenantId}-inactive`,
            title: `${tenant.name} - Inactive`,
            type: 'approval',
            status: 'scheduled',
            position: { x: 1800, y: 400 },
            connections: [],
            data: {
              team: 'appsec',
              scheduledDate: '2024-07-01'
            }
          }]
        }
        
        return []
      } else {
        // Default view - no current activities
        return [
          {
            id: 'no-tenant-selected',
            title: 'Select a tenant to view security activities',
            type: 'approval',
            status: 'scheduled',
            position: { x: 1800, y: 400 },
            connections: [],
            data: { team: 'appsec' }
          }
        ]
      }
    }

    const mockFlowBoxes = generateFlowBoxes(focusedTenant || undefined)

    setTimeout(() => {
      setFlowBoxes(mockFlowBoxes)
      setIsLoading(false)
    }, 1000)
  }, [focusedTenant])

  return (
    <OmniFlowCanvas
      flowBoxes={flowBoxes}
      isLoading={isLoading}
      selectedFlow={selectedFlow}
      setSelectedFlow={setSelectedFlow}
      selectedTenant={selectedTenant}
      setSelectedTenant={setSelectedTenant}
      focusedTenant={focusedTenant}
      setFocusedTenant={setFocusedTenant}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      zoom={zoom}
      setZoom={setZoom}
      canvasOffset={canvasOffset}
      setCanvasOffset={setCanvasOffset}
      isDragging={isDragging}
      setIsDragging={setIsDragging}
      dragStart={dragStart}
      setDragStart={setDragStart}
      draggedBox={draggedBox}
      setDraggedBox={setDraggedBox}
      boxDragStart={boxDragStart}
      setBoxDragStart={setBoxDragStart}
      setFlowBoxes={setFlowBoxes}
      mockTenants={mockTenants}
    />
  )
}

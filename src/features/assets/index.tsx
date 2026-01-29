import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { AssetTree } from './components/asset-tree'
import { AssetDetailPanel } from './components/asset-detail-panel'
import { EnhancedAssetDetailPanel } from './components/enhanced-asset-detail-panel'
import { CreateTenantDialog } from './components/create-tenant-dialog'
import { CreateProjectDialog } from './components/create-project-dialog'
import { CreateEnvironmentDialog } from './components/create-environment-dialog'
import { useAssetTree } from './hooks/use-asset-tree'
import type { Tenant, AssetTreeNode } from './types/asset.types'
import { AssetType, EnvironmentType } from './types/asset.types'
import { Plus, ChevronUp, ChevronDown, Settings } from 'lucide-react'

export function Assets() {
  // ===== STATE =====
  const [loading, setLoading] = useState(true)
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [selectedNode, setSelectedNode] = useState<AssetTreeNode | null>(null)
  const [useEnhancedView, setUseEnhancedView] = useState(true) // Toggle for enhanced view

  // Dialog states
  const [createTenantOpen, setCreateTenantOpen] = useState(false)
  const [createProjectOpen, setCreateProjectOpen] = useState(false)
  const [createEnvironmentOpen, setCreateEnvironmentOpen] = useState(false)
  const [parentForCreate, setParentForCreate] = useState<AssetTreeNode | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Tree hook
  const { tree, expandedNodes, toggleNode, selectNode, expandAll, collapseAll } =
    useAssetTree(tenants)

  // ===== MOCK DATA =====
  const mockTenants: Tenant[] = [
    {
      id: 'TENANT-001',
      name: 'Acme Corporation',
      description: 'Main organization for Acme Corp',
      status: 'active',
      created_at: '2024-01-01T10:00:00Z',
      updated_at: '2025-01-15T10:00:00Z',
      vulnerabilities_count: 45,
      risk_score: 7.2,
      projects: [
        {
          id: 'PROJ-001',
          name: 'Mobile App',
          description: 'iOS and Android applications',
          status: 'active',
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2025-01-10T10:00:00Z',
          vulnerabilities_count: 12,
          risk_score: 6.5,
          sub_projects: [
            {
              id: 'SUBPROJ-001',
              name: 'Backend API',
              description: 'REST API services',
              status: 'active',
              created_at: '2024-02-01T10:00:00Z',
              updated_at: '2025-01-12T10:00:00Z',
              vulnerabilities_count: 5,
              risk_score: 5.2,
              environments: [
                {
                  id: 'ENV-001',
                  name: 'Dev Server',
                  type: EnvironmentType.DEV,
                  description: 'Development environment',
                  url: 'https://dev-api.acme.com',
                  status: 'active',
                  created_at: '2024-02-05T10:00:00Z',
                  updated_at: '2025-01-14T10:00:00Z',
                  vulnerabilities_count: 2,
                  risk_score: 3.1,
                },
                {
                  id: 'ENV-002',
                  name: 'Production',
                  type: EnvironmentType.PRODUCTION,
                  description: 'Production environment',
                  url: 'https://api.acme.com',
                  status: 'active',
                  created_at: '2024-02-05T10:00:00Z',
                  updated_at: '2025-01-15T10:00:00Z',
                  vulnerabilities_count: 3,
                  risk_score: 7.1,
                },
              ],
            },
            {
              id: 'SUBPROJ-002',
              name: 'Frontend App',
              description: 'React web application',
              status: 'active',
              created_at: '2024-02-10T10:00:00Z',
              updated_at: '2025-01-11T10:00:00Z',
              vulnerabilities_count: 7,
              risk_score: 7.8,
              environments: [
                {
                  id: 'ENV-003',
                  name: 'Staging',
                  type: EnvironmentType.STAGING,
                  description: 'Staging environment',
                  url: 'https://staging.acme.com',
                  status: 'active',
                  created_at: '2024-02-15T10:00:00Z',
                  updated_at: '2025-01-13T10:00:00Z',
                  vulnerabilities_count: 4,
                  risk_score: 6.5,
                },
                {
                  id: 'ENV-004',
                  name: 'Production',
                  type: EnvironmentType.PRODUCTION,
                  description: 'Production web app',
                  url: 'https://acme.com',
                  status: 'active',
                  created_at: '2024-02-15T10:00:00Z',
                  updated_at: '2025-01-15T10:00:00Z',
                  vulnerabilities_count: 3,
                  risk_score: 8.3,
                },
              ],
            },
          ],
        },
        {
          id: 'PROJ-002',
          name: 'Enterprise Portal',
          description: 'Internal management portal',
          status: 'active',
          created_at: '2024-03-01T10:00:00Z',
          updated_at: '2025-01-08T10:00:00Z',
          vulnerabilities_count: 33,
          risk_score: 7.9,
          sub_projects: [
            {
              id: 'SUBPROJ-003',
              name: 'Admin Dashboard',
              description: 'Admin control panel',
              status: 'active',
              created_at: '2024-03-10T10:00:00Z',
              updated_at: '2025-01-09T10:00:00Z',
              vulnerabilities_count: 20,
              risk_score: 8.1,
              environments: [
                {
                  id: 'ENV-005',
                  name: 'QA',
                  type: EnvironmentType.QA,
                  description: 'QA testing environment',
                  url: 'https://qa-portal.acme.com',
                  status: 'active',
                  created_at: '2024-03-15T10:00:00Z',
                  updated_at: '2025-01-10T10:00:00Z',
                  vulnerabilities_count: 8,
                  risk_score: 6.8,
                },
                {
                  id: 'ENV-006',
                  name: 'Production',
                  type: EnvironmentType.PRODUCTION,
                  description: 'Production portal',
                  url: 'https://portal.acme.com',
                  status: 'active',
                  created_at: '2024-03-15T10:00:00Z',
                  updated_at: '2025-01-15T10:00:00Z',
                  vulnerabilities_count: 12,
                  risk_score: 9.2,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'TENANT-002',
      name: 'TechStart Inc',
      description: 'Startup technology company',
      status: 'active',
      created_at: '2024-06-01T10:00:00Z',
      updated_at: '2025-01-12T10:00:00Z',
      vulnerabilities_count: 28,
      risk_score: 6.1,
      projects: [
        {
          id: 'PROJ-003',
          name: 'SaaS Platform',
          description: 'Cloud-based SaaS solution',
          status: 'active',
          created_at: '2024-06-15T10:00:00Z',
          updated_at: '2025-01-11T10:00:00Z',
          vulnerabilities_count: 28,
          risk_score: 6.1,
          sub_projects: [
            {
              id: 'SUBPROJ-004',
              name: 'Core Service',
              description: 'Main microservice',
              status: 'active',
              created_at: '2024-07-01T10:00:00Z',
              updated_at: '2025-01-10T10:00:00Z',
              vulnerabilities_count: 15,
              risk_score: 5.9,
              environments: [
                {
                  id: 'ENV-007',
                  name: 'Development',
                  type: EnvironmentType.DEV,
                  url: 'https://dev-saas.techstart.com',
                  status: 'active',
                  created_at: '2024-07-10T10:00:00Z',
                  updated_at: '2025-01-10T10:00:00Z',
                  vulnerabilities_count: 6,
                  risk_score: 4.2,
                },
                {
                  id: 'ENV-008',
                  name: 'Production',
                  type: EnvironmentType.PRODUCTION,
                  url: 'https://saas.techstart.com',
                  status: 'active',
                  created_at: '2024-07-10T10:00:00Z',
                  updated_at: '2025-01-15T10:00:00Z',
                  vulnerabilities_count: 9,
                  risk_score: 7.6,
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  // ===== EFFECTS =====
  useEffect(() => {
    fetchAssets()
  }, [])

  // ===== FUNCTIONS =====
  const fetchAssets = async () => {
    try {
      setLoading(true)
      // TODO: Replace with API call
      // const tenants = await assetService.getTenants()
      // setTenants(tenants)

      // Mock data for now
      setTenants(mockTenants)
    } catch (error) {
      console.error('Failed to fetch assets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTenant = async (data: { name: string; description?: string }) => {
    try {
      setIsCreating(true)
      // TODO: Replace with API call
      // const newTenant = await assetService.createTenant(data)
      // setTenants([...tenants, newTenant])

      // Mock for now
      const newTenant: Tenant = {
        id: `TENANT-${Date.now()}`,
        name: data.name,
        description: data.description,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vulnerabilities_count: 0,
        risk_score: 0,
        projects: [],
      }
      setTenants([...tenants, newTenant])
      console.log('✅ Tenant created:', newTenant)
    } catch (error) {
      console.error('Failed to create tenant:', error)
      throw error
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateProject = async (data: { name: string; description?: string }) => {
    try {
      setIsCreating(true)
      if (!parentForCreate) throw new Error('No parent selected')

      // TODO: Replace with API call
      // const newProject = await assetService.createProject({
      //   tenant_id: parentForCreate.id,
      //   ...data,
      // })

      console.log('✅ Project created:', data)
    } catch (error) {
      console.error('Failed to create project:', error)
      throw error
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateEnvironment = async (data: {
    name: string
    type: any
    url?: string
    description?: string
  }) => {
    try {
      setIsCreating(true)
      if (!parentForCreate) throw new Error('No parent selected')

      // TODO: Replace with API call
      // const newEnv = await assetService.createEnvironment({
      //   sub_project_id: parentForCreate.id,
      //   ...data,
      // })

      console.log('✅ Environment created:', data)
    } catch (error) {
      console.error('Failed to create environment:', error)
      throw error
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateChild = (node: AssetTreeNode) => {
    setParentForCreate(node)
    if (node.type === AssetType.TENANT) {
      setCreateProjectOpen(true)
    } else if (node.type === AssetType.PROJECT || node.type === AssetType.SUB_PROJECT) {
      // For now, open environment dialog for both
      // In real app, you'd check level to decide
      setCreateEnvironmentOpen(true)
    }
  }

  const handleEdit = (node: AssetTreeNode) => {
    console.log('Edit:', node)
  }

  const handleDelete = (node: AssetTreeNode) => {
    console.log('Delete:', node)
  }

  // ===== RENDER =====
  return (
    <>
      {/* ===== HEADER ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== MAIN CONTENT ===== */}
      <Main className="min-h-screen !overflow-visible">
        {/* Page Title Section */}
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Assets</h1>
            <p className='text-sm text-muted-foreground mt-1'>
              Manage your organizational structure: Tenants, Projects, and Environments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseEnhancedView(!useEnhancedView)}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              {useEnhancedView ? 'Classic View' : 'Enhanced View'}
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={collapseAll}
              className='gap-2'
            >
              <ChevronUp className='h-4 w-4' />
              Collapse All
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={expandAll}
              className='gap-2'
            >
              <ChevronDown className='h-4 w-4' />
              Expand All
            </Button>
            <Button
              onClick={() => setCreateTenantOpen(true)}
              className='gap-2'
            >
              <Plus className='h-4 w-4' />
              New Tenant
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 pb-8'>
          {/* Asset Tree */}
          <div className='lg:col-span-1'>
            <Card>
              <CardHeader>
                <CardTitle>Asset Hierarchy</CardTitle>
                <CardDescription>
                  Expand to view projects and environments
                </CardDescription>
              </CardHeader>
              <CardContent className='overflow-y-auto max-h-[70vh]'>
                {loading ? (
                  <div className='flex items-center justify-center h-48'>
                    <div className='text-center'>
                      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2'></div>
                      <p className='text-sm text-muted-foreground'>Loading assets...</p>
                    </div>
                  </div>
                ) : tenants.length === 0 ? (
                  <div className='flex items-center justify-center h-48'>
                    <p className='text-sm text-muted-foreground'>No assets found</p>
                  </div>
                ) : (
                  <AssetTree
                    nodes={tree}
                    expandedNodes={expandedNodes}
                    selectedNode={selectedNode}
                    onToggleNode={toggleNode}
                    onSelectNode={(node) => {
                      selectNode(node)
                      setSelectedNode(node)
                    }}
                    onCreateChild={handleCreateChild}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Asset Details */}
          <div className='lg:col-span-2 min-h-[70vh]'>
            {useEnhancedView ? (
              <EnhancedAssetDetailPanel
                node={selectedNode}
              />
            ) : (
              <AssetDetailPanel
                node={selectedNode}
                onEdit={() => console.log('Edit')}
                onDelete={() => console.log('Delete')}
              />
            )}
          </div>
        </div>
      </Main>

      {/* ===== DIALOGS ===== */}
      <CreateTenantDialog
        isOpen={createTenantOpen}
        onClose={() => setCreateTenantOpen(false)}
        onSubmit={handleCreateTenant}
        isLoading={isCreating}
      />

      <CreateProjectDialog
        isOpen={createProjectOpen}
        parentName={parentForCreate?.name}
        onClose={() => {
          setCreateProjectOpen(false)
          setParentForCreate(null)
        }}
        onSubmit={handleCreateProject}
        isLoading={isCreating}
      />

      <CreateEnvironmentDialog
        isOpen={createEnvironmentOpen}
        parentName={parentForCreate?.name}
        onClose={() => {
          setCreateEnvironmentOpen(false)
          setParentForCreate(null)
        }}
        onSubmit={handleCreateEnvironment}
        isLoading={isCreating}
      />
    </>
  )
}

// Top navigation links
const topNav = [
  {
    title: 'Dashboard',
    href: '/',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Vulnerabilities',
    href: '/vulnerabilities',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Assets',
    href: '/assets',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Compliance',
    href: '/compliance',
    isActive: false,
    disabled: true,
  },
]
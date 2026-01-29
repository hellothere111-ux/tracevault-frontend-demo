import { useState } from 'react'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { VulnerabilitiesOverview } from './components/vulnerabilities-overview'
import { AppSecVulnerabilities } from './components/vulnerabilities-appsec'
import { OffSecVulnerabilities } from './components/vulnerabilities-offsec'
import { mockVulnerabilities, getVulnerabilityStats } from './data/mock-vulnerabilities-single-project'
import { BarChart3, Code, Sword, Building2, Globe } from 'lucide-react'

// Mock data for tenants and projects
const mockTenants = [
  { id: 'tenant-1', name: 'Production Tenant', type: 'tenant' },
  { id: 'tenant-2', name: 'Staging Tenant', type: 'tenant' },
  { id: 'tenant-3', name: 'Development Tenant', type: 'tenant' },
]

const mockProjects = [
  { id: 'axion-platform', name: 'Axion Security Platform', type: 'project', tenantId: 'tenant-1' },
]

// Combine tenants and projects for display
const getAllAssetOptions = () => {
  const options = []
  
  // Add tenants
  mockTenants.forEach(tenant => {
    options.push({
      id: tenant.id,
      name: tenant.name,
      type: 'tenant',
      level: 0
    })
  })
  
  // Add projects under their tenants
  mockProjects.forEach(project => {
    const tenant = mockTenants.find(t => t.id === project.tenantId)
    options.push({
      id: project.id,
      name: project.name,
      type: 'project',
      tenantId: project.tenantId,
      tenantName: tenant?.name,
      level: 1
    })
  })
  
  return options
}

export function Vulnerabilities() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [selectedAsset, setSelectedAsset] = useState('axion-platform') // Default to Axion project

  // Filter vulnerabilities based on selected asset
  const getFilteredVulnerabilities = () => {
    if (!selectedAsset) {
      return mockVulnerabilities
    }
    
    const allOptions = getAllAssetOptions()
    const asset = allOptions.find(p => p.id === selectedAsset)
    if (!asset) return mockVulnerabilities
    
    // For now, return all vulnerabilities since we're using single project
    return mockVulnerabilities
  }

  const filteredVulnerabilities = getFilteredVulnerabilities()
  const stats = getVulnerabilityStats(filteredVulnerabilities)

  return (
    <div className='flex flex-1 flex-col gap-4'>
      {/* ===== Header ===== */}
      <Header>
        <div className='ml-auto flex items-center space-x-2'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main Content ===== */}
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        {/* Page Title and Asset Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Vulnerability Management</h1>
            <p className='text-muted-foreground'>
              Track and manage security vulnerabilities across AppSec and OffSec domains
            </p>
          </div>
          
          {/* Asset Selector */}
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                {getAllAssetOptions().map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    <div className="flex items-center gap-2">
                      {option.type === 'project' && <Globe className="h-4 w-4" />}
                      <span>{option.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="appsec" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              AppSec
            </TabsTrigger>
            <TabsTrigger value="offsec" className="flex items-center gap-2">
              <Sword className="h-4 w-4" />
              OffSec
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <VulnerabilitiesOverview stats={stats} />
          </TabsContent>

          {/* AppSec Tab */}
          <TabsContent value="appsec">
            <AppSecVulnerabilities vulnerabilities={filteredVulnerabilities.filter(v => v.category === 'appsec')} />
          </TabsContent>

          {/* OffSec Tab */}
          <TabsContent value="offsec">
            <OffSecVulnerabilities vulnerabilities={filteredVulnerabilities.filter(v => v.category === 'offsec')} />
          </TabsContent>
        </Tabs>
      </Main>

      {/* ===== Config Drawer ===== */}
      <ConfigDrawer />
    </div>
  )
}

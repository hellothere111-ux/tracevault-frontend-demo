import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Play, Clock, CheckCircle, AlertCircle, BarChart3, RefreshCw, Eye, Download } from 'lucide-react'
import { ScanResultDetail } from './components/scan-result-detail'

// Mock scan data
const mockScanHistory = [
  {
    id: 'SCAN-001',
    type: 'SAST',
    tool: 'Snyk Code',
    project: 'API Backend',
    startTime: '2024-01-18 14:30',
    endTime: '2024-01-18 14:45',
    duration: '15 min',
    status: 'completed',
    issues: { critical: 2, high: 5, medium: 12, low: 8 },
  },
  {
    id: 'SCAN-002',
    type: 'SCA',
    tool: 'Snyk Open Source',
    project: 'Frontend App',
    startTime: '2024-01-18 13:15',
    endTime: '2024-01-18 13:28',
    duration: '13 min',
    status: 'completed',
    issues: { critical: 0, high: 3, medium: 8, low: 12 },
  },
  {
    id: 'SCAN-003',
    type: 'Container',
    tool: 'Snyk Container',
    project: 'Docker Images',
    startTime: '2024-01-18 12:00',
    endTime: '2024-01-18 12:22',
    duration: '22 min',
    status: 'completed',
    issues: { critical: 1, high: 2, medium: 5, low: 3 },
  },
  {
    id: 'SCAN-004',
    type: 'SAST',
    tool: 'Snyk Code',
    project: 'Microservices',
    startTime: '2024-01-18 15:00',
    endTime: null,
    duration: '5 min',
    status: 'scanning',
    issues: null,
  },
]

const scanTypes = [
  { id: 'sast', name: 'SAST - Static Code Analysis' },
  { id: 'sca', name: 'SCA - Software Composition Analysis' },
  { id: 'container', name: 'Container - Container Scanning' },
  { id: 'dast', name: 'DAST - Dynamic Application Security' },
]

const projects = [
  { id: 'api-backend', name: 'API Backend' },
  { id: 'frontend-app', name: 'Frontend App' },
  { id: 'docker-images', name: 'Docker Images' },
  { id: 'microservices', name: 'Microservices' },
  { id: 'mobile-app', name: 'Mobile App' },
  { id: 'web-portal', name: 'Web Portal' },
  { id: 'admin-panel', name: 'Admin Panel' },
  { id: 'api-gateway', name: 'API Gateway' },
  { id: 'auth-service', name: 'Authentication Service' },
  { id: 'payment-service', name: 'Payment Service' },
  { id: 'notification-service', name: 'Notification Service' },
  { id: 'analytics-service', name: 'Analytics Service' },
  { id: 'user-service', name: 'User Service' },
  { id: 'order-service', name: 'Order Service' },
  { id: 'inventory-service', name: 'Inventory Service' },
]

export function AppSec() {
  const [selectedScanType, setSelectedScanType] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [selectedScan, setSelectedScan] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [filters, setFilters] = useState({
    scanType: 'all',
    status: 'all',
    severity: 'all',
    dateRange: 'all'
  })

  const handleInitiateScan = () => {
    if (!selectedScanType || !selectedProject) {
      alert('Please select a scan type and project')
      return
    }

    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      alert('Scan initiated successfully!')
    }, 2000)
  }

  const handleViewScan = (scanId: string) => {
    setSelectedScan(scanId)
  }

  const handleBackToScans = () => {
    setSelectedScan(null)
  }

  // Filter functions
  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      scanType: 'all',
      status: 'all',
      severity: 'all',
      dateRange: 'all'
    })
  }

  const getFilteredScans = () => {
    return mockScanHistory.filter(scan => {
      if (filters.scanType !== 'all' && scan.type.toLowerCase() !== filters.scanType) {
        return false
      }
      if (filters.status !== 'all' && scan.status !== filters.status) {
        return false
      }
      if (filters.severity !== 'all') {
        if (!scan.issues) return false
        if (filters.severity === 'critical' && scan.issues.critical === 0) return false
        if (filters.severity === 'high' && scan.issues.high === 0) return false
        if (filters.severity === 'medium' && scan.issues.medium === 0) return false
        if (filters.severity === 'low' && scan.issues.low === 0) return false
      }
      // Date range filtering would be implemented here based on actual dates
      return true
    })
  }

  const filteredScans = getFilteredScans()

  // Calculate AppSec statistics
  const stats = {
    totalScans: mockScanHistory.length,
    activeScans: mockScanHistory.filter(s => s.status === 'scanning').length,
    criticalIssues: mockScanHistory.reduce((sum, s) => sum + (s.issues?.critical || 0), 0),
    resolvedIssues: 18,
    applicationsScanned: 8,
    avgScanTime: '16 min',
    lastScanDate: '2024-01-18',
    scanSuccessRate: '95%'
  }

  // Show detailed view if a scan is selected
  if (selectedScan) {
    return (
      <>
        <Header fixed>
          <Search />
          <div className='ms-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ConfigDrawer />
            <ProfileDropdown />
          </div>
        </Header>
        <Main className='flex flex-1 flex-col gap-6'>
          <ScanResultDetail 
            scanId={selectedScan} 
            onBack={handleBackToScans} 
          />
        </Main>
      </>
    )
  }

  return (
    <>
      {/* ===== Header ===== */}
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main Content ===== */}
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        {/* Page Title */}
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Application Security Scans</h1>
          <p className='text-muted-foreground'>
            Monitor security scans and manage application vulnerabilities
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="initiate-scan">Initiate Scan</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className='grid gap-6 lg:grid-cols-4'>
              {/* Main Dashboard Content */}
              <div className='lg:col-span-3 space-y-6'>
                {/* AppSec Overview */}
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  <Card>
                    <CardContent className='pt-6'>
                      <div className='text-2xl font-bold'>{stats.totalScans}</div>
                      <p className='text-xs text-muted-foreground'>Total Scans</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className='pt-6'>
                      <div className='text-2xl font-bold text-orange-600'>{stats.criticalIssues}</div>
                      <p className='text-xs text-muted-foreground'>Critical Issues</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className='pt-6'>
                      <div className='text-2xl font-bold text-red-600'>{stats.activeScans}</div>
                      <p className='text-xs text-muted-foreground'>Active Scans</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className='pt-6'>
                      <div className='text-2xl font-bold text-green-600'>{stats.resolvedIssues}</div>
                      <p className='text-xs text-muted-foreground'>Resolved Issues</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Metrics */}
                <div className='grid gap-4 md:grid-cols-3'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-base'>Applications Scanned</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='text-3xl font-bold'>{stats.applicationsScanned}</div>
                      <p className='text-sm text-muted-foreground'>Total applications</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-base'>Avg Scan Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='text-3xl font-bold'>{stats.avgScanTime}</div>
                      <p className='text-sm text-muted-foreground'>Per scan</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-base'>Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='text-3xl font-bold'>{stats.scanSuccessRate}</div>
                      <p className='text-sm text-muted-foreground'>Scan completion</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Scan History */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Recent Scans</CardTitle>
                    <CardDescription className='text-xs'>Click to view detailed scan results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {mockScanHistory.map((scan) => (
                        <div
                          key={scan.id}
                          className='flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors'
                        >
                          <div className='flex items-center gap-4 flex-1'>
                            {/* Status Icon */}
                            {scan.status === 'completed' ? (
                              <CheckCircle className='w-5 h-5 text-green-600' />
                            ) : (
                              <div className='w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin' />
                            )}

                            {/* Scan Info */}
                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center gap-2'>
                                <span className='font-medium'>{scan.tool}</span>
                                <Badge variant='outline' className='text-xs'>
                                  {scan.type}
                                </Badge>
                                {scan.status === 'scanning' && (
                                  <Badge variant='secondary' className='text-xs'>
                                    <Clock className='w-3 h-3 mr-1' />
                                    Scanning...
                                  </Badge>
                                )}
                              </div>
                              <div className='text-sm text-muted-foreground mt-1'>
                                {scan.project} • {scan.duration}
                              </div>
                              {scan.status === 'completed' && scan.issues && (
                                <div className='flex gap-2 mt-2'>
                                  {scan.issues.critical > 0 && (
                                    <span className='text-xs px-2 py-1 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-200 rounded'>
                                      C: {scan.issues.critical}
                                    </span>
                                  )}
                                  {scan.issues.high > 0 && (
                                    <span className='text-xs px-2 py-1 bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-200 rounded'>
                                      H: {scan.issues.high}
                                    </span>
                                  )}
                                  {scan.issues.medium > 0 && (
                                    <span className='text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-200 rounded'>
                                      M: {scan.issues.medium}
                                    </span>
                                  )}
                                  {scan.issues.low > 0 && (
                                    <span className='text-xs px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-200 rounded'>
                                      L: {scan.issues.low}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action */}
                          <Button variant='ghost' size='sm' onClick={() => handleViewScan(scan.id)}>
                            <Eye className='w-4 h-4' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Quick Actions */}
              <div className='lg:col-span-1 space-y-6'>
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <Button variant='outline' className='w-full justify-start' onClick={() => setSelectedTab('initiate-scan')}>
                      <Play className='w-4 h-4 mr-2' />
                      New Scan
                    </Button>
                    <Button variant='outline' className='w-full justify-start' onClick={() => setSelectedTab('reports')}>
                      <BarChart3 className='w-4 h-4 mr-2' />
                      View All Reports
                    </Button>
                    <Button variant='outline' className='w-full justify-start'>
                      <RefreshCw className='w-4 h-4 mr-2' />
                      Schedule Scans
                    </Button>
                    <div className="text-xs text-muted-foreground p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      Coming soon...
                    </div>
                  </CardContent>
                </Card>

                {/* Scan Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Scan Status</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                      <div>
                        <p className='text-sm font-medium'>Snyk Code</p>
                        <p className='text-xs text-muted-foreground'>API Backend</p>
                      </div>
                      <Badge variant='secondary' className='text-xs'>Running</Badge>
                    </div>
                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                      <div>
                        <p className='text-sm font-medium'>Snyk Container</p>
                        <p className='text-xs text-muted-foreground'>Docker Images</p>
                      </div>
                      <Badge variant='default' className='text-xs'>Completed</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Initiate Scan Tab */}
          <TabsContent value="initiate-scan" className="space-y-6">
            <div className='grid gap-6 lg:grid-cols-3'>
              {/* Main Scan Initiation */}
              <div className='lg:col-span-2 space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Initiate New Scan</CardTitle>
                    <CardDescription>Select a scan type and project to begin</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      {/* Scan Type Selection */}
                      <div>
                        <label className='text-sm font-medium block mb-3'>Scan Type</label>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                          {scanTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedScanType(type.id)}
                              className={`p-3 border rounded-lg text-sm text-center transition-colors ${
                                selectedScanType === type.id
                                  ? 'bg-blue-50 dark:bg-blue-950 border-blue-500'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              {type.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Project Selection */}
                      <div>
                        <label className='text-sm font-medium block mb-3'>Project</label>
                        <Select value={selectedProject || ""} onValueChange={setSelectedProject}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a project..." />
                          </SelectTrigger>
                          <SelectContent>
                            {projects.map((project) => (
                              <SelectItem key={project.id} value={project.id}>
                                {project.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedScanType && (
                        <Alert>
                          <AlertCircle className='h-4 w-4' />
                          <AlertDescription>
                            Scan will use: <strong>{scanTypes.find(st => st.id === selectedScanType)?.name}</strong>
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Action Buttons */}
                      <div className='flex gap-3'>
                        <Button onClick={handleInitiateScan} disabled={isScanning || !selectedScanType || !selectedProject}>
                          {isScanning ? (
                            <>
                              <RefreshCw className='w-4 h-4 mr-2 animate-spin' />
                              Initiating...
                            </>
                          ) : (
                            <>
                              <Play className='w-4 h-4 mr-2' />
                              Start Scan
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Scan Info */}
              <div className='lg:col-span-1 space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Scan Information</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div>
                      <h4 className='text-sm font-medium mb-2'>SAST - Static Code Analysis</h4>
                      <p className='text-xs text-muted-foreground'>
                        Analyzes source code for security vulnerabilities without executing the code.
                      </p>
                    </div>
                    <div>
                      <h4 className='text-sm font-medium mb-2'>SCA - Software Composition Analysis</h4>
                      <p className='text-xs text-muted-foreground'>
                        Scans dependencies and third-party libraries for known vulnerabilities.
                      </p>
                    </div>
                    <div>
                      <h4 className='text-sm font-medium mb-2'>Container Scanning</h4>
                      <p className='text-xs text-muted-foreground'>
                        Analyzes Docker images and container configurations for security issues.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className='grid gap-6 lg:grid-cols-4'>
              {/* Main Reports Content */}
              <div className='lg:col-span-3 space-y-6'>
                {/* Enhanced Filter Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Filter Reports</CardTitle>
                    <CardDescription className='text-xs'>Filter by scan type, status, severity, and date range</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-4 md:grid-cols-4'>
                      {/* Scan Type Filter */}
                      <div>
                        <label className='text-sm font-medium block mb-2'>Scan Type</label>
                        <Select value={filters.scanType} onValueChange={(value) => handleFilterChange('scanType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="sast">SAST</SelectItem>
                            <SelectItem value="sca">SCA</SelectItem>
                            <SelectItem value="container">Container</SelectItem>
                            <SelectItem value="dast">DAST</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Status Filter */}
                      <div>
                        <label className='text-sm font-medium block mb-2'>Status</label>
                        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="scanning">Scanning</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Severity Filter */}
                      <div>
                        <label className='text-sm font-medium block mb-2'>Severity</label>
                        <Select value={filters.severity} onValueChange={(value) => handleFilterChange('severity', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Severities" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Severities</SelectItem>
                            <SelectItem value="critical">Critical Only</SelectItem>
                            <SelectItem value="high">High+</SelectItem>
                            <SelectItem value="medium">Medium+</SelectItem>
                            <SelectItem value="low">Low+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Date Range Filter */}
                      <div>
                        <label className='text-sm font-medium block mb-2'>Date Range</label>
                        <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Filter Actions */}
                    <div className='flex items-center justify-between mt-4 pt-4 border-t'>
                      <div className='text-sm text-muted-foreground'>
                        Showing {filteredScans.length} of {mockScanHistory.length} reports
                      </div>
                      <div className='flex gap-2'>
                        <Button variant='outline' size='sm' onClick={clearFilters}>
                          Clear Filters
                        </Button>
                        <Button size='sm'>
                          Apply Filters
                        </Button>
                      </div>
                    </div>

                    {/* Active Filters Display */}
                    {(filters.scanType !== 'all' || filters.status !== 'all' || filters.severity !== 'all' || filters.dateRange !== 'all') && (
                      <div className='flex flex-wrap gap-2 mt-4'>
                        {filters.scanType !== 'all' && (
                          <Badge variant='secondary' className='text-xs'>
                            Type: {filters.scanType.toUpperCase()}
                            <button 
                              onClick={() => handleFilterChange('scanType', 'all')}
                              className='ml-1 hover:text-red-600'
                            >
                              ×
                            </button>
                          </Badge>
                        )}
                        {filters.status !== 'all' && (
                          <Badge variant='secondary' className='text-xs'>
                            Status: {filters.status}
                            <button 
                              onClick={() => handleFilterChange('status', 'all')}
                              className='ml-1 hover:text-red-600'
                            >
                              ×
                            </button>
                          </Badge>
                        )}
                        {filters.severity !== 'all' && (
                          <Badge variant='secondary' className='text-xs'>
                            Severity: {filters.severity}
                            <button 
                              onClick={() => handleFilterChange('severity', 'all')}
                              className='ml-1 hover:text-red-600'
                            >
                              ×
                            </button>
                          </Badge>
                        )}
                        {filters.dateRange !== 'all' && (
                          <Badge variant='secondary' className='text-xs'>
                            Date: {filters.dateRange}
                            <button 
                              onClick={() => handleFilterChange('dateRange', 'all')}
                              className='ml-1 hover:text-red-600'
                            >
                              ×
                            </button>
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Reports Header */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Security Scan Reports</CardTitle>
                    <CardDescription className='text-xs'>Comprehensive vulnerability analysis reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between'>
                      <div className='flex gap-2'>
                        <Button variant='outline' size='sm' disabled className='opacity-50 cursor-not-allowed'>
                          Export All
                        </Button>
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {filteredScans.length} reports available
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reports List */}
                <div className='space-y-4'>
                  {filteredScans.map((scan) => (
                    <Card key={scan.id} className='hover:shadow-md transition-shadow'>
                      <CardContent className='p-6'>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <div className='flex items-center gap-3 mb-2'>
                              <h3 className='text-lg font-semibold'>{scan.tool} - {scan.project}</h3>
                              <Badge variant='outline' className='text-xs'>
                                {scan.type}
                              </Badge>
                              {scan.status === 'completed' && (
                                <Badge variant='default' className='text-xs'>
                                  <CheckCircle className='w-3 h-3 mr-1' />
                                  Completed
                                </Badge>
                              )}
                              {scan.status === 'scanning' && (
                                <Badge variant='secondary' className='text-xs'>
                                  <Clock className='w-3 h-3 mr-1' />
                                  Scanning
                                </Badge>
                              )}
                            </div>
                            
                            <div className='grid gap-4 md:grid-cols-2 mb-4'>
                              <div>
                                <p className='text-sm text-muted-foreground'>Scan Details</p>
                                <p className='text-sm'>Started: {scan.startTime}</p>
                                {scan.endTime && <p className='text-sm'>Completed: {scan.endTime}</p>}
                                <p className='text-sm'>Duration: {scan.duration}</p>
                              </div>
                              <div>
                                <p className='text-sm text-muted-foreground'>Vulnerability Summary</p>
                                {scan.status === 'completed' && scan.issues ? (
                                  <div className='flex gap-2 mt-1'>
                                    {scan.issues.critical > 0 && (
                                      <span className='text-xs px-2 py-1 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-200 rounded'>
                                        Critical: {scan.issues.critical}
                                      </span>
                                    )}
                                    {scan.issues.high > 0 && (
                                      <span className='text-xs px-2 py-1 bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-200 rounded'>
                                        High: {scan.issues.high}
                                      </span>
                                    )}
                                    {scan.issues.medium > 0 && (
                                      <span className='text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-200 rounded'>
                                        Medium: {scan.issues.medium}
                                      </span>
                                    )}
                                    {scan.issues.low > 0 && (
                                      <span className='text-xs px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-200 rounded'>
                                        Low: {scan.issues.low}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <p className='text-sm'>Scan in progress...</p>
                                )}
                              </div>
                            </div>

                            <div className='flex gap-2'>
                              <Button size='sm' onClick={() => handleViewScan(scan.id)}>
                                <Eye className='w-4 h-4 mr-2' />
                                View Details
                              </Button>
                              <Button variant='outline' size='sm' disabled className='opacity-50 cursor-not-allowed'>
                                <Download className='w-4 h-4 mr-2' />
                                Download PDF
                              </Button>
                              <Button variant='outline' size='sm' disabled className='opacity-50 cursor-not-allowed'>
                                <RefreshCw className='w-4 h-4 mr-2' />
                                Re-scan
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar - Report Statistics Only */}
              <div className='lg:col-span-1 space-y-6'>
                {/* Report Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Report Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex justify-between'>
                      <span className='text-sm'>Total Reports</span>
                      <span className='text-sm font-medium'>{mockScanHistory.length}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm'>Filtered Results</span>
                      <span className='text-sm font-medium text-blue-600'>{filteredScans.length}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm'>This Month</span>
                      <span className='text-sm font-medium'>12</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm'>Avg Issues</span>
                      <span className='text-sm font-medium'>8.5</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm'>Critical Total</span>
                      <span className='text-sm font-medium text-red-600'>3</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Export Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Export Options</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <Button variant='outline' size='sm' className='w-full justify-start opacity-50 cursor-not-allowed' disabled>
                      Export All (PDF)
                    </Button>
                    <Button variant='outline' size='sm' className='w-full justify-start opacity-50 cursor-not-allowed' disabled>
                      Export Summary (CSV)
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

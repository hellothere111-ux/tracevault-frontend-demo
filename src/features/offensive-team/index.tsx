import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { VulnerabilityReportDetail } from './components/vulnerability-report-detail'
import {
  Upload,
  FileText,
  Trash2,
  Eye,
  FileCheck,
  AlertTriangle,
  Clock,
  Zap,
} from 'lucide-react'

// Project options
const projectOptions = [
  { id: 'all', label: 'All Projects', type: 'all' },
  { id: 'axion-platform', label: 'Axion Platform', type: 'project' },
  { id: 'payment-gateway', label: 'Payment Gateway', type: 'project' },
  { id: 'auth-service', label: 'Auth Service', type: 'project' },
  { id: 'api-service', label: 'API Service', type: 'project' },
  { id: 'mobile-backend', label: 'Mobile Backend', type: 'project' },
]

// Mock VAPT report data with project association
const mockVAPTReports = [
  {
    id: 'VAPT-001',
    name: 'Q1 2024 - External Penetration Test',
    uploadDate: '2024-01-18',
    uploadedBy: 'John Smith',
    status: 'processed',
    findings: 15,
    critical: 2,
    high: 5,
    medium: 6,
    low: 2,
    jiraTickets: 13,
    project: 'axion-platform',
  },
  {
    id: 'VAPT-002',
    name: 'Internal Network Assessment',
    uploadDate: '2024-01-15',
    uploadedBy: 'Sarah Johnson',
    status: 'processed',
    findings: 8,
    critical: 0,
    high: 2,
    medium: 4,
    low: 2,
    jiraTickets: 8,
    project: 'payment-gateway',
  },
  {
    id: 'VAPT-003',
    name: 'API Security Assessment',
    uploadDate: '2024-01-10',
    uploadedBy: 'Mike Chen',
    status: 'processing',
    findings: null,
    critical: null,
    high: null,
    medium: null,
    low: null,
    jiraTickets: null,
    project: 'api-service',
  },
  {
    id: 'VAPT-004',
    name: 'Auth Service Security Audit',
    uploadDate: '2024-01-08',
    uploadedBy: 'John Smith',
    status: 'processed',
    findings: 6,
    critical: 1,
    high: 2,
    medium: 2,
    low: 1,
    jiraTickets: 6,
    project: 'auth-service',
  },
]

export function OffensiveTeam() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState('all')
  const [selectedTab, setSelectedTab] = useState('overview')

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...droppedFiles])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const handleUpload = async () => {
    if (!files.length) {
      alert('Please select files to upload')
      return
    }

    setIsUploading(true)
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsUploading(false)
    alert(`Uploaded ${files.length} file(s) successfully`)
    setFiles([])
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleViewReport = (reportId: string) => {
    setSelectedReport(reportId)
  }

  const handleBackToReports = () => {
    setSelectedReport(null)
  }

  // Filter reports based on selected project
  const getFilteredReports = () => {
    if (selectedProject === 'all') {
      return mockVAPTReports
    }
    return mockVAPTReports.filter(report => report.project === selectedProject)
  }

  const filteredReports = getFilteredReports()

  // Calculate offensive security statistics based on filtered reports
  const stats = {
    totalReports: filteredReports.length,
    processedReports: filteredReports.filter(r => r.status === 'processed').length,
    totalFindings: filteredReports.reduce((sum, r) => sum + (r.findings || 0), 0),
    criticalIssues: filteredReports.reduce((sum, r) => sum + (r.critical || 0), 0),
    highIssues: filteredReports.reduce((sum, r) => sum + (r.high || 0), 0),
    remediationTasks: filteredReports.reduce((sum, r) => sum + (r.jiraTickets || 0), 0),
    jiraTickets: filteredReports.reduce((sum, r) => sum + (r.jiraTickets || 0), 0),
    vaptAssessmentsConducted: selectedProject === 'all' ? 12 : Math.floor(Math.random() * 4) + 1,
    avgSecurityAssessmentTime: selectedProject === 'all' ? '3.8 days' : Math.floor(Math.random() * 5) + 2 + ' days',
    lastAssessmentDate: filteredReports.length > 0 ? filteredReports[0].uploadDate : 'N/A'
  }

  // Show detailed view if a report is selected
  if (selectedReport) {
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
        <Main className='flex flex-1 flex-col gap-6 w-full'>
          <VulnerabilityReportDetail 
            reportId={selectedReport} 
            onBack={handleBackToReports} 
          />
        </Main>
      </>
    )
  }

  const selectedProjectData = projectOptions.find(p => p.id === selectedProject)

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
        {/* Page Title and Project Selector */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Red Team / VAPT Management</h1>
            <p className='text-muted-foreground'>
              Upload manual penetration testing reports and automatically create tasks
            </p>
          </div>

          {/* Project Selector */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-muted-foreground'>
              Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className='px-3 py-2 rounded-md border border-input bg-background text-sm'
            >
              {projectOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-4'>
          {/* Main Dashboard Content */}
          <div className='lg:col-span-3 space-y-6'>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='reports'>Reports</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value='overview' className='space-y-6'>
                {/* Offensive Security Overview */}
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>Total Reports</CardTitle>
                      <FileText className='h-4 w-4 text-blue-600' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>{stats.totalReports}</div>
                      <p className='text-xs text-muted-foreground'>VAPT assessments uploaded</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>Issues Found</CardTitle>
                      <AlertTriangle className='h-4 w-4 text-orange-600' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold text-orange-600'>{stats.totalFindings}</div>
                      <p className='text-xs text-muted-foreground'>Total vulnerabilities</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>Remediation Tasks</CardTitle>
                      <Zap className='h-4 w-4 text-red-600' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold text-red-600'>{stats.remediationTasks}</div>
                      <p className='text-xs text-muted-foreground'>Created tickets</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>VAPT Assessments</CardTitle>
                      <FileCheck className='h-4 w-4 text-green-600' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold text-green-600'>{stats.vaptAssessmentsConducted}</div>
                      <p className='text-xs text-muted-foreground'>Times tested manually</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Metrics */}
                <div className='grid gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-base'>Avg Security Assessment Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='text-3xl font-bold'>{stats.avgSecurityAssessmentTime}</div>
                      <p className='text-sm text-muted-foreground'>Average assessment duration</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-base'>Last Assessment Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='text-lg font-bold'>{stats.lastAssessmentDate}</div>
                      <p className='text-sm text-muted-foreground'>Most recent assessment</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Reports */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Recent Reports</CardTitle>
                    <CardDescription className='text-xs'>Latest VAPT assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {getFilteredReports().length === 0 ? (
                        <div className='text-center py-8'>
                          <p className='text-sm text-muted-foreground'>No reports found for the selected project.</p>
                        </div>
                      ) : (
                        getFilteredReports().slice(0, 3).map((report) => (
                          <div
                            key={report.id}
                            className='border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer'
                            onClick={() => handleViewReport(report.id)}
                          >
                          <div className='flex items-start justify-between mb-3'>
                            <div className='flex-1'>
                              <div className='flex items-center gap-2'>
                                <h4 className='font-medium text-sm'>{report.name}</h4>
                                {report.status === 'processing' && (
                                  <Badge variant='secondary' className='text-xs'>
                                    Processing
                                  </Badge>
                                )}
                                {report.status === 'processed' && (
                                  <Badge variant='outline' className='text-xs'>
                                    Processed
                                  </Badge>
                                )}
                              </div>
                              <p className='text-xs text-muted-foreground mt-1'>
                                Uploaded by {report.uploadedBy} on {report.uploadDate}
                              </p>
                            </div>
                            <Eye className='w-4 h-4 text-muted-foreground flex-shrink-0' />
                          </div>

                          {report.status === 'processed' && report.findings && (
                            <>
                              <div className='flex gap-1 text-xs font-medium mb-3'>
                                {report.critical && report.critical > 0 && (
                                  <span className='px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded'>
                                    C:{report.critical}
                                  </span>
                                )}
                                {report.high && report.high > 0 && (
                                  <span className='px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 rounded'>
                                    H:{report.high}
                                  </span>
                                )}
                                {report.medium && report.medium > 0 && (
                                  <span className='px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded'>
                                    M:{report.medium}
                                  </span>
                                )}
                                {report.low && report.low > 0 && (
                                  <span className='px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded'>
                                    L:{report.low}
                                  </span>
                                )}
                              </div>
                              <p className='text-xs text-muted-foreground'>
                                {report.findings} findings • {report.jiraTickets} tickets created
                              </p>
                            </>
                          )}

                          {report.status === 'processing' && (
                            <div className='flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400'>
                              <div className='h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin' />
                              Processing PDF and extracting findings...
                            </div>
                          )}
                        </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value='reports' className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>All Reports</CardTitle>
                    <CardDescription className='text-xs'>Click to view detailed vulnerability analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {getFilteredReports().length === 0 ? (
                        <div className='text-center py-8'>
                          <p className='text-sm text-muted-foreground'>No reports found for the selected project.</p>
                        </div>
                      ) : (
                        getFilteredReports().map((report) => (
                          <div
                            key={report.id}
                            className='border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer'
                            onClick={() => handleViewReport(report.id)}
                          >
                          <div className='flex items-start justify-between mb-3'>
                            <div className='flex-1'>
                              <div className='flex items-center gap-2'>
                                <h4 className='font-medium text-sm'>{report.name}</h4>
                                {report.status === 'processing' && (
                                  <Badge variant='secondary' className='text-xs'>
                                    Processing
                                  </Badge>
                                )}
                                {report.status === 'processed' && (
                                  <Badge variant='outline' className='text-xs'>
                                    Processed
                                  </Badge>
                                )}
                              </div>
                              <p className='text-xs text-muted-foreground mt-1'>
                                Uploaded by {report.uploadedBy} on {report.uploadDate}
                              </p>
                            </div>
                            <Eye className='w-4 h-4 text-muted-foreground flex-shrink-0' />
                          </div>

                          {report.status === 'processed' && report.findings && (
                            <>
                              <div className='flex gap-1 text-xs font-medium mb-3'>
                                {report.critical && report.critical > 0 && (
                                  <span className='px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded'>
                                    C:{report.critical}
                                  </span>
                                )}
                                {report.high && report.high > 0 && (
                                  <span className='px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 rounded'>
                                    H:{report.high}
                                  </span>
                                )}
                                {report.medium && report.medium > 0 && (
                                  <span className='px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded'>
                                    M:{report.medium}
                                  </span>
                                )}
                                {report.low && report.low > 0 && (
                                  <span className='px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded'>
                                    L:{report.low}
                                  </span>
                                )}
                              </div>
                              <p className='text-xs text-muted-foreground'>
                                {report.findings} findings • {report.jiraTickets} tickets created
                              </p>
                            </>
                          )}

                          {report.status === 'processing' && (
                            <div className='flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400'>
                              <div className='h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin' />
                              Processing PDF and extracting findings...
                            </div>
                          )}
                        </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Upload & Actions */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Upload Panel */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Upload VAPT Report</CardTitle>
                <CardDescription className='text-xs'>PDF or Excel format</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Drag and Drop */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Upload className='w-8 h-8 mx-auto mb-2 text-muted-foreground' />
                  <p className='text-sm font-medium'>Drag files here or click to browse</p>
                  <Input
                    type='file'
                    multiple
                    accept='.pdf,.xlsx,.xls'
                    onChange={handleFileSelect}
                    className='hidden'
                    id='file-input'
                  />
                  <label htmlFor='file-input' className='cursor-pointer'>
                    <span className='text-xs text-blue-600 dark:text-blue-400'>Click to select</span>
                  </label>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className='space-y-2'>
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className='flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded text-sm'
                      >
                        <div className='flex items-center gap-2 flex-1 min-w-0'>
                          <FileText className='w-4 h-4 flex-shrink-0 text-blue-600' />
                          <span className='truncate'>{file.name}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(idx)}
                          className='p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded'
                        >
                          <Trash2 className='w-4 h-4 text-red-600' />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button */}
                <Button
                  onClick={handleUpload}
                  disabled={isUploading || !files.length}
                  className='w-full'
                >
                  {isUploading ? 'Uploading...' : 'Upload & Process'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}

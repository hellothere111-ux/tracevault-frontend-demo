import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Code, AlertCircle, AlertTriangle, CheckCircle, Clock, Eye, Filter, MoreHorizontal, ChevronLeft, ChevronRight, Calendar, Target, X, Bug } from 'lucide-react'
import { Vulnerability } from '../data/organizational-vulnerabilities'
import { SimpleVulnerabilityDetailDialog } from './simple-vulnerability-detail-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AppSecVulnerabilitiesProps {
  vulnerabilities: Vulnerability[]
}

type SortField = 'severity' | 'status' | 'cvssScore' | 'createdDate' | 'dueDate'
type SortOrder = 'asc' | 'desc'
type ViewMode = 'list' | 'board' | 'timeline'

export function AppSecVulnerabilities({ vulnerabilities }: AppSecVulnerabilitiesProps) {
  const appsecVulns = vulnerabilities.filter(vuln => vuln.category === 'appsec')
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedVulns, setSelectedVulns] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>('severity')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedSource, setSelectedSource] = useState('all')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [currentPage, setCurrentPage] = useState(1)
  const [timelineMonth, setTimelineMonth] = useState<string>(new Date().toISOString())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const itemsPerPage = 10

  // Calculate stats
  const stats = {
    total: appsecVulns.length,
    critical: appsecVulns.filter(v => v.severity === 'Critical').length,
    high: appsecVulns.filter(v => v.severity === 'High').length,
    medium: appsecVulns.filter(v => v.severity === 'Medium').length,
    low: appsecVulns.filter(v => v.severity === 'Low').length,
    open: appsecVulns.filter(v => v.status === 'Open').length,
    inProgress: appsecVulns.filter(v => v.status === 'In Progress').length,
    fixed: appsecVulns.filter(v => v.status === 'Fixed').length,
    overdue: appsecVulns.filter(v => {
      if (v.status === 'Fixed' || v.status === 'Accepted' || v.status === 'False Positive') return false
      return new Date(v.dueDate) < new Date()
    }).length,
    avgCvss: appsecVulns.reduce((sum, v) => sum + v.cvssScore, 0) / appsecVulns.length || 0,
    mttr: 0 // Calculate based on fixed vulnerabilities
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fixed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Open': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Fixed': return <CheckCircle className="h-4 w-4" />
      case 'In Progress': return <Clock className="h-4 w-4" />
      case 'Open': return <Target className="h-4 w-4" />
      case 'Accepted': return <AlertCircle className="h-4 w-4" />
      case 'False Positive': return <X className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getSeverityValue = (severity: string): number => {
    switch (severity) {
      case 'Critical': return 4
      case 'High': return 3
      case 'Medium': return 2
      case 'Low': return 1
      default: return 0
    }
  }

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'severity':
        setSelectedSeverity(value)
        break
      case 'status':
        setSelectedStatus(value)
        break
      case 'source':
        setSelectedSource(value)
        break
    }
    setCurrentPage(1)
  }

  const handleViewVuln = (vuln: Vulnerability) => {
    setSelectedVuln(vuln)
    setIsDetailDialogOpen(true)
  }

  const handleSelectVuln = (vulnId: string, checked: boolean) => {
    if (checked) {
      setSelectedVulns(prev => [...prev, vulnId])
    } else {
      setSelectedVulns(prev => prev.filter(id => id !== vulnId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVulns(paginatedVulns.map(vuln => vuln.id))
    } else {
      setSelectedVulns([])
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on vulnerabilities:`, selectedVulns)
    // Handle bulk actions like create tickets, export, etc.
  }

  const handleVulnAction = (action: string, vuln: Vulnerability) => {
    console.log(`Action: ${action} on vulnerability:`, vuln.id)
    switch (action) {
      case 'view':
        handleViewVuln(vuln)
        break
      case 'edit':
        // Handle edit action
        console.log('Edit vulnerability:', vuln.id)
        break
      case 'assign':
        // Handle assign action
        console.log('Assign vulnerability:', vuln.id)
        break
      case 'create-ticket':
        // Handle create ticket action
        console.log('Create ticket for vulnerability:', vuln.id)
        break
      case 'export':
        // Handle export action
        console.log('Export vulnerability:', vuln.id)
        break
      case 'mark-fixed':
        // Handle mark as fixed action
        console.log('Mark vulnerability as fixed:', vuln.id)
        break
      case 'delete':
        // Handle delete action
        console.log('Delete vulnerability:', vuln.id)
        break
      default:
        console.log('Unknown action:', action)
    }
  }

  // Filter and sort vulnerabilities
  const filteredAndSortedVulns = appsecVulns
    .filter(vuln => selectedSeverity === 'all' || vuln.severity === selectedSeverity)
    .filter(vuln => selectedStatus === 'all' || vuln.status === selectedStatus)
    .filter(vuln => selectedSource === 'all' || vuln.source === selectedSource)
    .sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortField) {
        case 'severity':
          aValue = getSeverityValue(a.severity)
          bValue = getSeverityValue(b.severity)
          break
        case 'cvssScore':
          aValue = a.cvssScore
          bValue = b.cvssScore
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'createdDate':
          aValue = new Date(a.createdDate).getTime()
          bValue = new Date(b.createdDate).getTime()
          break
        case 'dueDate':
          aValue = new Date(a.dueDate).getTime()
          bValue = new Date(b.dueDate).getTime()
          break
        default:
          aValue = a.severity
          bValue = b.severity
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedVulns.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVulns = filteredAndSortedVulns.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* AppSec Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bug className="h-4 w-4 text-blue-600" />
              Total Vulnerabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-2">
              AppSec vulnerabilities (open + fixed)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.overdue}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Past due date
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Fixed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.fixed}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Successfully remediated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              Avg CVSS Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.avgCvss.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Risk severity average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AppSec Vulnerabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            AppSec Vulnerabilities
            <Badge variant="outline">{filteredAndSortedVulns.length} items</Badge>
          </CardTitle>
          
          {/* Filters and Controls */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedSeverity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
                className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Severity</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Fixed">Fixed</option>
              </select>
              
              <select
                value={selectedSource}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sources</option>
                <option value="snyk_sca">SCA</option>
                <option value="snyk_sast">SAST</option>
                <option value="snyk_dast">DAST</option>
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
                <option value="severity-desc">Severity (High to Low)</option>
                <option value="severity-asc">Severity (Low to High)</option>
                <option value="cvssScore-desc">CVSS Score (High to Low)</option>
                <option value="cvssScore-asc">CVSS Score (Low to High)</option>
                <option value="createdDate-desc">Created Date (Newest)</option>
                <option value="createdDate-asc">Created Date (Oldest)</option>
                <option value="dueDate-desc">Due Date (Nearest)</option>
                <option value="dueDate-asc">Due Date (Farthest)</option>
              </select>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 ml-auto">
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
            <div className="space-y-4">
              {/* Bulk Actions Toolbar */}
              {selectedVulns.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      {selectedVulns.length} vulnerability{selectedVulns.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('create-ticket')}>
                      Create Ticket
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                      Export
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('assign')}>
                      Assign
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('mark-fixed')}>
                      Mark as Fixed
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedVulns([])}>
                      Clear Selection
                    </Button>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-3 font-medium text-sm text-muted-foreground w-[5%]">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedVulns.length === paginatedVulns.length && paginatedVulns.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th className="text-left p-3 font-medium text-sm text-muted-foreground w-[15%]">ID</th>
                      <th className="text-left p-3 font-medium text-sm text-muted-foreground w-[28%]">Title</th>
                      <th className="text-left p-3 font-medium text-sm text-muted-foreground w-[10%]">Severity</th>
                      <th className="text-left p-3 font-medium text-sm text-muted-foreground w-[8%]">CVSS</th>
                      <th className="text-left p-3 font-medium text-sm text-muted-foreground w-[12%]">Status</th>
                      <th className="text-left p-3 font-medium text-sm text-muted-foreground w-[12%]">Scan Type</th>
                      <th className="text-left p-3 font-medium text-sm text-muted-foreground w-[10%]">Date Found</th>
                      <th className="text-center p-3 font-medium text-sm text-muted-foreground w-[10%]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedVulns.map((vuln) => (
                      <tr key={vuln.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedVulns.includes(vuln.id)}
                            onChange={(e) => handleSelectVuln(vuln.id, e.target.checked)}
                          />
                        </td>
                        <td className="p-3 cursor-pointer" onClick={() => handleViewVuln(vuln)}>
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground font-mono">{vuln.key}</span>
                          </div>
                        </td>
                        <td className="p-3 cursor-pointer" onClick={() => handleViewVuln(vuln)}>
                          <div className="space-y-1">
                            <h3 className="font-medium text-sm hover:text-blue-600 transition-colors">
                              {vuln.title}
                            </h3>
                            {vuln.cveId && (
                              <p className="text-xs text-muted-foreground">{vuln.cveId}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-3 cursor-pointer" onClick={() => handleViewVuln(vuln)}>
                          <Badge className={getSeverityColor(vuln.severity)}>
                            {vuln.severity}
                          </Badge>
                        </td>
                        <td className="p-3 cursor-pointer" onClick={() => handleViewVuln(vuln)}>
                          <span className="text-sm font-medium">{vuln.cvssScore}</span>
                        </td>
                        <td className="p-3 cursor-pointer" onClick={() => handleViewVuln(vuln)}>
                          <Badge className={getStatusColor(vuln.status)}>
                            {vuln.status}
                          </Badge>
                        </td>
                        <td className="p-3 cursor-pointer" onClick={() => handleViewVuln(vuln)}>
                          <div className="text-sm">{vuln.sourceLabel}</div>
                        </td>
                        <td className="p-3 cursor-pointer" onClick={() => handleViewVuln(vuln)}>
                          <div className="text-sm">
                            {new Date(vuln.createdDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleVulnAction('view', vuln)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleVulnAction('edit', vuln)}>
                                <Target className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleVulnAction('assign', vuln)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Assign
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleVulnAction('create-ticket', vuln)}>
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Create Ticket
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleVulnAction('export', vuln)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Export
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleVulnAction('mark-fixed', vuln)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Fixed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleVulnAction('delete', vuln)} className="text-red-600">
                                <X className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedVulns.length)} of {filteredAndSortedVulns.length} vulnerabilities
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {paginatedVulns.length === 0 && filteredAndSortedVulns.length > 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No vulnerabilities on this page</p>
                  <p className="text-sm">Try changing filters or going to a different page</p>
                </div>
              )}
              
              {filteredAndSortedVulns.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No AppSec vulnerabilities found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
          )}
          
          {viewMode === 'board' && (
            <div className="space-y-6">
              {[
                { severity: 'Critical', color: 'bg-red-500', filter: (v: any) => v.severity === 'Critical' },
                { severity: 'High', color: 'bg-orange-500', filter: (v: any) => v.severity === 'High' },
                { severity: 'Medium', color: 'bg-yellow-500', filter: (v: any) => v.severity === 'Medium' },
                { severity: 'Low', color: 'bg-green-500', filter: (v: any) => v.severity === 'Low' }
              ].map((section) => (
                <div key={section.severity} className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${section.color}`} />
                      <h3 className="font-semibold text-sm">{section.severity}</h3>
                    </div>
                    <Badge variant="secondary" className="font-medium">
                      {filteredAndSortedVulns.filter(section.filter).length}
                    </Badge>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => {
                          const container = document.getElementById(`scroll-container-${section.severity}`)
                          if (container) {
                            container.scrollBy({ left: -300, behavior: 'smooth' })
                          }
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <div 
                        id={`scroll-container-${section.severity}`}
                        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth p-1 bg-gradient-to-b from-background to-muted/20 rounded-xl border border-muted-foreground/20"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        {filteredAndSortedVulns
                          .filter(section.filter)
                          .map((vuln) => (
                            <Card key={vuln.id} className="group cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-border/50 bg-gradient-to-br from-card to-card/80 flex-shrink-0 w-80" onClick={() => handleViewVuln(vuln)}>
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">{vuln.key}</span>
                                    <Badge className={`${getSeverityColor(vuln.severity)} text-xs font-medium shrink-0`}>
                                      {vuln.severity}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <h4 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                  {vuln.title}
                                </h4>
                                
                                {vuln.cveId && (
                                  <p className="text-xs text-muted-foreground">{vuln.cveId}</p>
                                )}
                                
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>CVSS: {vuln.cvssScore}</span>
                                  <span>•</span>
                                  <span>{vuln.asset}</span>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(vuln.status)}
                                    <span className="text-xs text-muted-foreground">{vuln.status}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    {new Date(vuln.dueDate) < new Date() && vuln.status !== 'Fixed' && (
                                      <Badge variant="destructive" className="text-xs">
                                        Overdue
                                      </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs bg-background/50">
                                      {vuln.sourceLabel}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          
                        {filteredAndSortedVulns.filter(section.filter).length === 0 && (
                          <div className="flex flex-col items-center justify-center w-80 h-48 text-muted-foreground/50 border-2 border-dashed border-muted-foreground/20 rounded-xl">
                            <div className={`w-8 h-8 rounded-full mb-2 ${
                              section.severity === 'Critical' ? 'bg-red-100' :
                              section.severity === 'High' ? 'bg-orange-100' :
                              section.severity === 'Medium' ? 'bg-yellow-100' :
                              'bg-green-100'
                            }`} />
                            <p className="text-xs">No {section.severity.toLowerCase()} vulnerabilities</p>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => {
                          const container = document.getElementById(`scroll-container-${section.severity}`)
                          if (container) {
                            container.scrollBy({ left: 300, behavior: 'smooth' })
                          }
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {viewMode === 'timeline' && (
            <div className="space-y-6">
              {/* Timeline View - When vulnerabilities were found and reported */}
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Vulnerability Discovery Timeline</h3>
                  <div className="text-sm text-muted-foreground">
                    Last 30 days
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="space-y-4">
                  {appsecVulns
                    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
                    .slice(0, 10)
                    .map((vuln, index) => {
                      const createdDate = new Date(vuln.createdDate)
                      const isRecent = (Date.now() - createdDate.getTime()) < (7 * 24 * 60 * 60 * 1000) // Last 7 days
                      
                      return (
                        <div key={vuln.id} className="flex gap-4">
                          {/* Timeline indicator */}
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${isRecent ? 'bg-blue-600' : 'bg-gray-400'} border-2 border-white shadow-sm`}></div>
                            {index < 9 && <div className="w-0.5 h-16 bg-gray-200"></div>}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 pb-8">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Code className="h-4 w-4 text-blue-600" />
                                  <span className="text-xs font-mono text-muted-foreground">{vuln.key}</span>
                                  <Badge className={getSeverityColor(vuln.severity)}>
                                    {vuln.severity}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">CVSS: {vuln.cvssScore}</span>
                                  {isRecent && (
                                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                                      New
                                    </Badge>
                                  )}
                                </div>
                                <h4 className="text-sm font-medium mb-1">{vuln.title}</h4>
                                <p className="text-xs text-muted-foreground mb-2">{vuln.asset}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>Found: {createdDate.toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>Source: {vuln.sourceLabel}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {getStatusIcon(vuln.status)}
                                    <span>{vuln.status}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleViewVuln(vuln)}
                                className="h-8 px-2"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
                
                {/* Summary */}
                <div className="mt-8 pt-6 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {appsecVulns.filter(v => {
                          const daysSince = (Date.now() - new Date(v.createdDate).getTime()) / (24 * 60 * 60 * 1000)
                          return daysSince <= 7
                        }).length}
                      </div>
                      <div className="text-xs text-muted-foreground">Last 7 days</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {appsecVulns.filter(v => {
                          const daysSince = (Date.now() - new Date(v.createdDate).getTime()) / (24 * 60 * 60 * 1000)
                          return daysSince > 7 && daysSince <= 14
                        }).length}
                      </div>
                      <div className="text-xs text-muted-foreground">7-14 days ago</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {appsecVulns.filter(v => {
                          const daysSince = (Date.now() - new Date(v.createdDate).getTime()) / (24 * 60 * 60 * 1000)
                          return daysSince > 14 && daysSince <= 30
                        }).length}
                      </div>
                      <div className="text-xs text-muted-foreground">14-30 days ago</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-600">
                        {appsecVulns.filter(v => {
                          const daysSince = (Date.now() - new Date(v.createdDate).getTime()) / (24 * 60 * 60 * 1000)
                          return daysSince > 30
                        }).length}
                      </div>
                      <div className="text-xs text-muted-foreground">30+ days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Vulnerability Detail Dialog */}
      <SimpleVulnerabilityDetailDialog
        vulnerability={selectedVuln}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </div>
  )
}

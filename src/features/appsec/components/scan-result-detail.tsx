import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ArrowLeft, Download, Target, AlertTriangle, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react'
import { VulnerabilityDetailModal } from './vulnerability-detail-modal'

interface ScanResultDetailProps {
  scanId: string
  onBack: () => void
}

// Mock detailed vulnerability data for AppSec scans
const mockScanVulnerabilities = [
  {
    id: 1,
    date: '2024-01-18',
    vulnerabilityId: 'SAST-001',
    cveId: 'CVE-2024-1234',
    instances: 1,
    assessmentType: 'SAST',
    target: 'API Backend - auth.service.ts',
    vulnerabilityTitle: 'SQL Injection in Authentication Service',
    severity: 'Critical',
    targetedBranch: 'main',
    category: 'Injection',
    description: 'The authentication service contains a SQL injection vulnerability in the login function where user input is directly concatenated into SQL queries without proper sanitization.',
    risk: 'High - Complete database compromise possible',
    recommendation: 'Use parameterized queries or prepared statements to prevent SQL injection. Implement input validation and sanitization.',
    responsibleTeam: 'Backend Team',
    status: 'Open',
    source: 'Snyk Code',
    fixDate: null,
    riskAcceptance: false,
    remarks: 'Requires immediate attention as this affects authentication mechanism',
    reference: 'https://owasp.org/www-community/attacks/SQL_Injection'
  },
  {
    id: 2,
    date: '2024-01-18',
    vulnerabilityId: 'SCA-001',
    cveId: 'CVE-2024-5678',
    instances: 3,
    assessmentType: 'SCA',
    target: 'Frontend App - package.json dependencies',
    vulnerabilityTitle: 'Vulnerable NPM Package - lodash < 4.17.21',
    severity: 'High',
    targetedBranch: 'main',
    category: 'Dependency',
    description: 'The project uses an outdated version of lodash which contains known security vulnerabilities that could lead to prototype pollution attacks.',
    risk: 'Medium - Potential prototype pollution and DoS attacks',
    recommendation: 'Update lodash to version 4.17.21 or later. Consider using alternative libraries if possible.',
    responsibleTeam: 'Frontend Team',
    status: 'In Progress',
    source: 'Snyk Open Source',
    fixDate: '2024-01-20',
    riskAcceptance: false,
    remarks: 'Scheduled for next sprint deployment',
    reference: 'https://nvd.nist.gov/vuln/detail/CVE-2024-5678'
  },
  {
    id: 3,
    date: '2024-01-18',
    vulnerabilityId: 'CONT-001',
    cveId: 'CVE-2024-9012',
    instances: 1,
    assessmentType: 'Container',
    target: 'Docker Image - nginx:1.19-alpine',
    vulnerabilityTitle: 'Outdated Nginx Container Image',
    severity: 'Medium',
    targetedBranch: 'main',
    category: 'Container',
    description: 'The nginx container image is running version 1.19 which has known security vulnerabilities and is no longer supported.',
    risk: 'Low - Potential for known vulnerabilities in web server',
    recommendation: 'Update nginx container to the latest stable version (1.25+). Implement regular container image updates.',
    responsibleTeam: 'DevOps Team',
    status: 'Fixed',
    source: 'Snyk Container',
    fixDate: '2024-01-19',
    riskAcceptance: false,
    remarks: 'Updated in production',
    reference: 'https://nginx.org/en/security_advisories.html'
  },
  {
    id: 4,
    date: '2024-01-18',
    vulnerabilityId: 'SAST-002',
    cveId: null,
    instances: 2,
    assessmentType: 'SAST',
    target: 'API Backend - user.controller.ts',
    vulnerabilityTitle: 'Hardcoded API Keys in Source Code',
    severity: 'High',
    targetedBranch: 'main',
    category: 'Security Misconfiguration',
    description: 'API keys and database credentials are hardcoded directly in the source code, which poses a significant security risk.',
    risk: 'High - Unauthorized access to external services and database',
    recommendation: 'Move all credentials to environment variables or secure secret management systems. Never commit secrets to version control.',
    responsibleTeam: 'Backend Team',
    status: 'Open',
    source: 'Snyk Code',
    fixDate: null,
    riskAcceptance: false,
    remarks: 'Critical for production security',
    reference: 'https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication'
  }
]

const severityColors = {
  Critical: '#dc2626',
  High: '#ea580c',
  Medium: '#ca8a04',
  Low: '#0ea5e9'
}

const statusColors = {
  Open: '#dc2626',
  'In Progress': '#ca8a04',
  Fixed: '#16a34a',
  'Risk Accepted': '#6b7280'
}

export function ScanResultDetail({ scanId: _scanId, onBack }: ScanResultDetailProps) {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [selectedVulnerability, setSelectedVulnerability] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Calculate statistics
  const stats = {
    total: mockScanVulnerabilities.length,
    critical: mockScanVulnerabilities.filter(v => v.severity === 'Critical').length,
    high: mockScanVulnerabilities.filter(v => v.severity === 'High').length,
    medium: mockScanVulnerabilities.filter(v => v.severity === 'Medium').length,
    low: mockScanVulnerabilities.filter(v => v.severity === 'Low').length,
    open: mockScanVulnerabilities.filter(v => v.status === 'Open').length,
    inProgress: mockScanVulnerabilities.filter(v => v.status === 'In Progress').length,
    fixed: mockScanVulnerabilities.filter(v => v.status === 'Fixed').length,
    riskAccepted: mockScanVulnerabilities.filter(v => v.status === 'Risk Accepted').length
  }

  // Severity distribution for pie chart
  const severityData = [
    { name: 'Critical', value: stats.critical, color: severityColors.Critical },
    { name: 'High', value: stats.high, color: severityColors.High },
    { name: 'Medium', value: stats.medium, color: severityColors.Medium },
    { name: 'Low', value: stats.low, color: severityColors.Low }
  ].filter(item => item.value > 0)

  // Status distribution for bar chart
  const statusData = [
    { name: 'Open', value: stats.open, color: statusColors.Open },
    { name: 'In Progress', value: stats.inProgress, color: statusColors['In Progress'] },
    { name: 'Fixed', value: stats.fixed, color: statusColors.Fixed },
    { name: 'Risk Accepted', value: stats.riskAccepted, color: statusColors['Risk Accepted'] }
  ]

  const getSeverityBadge = (severity: string) => {
    const variants = {
      Critical: 'destructive',
      High: 'destructive',
      Medium: 'default',
      Low: 'secondary'
    } as const

    return (
      <Badge variant={variants[severity as keyof typeof variants] || 'secondary'}>
        {severity}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Open: 'destructive',
      'In Progress': 'default',
      Fixed: 'default',
      'Risk Accepted': 'secondary'
    } as const

    const icons = {
      Open: <XCircle className="w-3 h-3" />,
      'In Progress': <Clock className="w-3 h-3" />,
      Fixed: <CheckCircle className="w-3 h-3" />,
      'Risk Accepted': <AlertTriangle className="w-3 h-3" />
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status}
      </Badge>
    )
  }

  const handleViewVulnerability = (vulnerability: any) => {
    setSelectedVulnerability(vulnerability)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Scans
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Scan Results - SCAN-001</h2>
            <p className="text-muted-foreground">SAST Analysis - API Backend</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Completed
          </Badge>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Re-scan
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vulnerabilities</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Found in this scan</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
                <p className="text-xs text-muted-foreground">Require immediate action</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fixed Issues</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.fixed}</div>
                <p className="text-xs text-muted-foreground">Successfully resolved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                <p className="text-xs text-muted-foreground">Currently being addressed</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
                <CardDescription>Vulnerabilities by severity level</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Overview</CardTitle>
                <CardDescription>Vulnerabilities by current status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vulnerabilities Tab */}
        <TabsContent value="vulnerabilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Details</CardTitle>
              <CardDescription>Complete list of identified vulnerabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockScanVulnerabilities.map((vuln) => (
                    <TableRow key={vuln.id}>
                      <TableCell className="font-mono text-xs">{vuln.vulnerabilityId}</TableCell>
                      <TableCell className="text-xs">{vuln.date}</TableCell>
                      <TableCell className="max-w-xs truncate" title={vuln.vulnerabilityTitle}>
                        {vuln.vulnerabilityTitle}
                      </TableCell>
                      <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                      <TableCell>{getStatusBadge(vuln.status)}</TableCell>
                      <TableCell className="text-xs">{vuln.target}</TableCell>
                      <TableCell className="text-xs">{vuln.responsibleTeam}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewVulnerability(vuln)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Vulnerability Detail Modal */}
      <VulnerabilityDetailModal
        vulnerability={selectedVulnerability}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

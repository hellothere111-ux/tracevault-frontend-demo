import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, TrendingUp, Code, Sword, Activity, CheckCircle, Clock, Bug } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface VulnerabilitiesOverviewProps {
  stats: {
    total: number
    appsec: number
    offsec: number
    critical: number
    high: number
    medium: number
    low: number
    open: number
    inProgress: number
    fixed: number
    overdue: number
    avgCvss: number
    mttr: number
  }
}

export function VulnerabilitiesOverview({ stats }: VulnerabilitiesOverviewProps) {
  // Calculate percentages
  const completionRate = stats.total > 0 ? (stats.fixed / stats.total) * 100 : 0
  const overdueRate = stats.total > 0 ? (stats.overdue / stats.total) * 100 : 0

  // AppSec 30-Day Discovery Trends by Source
  const appsecSourceData = [
    { 
      month: 'Last 30 Days', 
      sca: 15, 
      sast: 12,
      dast: 8,
      total: 35
    }
  ]

  // OffSec 30-Day Discovery Trends by Severity
  const offsecSeverityData = [
    { 
      month: 'Last 30 Days', 
      critical: 8, 
      high: 14,
      medium: 18,
      low: 6,
      total: 46
    }
  ]

  // CVSS Score Trend (past 30 days, weekly data points)
  const cvssTrendData = [
    { date: 'Dec 29', avgScore: 7.2 },
    { date: 'Jan 5', avgScore: 6.8 },
    { date: 'Jan 12', avgScore: 6.5 },
    { date: 'Jan 19', avgScore: 6.2 },
    { date: 'Jan 26', avgScore: 5.9 },
  ]

  // Overall Vulnerability Trends (past 30 days, weekly data points)
  const overallTrendData = [
    { date: 'Dec 29', critical: 12, high: 25, medium: 18, low: 8 },
    { date: 'Jan 5', critical: 10, high: 22, medium: 20, low: 10 },
    { date: 'Jan 12', critical: 8, high: 20, medium: 22, low: 12 },
    { date: 'Jan 19', critical: 11, high: 24, medium: 19, low: 9 },
    { date: 'Jan 26', critical: 9, high: 21, medium: 21, low: 11 },
  ]

  // Top Critical Vulnerabilities
  const topCriticalVulns = [
    { 
      id: 'VULN-0042', 
      title: 'Remote Code Execution in API Gateway', 
      severity: 'Critical',
      asset: 'Axion API Gateway',
      cvssScore: 9.8,
      riskScore: 98,
      category: 'appsec'
    },
    { 
      id: 'VULN-0038', 
      title: 'SQL Injection in User Database', 
      severity: 'Critical',
      asset: 'Customer Database Server',
      cvssScore: 9.5,
      riskScore: 95,
      category: 'appsec'
    },
    { 
      id: 'VULN-0051', 
      title: 'Privilege Escalation in Admin Panel', 
      severity: 'Critical',
      asset: 'Admin Dashboard',
      cvssScore: 9.2,
      riskScore: 92,
      category: 'appsec'
    },
    { 
      id: 'VULN-0067', 
      title: 'Buffer Overflow in Web Service', 
      severity: 'Critical',
      asset: 'Web Application Frontend',
      cvssScore: 9.7,
      riskScore: 97,
      category: 'offsec'
    },
    { 
      id: 'VULN-0072', 
      title: 'Authentication Bypass in API', 
      severity: 'Critical',
      asset: 'API Gateway',
      cvssScore: 9.9,
      riskScore: 99,
      category: 'offsec'
    },
    { 
      id: 'VULN-0089', 
      title: 'Directory Traversal in File System', 
      severity: 'Critical',
      asset: 'Content Server',
      cvssScore: 9.3,
      riskScore: 93,
      category: 'offsec'
    },
  ]

  // Custom Tooltip for CVSS Trend
  const CVSSTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white p-3 rounded-lg border border-gray-200 shadow-lg'>
          <p className='font-semibold text-sm'>{payload[0].payload.date}</p>
          {payload.map((entry: any, idx: number) => (
            <p key={idx} style={{ color: entry.color }} className='text-xs'>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Top Row: Key Metrics */}
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
              Across all projects and sources
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Critical & High
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.critical + stats.high}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Critical: {stats.critical}, High: {stats.high}
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
              {overdueRate.toFixed(1)}% of total
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
              {completionRate.toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              Avg CVSS Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.avgCvss}</div>
            <p className="text-xs text-muted-foreground mt-2">
              MTTR: {stats.mttr} days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: AppSec and OffSec Monthly Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AppSec Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              AppSec Vulnerability Trends
            </CardTitle>
            <CardDescription>
              Vulnerabilities discovered by source in last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appsecSourceData.map((data) => (
                <div key={data.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="font-medium text-sm w-20">{data.month}</div>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">SCA: {data.sca}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">SAST: {data.sast}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      <span className="text-sm">DAST: {data.dast}</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    Total: <span className="text-blue-600">{data.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* OffSec Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sword className="h-5 w-5 text-red-600" />
              OffSec Vulnerability Trends
            </CardTitle>
            <CardDescription>
              Vulnerabilities discovered by severity in last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {offsecSeverityData.map((data) => (
                <div key={data.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="font-medium text-sm w-20">{data.month}</div>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Critical: {data.critical}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-sm">High: {data.high}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Medium: {data.medium}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Low: {data.low}</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    Total: <span className="text-red-600">{data.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CVSS Score Trend and Overall Vulnerability Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CVSS Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-600" />
              CVSS Score Trend
            </CardTitle>
            <CardDescription>
              Average CVSS score for past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cvssTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip content={<CVSSTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="#f97316" 
                  strokeWidth={2} 
                  name="Avg CVSS Score"
                  dot={{ fill: '#f97316', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey={() => 7.0} 
                  stroke="#dc2626" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  name="High Risk Threshold"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Overall Vulnerability Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Overall Vulnerability Trends
            </CardTitle>
            <CardDescription>
              Vulnerability trends for past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={overallTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="critical" stroke="#dc2626" strokeWidth={2} name="Critical" />
                <Line type="monotone" dataKey="high" stroke="#ea580c" strokeWidth={2} name="High" />
                <Line type="monotone" dataKey="medium" stroke="#ca8a04" strokeWidth={2} name="Medium" />
                <Line type="monotone" dataKey="low" stroke="#16a34a" strokeWidth={2} name="Low" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Critical Vulnerabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AppSec Top Critical */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              AppSec Top Critical
            </CardTitle>
            <CardDescription>
              Most critical AppSec vulnerabilities requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCriticalVulns.filter(v => v.category === 'appsec').map((vuln) => (
                <div key={vuln.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Code className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-mono text-muted-foreground">{vuln.id}</span>
                      <Badge variant="destructive" className="text-xs">
                        {vuln.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">CVSS: {vuln.cvssScore}</span>
                    </div>
                    <h4 className="text-sm font-medium mb-1">{vuln.title}</h4>
                    <p className="text-xs text-muted-foreground">{vuln.asset}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-red-600">
                      Risk Score: {vuln.riskScore}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* OffSec Top Critical */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              OffSec Top Critical
            </CardTitle>
            <CardDescription>
              Most critical OffSec vulnerabilities requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCriticalVulns.filter(v => v.category === 'offsec').map((vuln) => (
                <div key={vuln.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Sword className="h-4 w-4 text-red-600" />
                      <span className="text-xs font-mono text-muted-foreground">{vuln.id}</span>
                      <Badge variant="destructive" className="text-xs">
                        {vuln.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">CVSS: {vuln.cvssScore}</span>
                    </div>
                    <h4 className="text-sm font-medium mb-1">{vuln.title}</h4>
                    <p className="text-xs text-muted-foreground">{vuln.asset}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-red-600">
                      Risk Score: {vuln.riskScore}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

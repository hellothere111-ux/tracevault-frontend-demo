import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, AlertCircle, AlertTriangle, TrendingUp, Code, Sword, Activity } from 'lucide-react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
  AreaChart,
  Area,
} from 'recharts'

interface TasksOverviewProps {
  stats: {
    totalTasks: number
    inProgressTasks: number
    completedTasks: number
    blockedTasks: number
    highPriorityTasks: number
    overdueTasks: number
    completionRate: number
    appSecTasks: number
    offSecTasks: number
    remediationTasks: number
    currentTasks: number
    futureTasks: number
  }
}

export function TasksOverview({ stats }: TasksOverviewProps) {
  // Calculate MTTR (Mean Time To Resolution) in days
  const mttr = 4.2 // Mock calculation - would be based on actual task completion times
  
  // Top Priority Items - most critical items needing attention
  const topPriorityItems = [
    { 
      id: 'APP-001', 
      title: 'Critical Apache Struts Vulnerability', 
      severity: 'Critical',
      asset: 'Web Application Server',
      daysOverdue: 5,
      priority: 1
    },
    { 
      id: 'OFF-003', 
      title: 'Penetration Test Findings - Production', 
      severity: 'High',
      asset: 'Production Environment',
      daysOverdue: 3,
      priority: 2
    },
    { 
      id: 'APP-005', 
      title: 'SSL Certificate Expiration', 
      severity: 'High',
      asset: 'API Gateway',
      daysOverdue: 2,
      priority: 3
    },
    { 
      id: 'REM-012', 
      title: 'Database Security Patch Required', 
      severity: 'Critical',
      asset: 'Customer Database',
      daysOverdue: 1,
      priority: 4
    },
  ]

  // AppSec 30-Day Trends
  const appSecMonthlyData = [
    { 
      month: 'Last 30 Days', 
      opened: 42, 
      closed: 35,
      net: 7
    }
  ]

  // OffSec 30-Day Trends  
  const offSecMonthlyData = [
    { 
      month: 'Last 30 Days', 
      opened: 28, 
      closed: 22,
      net: 6
    }
  ]

  // MTTR Trend Data (past 30 days, daily values)
  const mttrTrendData = [
    { date: 'Dec 29', mttr: 12.8, sla: 10 },
    { date: 'Jan 5', mttr: 11.9, sla: 10 },
    { date: 'Jan 12', mttr: 11.2, sla: 10 },
    { date: 'Jan 19', mttr: 10.5, sla: 10 },
    { date: 'Jan 26', mttr: 9.8, sla: 10 },
  ]

  // Custom Tooltip for MTTR Trend
  const MTTRTooltip = ({ active, payload }: any) => {
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

  // Overall Remediation Trends (past 30 days, weekly data points)
  const overallTrendData = [
    { date: 'Dec 29', fixed: 25, created: 32, open: 48 },
    { date: 'Jan 5', fixed: 28, created: 35, open: 52 },
    { date: 'Jan 12', fixed: 31, created: 38, open: 55 },
    { date: 'Jan 19', fixed: 29, created: 34, open: 50 },
    { date: 'Jan 26', fixed: 33, created: 40, open: 50 },
  ]

  // SLA breaches by severity (without dots)
  const slaBreachesBySeverity = [
    { severity: 'Critical', count: 8, color: 'bg-red-500', textColor: 'text-red-600' },
    { severity: 'High', count: 15, color: 'bg-orange-500', textColor: 'text-orange-600' },
    { severity: 'Medium', count: 22, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { severity: 'Low', count: 12, color: 'bg-green-500', textColor: 'text-green-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              Total Remediation Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.remediationTasks}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Active vulnerability fixes and patches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              SLA Approaching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{Math.floor(stats.overdueTasks * 0.3)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Tasks approaching SLA deadline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              SLA Breaches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.overdueTasks}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Tasks past SLA deadline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.completedTasks} of {stats.totalTasks} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-600" />
              MTTR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{mttr}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Mean Time To Resolution (days)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends Section - AppSec and OffSec */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AppSec Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              AppSec Remediation Trends
            </CardTitle>
            <CardDescription>
              Remediations for last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appSecMonthlyData.map((data) => (
                <div key={data.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="font-medium text-sm w-20">{data.month}</div>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-blue-600">Opened: {data.opened}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-green-600">Closed: {data.closed}</span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded ${
                    data.net > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {data.net > 0 ? '+' : ''}{data.net}
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
              OffSec Remediation Trends
            </CardTitle>
            <CardDescription>
              Remediations for last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {offSecMonthlyData.map((data) => (
                <div key={data.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="font-medium text-sm w-20">{data.month}</div>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-red-600">Opened: {data.opened}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-green-600">Closed: {data.closed}</span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded ${
                    data.net > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {data.net > 0 ? '+' : ''}{data.net}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MTTR Graph and Overall Task Trends - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: MTTR Trend Graph (Exact same format as dashboard) */}
        <Card>
          <CardHeader>
            <CardTitle>MTTR Trend</CardTitle>
            <CardDescription>Mean Time To Remediate vs SLA target (10 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={mttrTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id='colorMTTR' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#f97316' stopOpacity={0.3} />
                    <stop offset='95%' stopColor='#f97316' stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id='colorSLA' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#16a34a' stopOpacity={0.3} />
                    <stop offset='95%' stopColor='#16a34a' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='date' stroke='#6b7280' style={{ fontSize: '12px' }} />
                <YAxis stroke='#6b7280' style={{ fontSize: '12px' }} />
                <Tooltip content={<MTTRTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Area
                  type='monotone'
                  dataKey='mttr'
                  stroke='#f97316'
                  strokeWidth={2}
                  fill='url(#colorMTTR)'
                  name='MTTR (Actual)'
                />
                <Line
                  type='monotone'
                  dataKey='sla'
                  stroke='#16a34a'
                  strokeWidth={2}
                  strokeDasharray='5 5'
                  dot={false}
                  name='SLA Target'
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Right: Overall Remediation Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Overall Remediation Trends
            </CardTitle>
            <CardDescription>
              Remediation trends for past 30 days
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
                <Line type="monotone" dataKey="fixed" stroke="#10b981" strokeWidth={2} name="Fixed" />
                <Line type="monotone" dataKey="created" stroke="#3b82f6" strokeWidth={2} name="Created" />
                <Line type="monotone" dataKey="open" stroke="#f59e0b" strokeWidth={2} name="Open" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Top Remediation Tasks and SLA Breaches Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Remediation Tasks Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Top Remediation Tasks
            </CardTitle>
            <CardDescription>
              Most critical remediation tasks requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPriorityItems.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
                      {item.priority}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{item.title}</span>
                        <Badge variant={item.severity === 'Critical' ? 'destructive' : 'secondary'} className="text-xs">
                          {item.severity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.id} • {item.asset}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-red-600">
                      {item.daysOverdue}d overdue
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SLA Breaches by Severity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              SLA Breaches by Severity
            </CardTitle>
            <CardDescription>
              Current SLA breaches broken down by severity level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {slaBreachesBySeverity.map((item) => (
                <div key={item.severity} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded ${item.color}`}></div>
                    <span className="font-medium text-sm">{item.severity}</span>
                  </div>
                  <Badge variant="secondary" className={item.textColor}>
                    {item.count}
                  </Badge>
                </div>
              ))}
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Breaches</span>
                  <Badge variant="destructive">
                    {slaBreachesBySeverity.reduce((sum, item) => sum + item.count, 0)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Analytics } from './components/analytics'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingDown,
  Activity,
  Zap,
  Target,
  AlertCircle,
  Shield,
  BarChart3,
  Calendar,
  Flame,
  Bug,
} from 'lucide-react'

export function Dashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            {/* Top Row: Critical Metrics */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
              {/* Open Vulnerabilities - Red/Critical */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Open Vulnerabilities
                  </CardTitle>
                  <Bug className='h-4 w-4 text-red-600' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-red-600'>287</div>
                  <p className='text-xs text-muted-foreground'>
                    <TrendingDown className='inline h-3 w-3 mr-1' />
                    -12% from last month
                  </p>
                </CardContent>
              </Card>

              {/* SLAs Approaching - Yellow/Warning */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    SLAs Approaching
                  </CardTitle>
                  <Clock className='h-4 w-4 text-yellow-600' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-yellow-600'>24</div>
                  <p className='text-xs text-muted-foreground'>
                    +8 from last week
                  </p>
                </CardContent>
              </Card>

              {/* SLAs Breached - Red/Critical */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    SLAs Breached
                  </CardTitle>
                  <AlertTriangle className='h-4 w-4 text-red-700' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-red-700'>7</div>
                  <p className='text-xs text-muted-foreground'>
                    -3 from last week
                  </p>
                </CardContent>
              </Card>

              {/* Remediated Vulns - Green/Success */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Remediated Vulns
                  </CardTitle>
                  <CheckCircle2 className='h-4 w-4 text-green-600' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-green-600'>156</div>
                  <p className='text-xs text-muted-foreground'>
                    +42 this month
                  </p>
                </CardContent>
              </Card>

              {/* Avg MTTR - Purple/Info */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Avg MTTR
                  </CardTitle>
                  <Activity className='h-4 w-4 text-purple-600' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-purple-600'>5.2d</div>
                  <p className='text-xs text-muted-foreground'>
                    <TrendingDown className='inline h-3 w-3 mr-1' />
                    -1.8d from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Second Row: Additional Metrics */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
              {/* Critical Vulnerabilities */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Critical Count
                  </CardTitle>
                  <AlertCircle className='h-4 w-4 text-red-700' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-red-700'>42</div>
                  <p className='text-xs text-muted-foreground'>
                    Requires immediate action
                  </p>
                </CardContent>
              </Card>

              {/* High Vulnerabilities */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    High Severity
                  </CardTitle>
                  <Zap className='h-4 w-4 text-orange-600' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-orange-600'>89</div>
                  <p className='text-xs text-muted-foreground'>
                    +5 from last week
                  </p>
                </CardContent>
              </Card>

              {/* Risk Score */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Risk Score
                  </CardTitle>
                  <Target className='h-4 w-4 text-amber-600' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-amber-600'>7.3/10</div>
                  <p className='text-xs text-muted-foreground'>
                    High risk exposure
                  </p>
                </CardContent>
              </Card>

              {/* Remediation Rate */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Remediation Rate
                  </CardTitle>
                  <BarChart3 className='h-4 w-4 text-blue-600' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-blue-600'>35%</div>
                  <p className='text-xs text-muted-foreground'>
                    On track for target
                  </p>
                </CardContent>
              </Card>

              {/* Assets at Risk */}
              <Card className=''>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Assets at Risk
                  </CardTitle>
                  <Shield className='h-4 w-4 text-pink-600' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-pink-600'>23</div>
                  <p className='text-xs text-muted-foreground'>
                    Require attention
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Vulnerability Trend</CardTitle>
                  <CardDescription>
                    Vulnerability count over the last 12 months
                  </CardDescription>
                </CardHeader>
                <CardContent className='ps-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Top Vulnerable Assets</CardTitle>
                  <CardDescription>
                    Assets with the most critical vulnerabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            <Analytics />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
]

import { type ChangeEvent, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { SlidersHorizontal, ArrowUpAZ, ArrowDownAZ, Shield, CheckCircle2, Clock, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { SnykConfigDialog } from './components/snyk-config-dialog'
import { JiraConfigDialog } from './components/jira-config-dialog'
import { AdaptiveSecurityConfigDialog } from './components/adaptive-security-config-dialog'
import { apps } from './data/apps'

const route = getRouteApi('/_authenticated/apps/')

type AppType = 'all' | 'connected' | 'notConnected'

const appText = new Map<AppType, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected'],
])

export function Apps() {
  const {
    filter = '',
    type = 'all',
    sort: initSort = 'asc',
  } = route.useSearch()
  const navigate = route.useNavigate()

  const [sort, setSort] = useState(initSort)
  const [appType, setAppType] = useState(type)
  const [searchTerm, setSearchTerm] = useState(filter)
  const [snykDialogOpen, setSnykDialogOpen] = useState(false)
  const [jiraDialogOpen, setJiraDialogOpen] = useState(false)
  const [adaptiveSecurityDialogOpen, setAdaptiveSecurityDialogOpen] = useState(false)

  const filteredApps = apps
    .sort((a, b) =>
      sort === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app) =>
      appType === 'connected'
        ? app.connected
        : appType === 'notConnected'
          ? !app.connected
          : true
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    navigate({
      search: (prev) => ({
        ...prev,
        filter: e.target.value || undefined,
      }),
    })
  }

  const handleTypeChange = (value: AppType) => {
    setAppType(value)
    navigate({
      search: (prev) => ({
        ...prev,
        type: value === 'all' ? undefined : value,
      }),
    })
  }

  const handleSortChange = (sort: 'asc' | 'desc') => {
    setSort(sort)
    navigate({ search: (prev) => ({ ...prev, sort }) })
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ms-auto flex items-center gap-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Content ===== */}
      <Main>
        <div className='space-y-6 pb-20'>
          <h1 className='text-2xl font-bold tracking-tight'>
            App Integrations
          </h1>
          <p className='text-muted-foreground'>
            Manage your security and project management integrations
          </p>
        </div>

        {/* ===== CRITICAL INTEGRATIONS SECTION ===== */}
        <div>
          <h2 className='mb-4 text-lg font-semibold'>Security & Project Management</h2>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {/* Snyk Integration Card */}
            <Card className='border-gray-200 dark:border-border'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div>
                    <CardTitle className='flex items-center gap-2'>
                      <Shield className='h-5 w-5 text-blue-600 dark:text-blue-400' />
                      Snyk
                    </CardTitle>
                    <CardDescription>Vulnerability Scanning</CardDescription>
                  </div>
                  <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
                    Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm text-foreground'>
                  Automated vulnerability scanning for SCA, SAST, and DAST analysis
                </p>
                <div className='space-y-2 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-600 dark:text-green-400' />
                    <span>Last scanned: 2 hours ago</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold'>Active Projects:</span>
                    <span>12</span>
                  </div>
                </div>
                <Button className='w-full' variant='outline' size='sm' onClick={() => setSnykDialogOpen(true)}>
                  Configure
                </Button>
              </CardContent>
            </Card>

            {/* Jira Integration Card */}
            <Card className='border-gray-200 dark:border-border'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div>
                    <CardTitle className='flex items-center gap-2'>
                      <Clock className='h-5 w-5 text-purple-600 dark:text-purple-400' />
                      Jira
                    </CardTitle>
                    <CardDescription>Task & Issue Tracking</CardDescription>
                  </div>
                  <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
                    Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm text-foreground'>
                  Sync tasks, sprints, and backlog with Jira for seamless project management
                </p>
                <div className='space-y-2 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-600 dark:text-green-400' />
                    <span>Last synced: 30 minutes ago</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold'>Active Sprints:</span>
                    <span>3</span>
                  </div>
                </div>
                <Button className='w-full' variant='outline' size='sm' onClick={() => setJiraDialogOpen(true)}>
                  Configure
                </Button>
              </CardContent>
            </Card>

            {/* Adaptive Security Integration Card */}
            <Card className='border-gray-200 dark:border-border'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div>
                    <CardTitle className='flex items-center gap-2'>
                      <Brain className='h-5 w-5 text-purple-600 dark:text-purple-400' />
                      Adaptive Security
                    </CardTitle>
                    <CardDescription>Security Awareness Training & Phishing Simulations</CardDescription>
                  </div>
                  <Badge className='bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'>
                    Not Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm text-foreground'>
                  Next-generation security training and AI-powered phishing simulations for employees
                </p>
                <div className='space-y-2 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-muted-400' />
                    <span>Not configured</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold'>Status:</span>
                    <span>Ready to connect</span>
                  </div>
                </div>
                <Button className='w-full' variant='outline' size='sm' onClick={() => setAdaptiveSecurityDialogOpen(true)}>
                  Configure
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className='my-6' />

        {/* ===== OTHER INTEGRATIONS ===== */}
        <div>
          <h2 className='mb-4 text-lg font-semibold'>DevOps & Source Control</h2>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter apps...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={handleSearch}
            />
            <Select value={appType} onValueChange={handleTypeChange}>
              <SelectTrigger className='w-36'>
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Apps</SelectItem>
                <SelectItem value='connected'>Connected</SelectItem>
                <SelectItem value='notConnected'>Not Connected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <SlidersHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='asc'>
                <div className='flex items-center gap-4'>
                  <ArrowUpAZ size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='desc'>
                <div className='flex items-center gap-4'>
                  <ArrowDownAZ size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className='shadow-sm' />
        <div className='grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredApps.map((app) => (
            <div
              key={app.name}
              className='rounded-lg border p-4 hover:shadow-md transition-shadow'
            >
              <div className='mb-4 flex items-center justify-between'>
                <div
                  className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                >
                  {app.logo}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className={`${app.connected ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900' : ''}`}
                >
                  {app.connected ? 'Connected' : 'Connect'}
                </Button>
              </div>
              <div>
                <h2 className='mb-1 font-semibold text-foreground'>{app.name}</h2>
                <p className='line-clamp-2 text-sm text-muted-foreground'>{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
        </div>

        <Separator className='my-6' />

        {/* ===== COMING SOON SECTION ===== */}
        <div>
          <h2 className='mb-4 text-lg font-semibold'>Coming Soon</h2>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[
              {
                name: 'SonarQube',
                description: 'Code quality and security analysis',
                icon: '📊',
              },
              {
                name: 'OAuth 2.0',
                description: 'Enterprise SSO and authentication',
                icon: '🔐',
              },
              {
                name: 'Kubernetes',
                description: 'Container orchestration and deployment',
                icon: '☸️',
              },
              {
                name: 'Terraform',
                description: 'Infrastructure as Code management',
                icon: '🏗️',
              },
              {
                name: 'Datadog',
                description: 'Monitoring and observability platform',
                icon: '📈',
              },
              {
                name: 'PagerDuty',
                description: 'Incident response and alerting',
                icon: '🚨',
              },
            ].map((app) => (
              <Card key={app.name} className='opacity-75'>
                <CardContent className='pt-6'>
                  <div className='text-center'>
                    <div className='text-4xl mb-3'>{app.icon}</div>
                    <h3 className='font-semibold text-foreground mb-1'>{app.name}</h3>
                    <p className='text-xs text-muted-foreground mb-4'>{app.description}</p>
                    <Badge variant='secondary' className='text-xs'>
                      Coming Soon
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Main>

      {/* Config Dialogs */}
      <SnykConfigDialog open={snykDialogOpen} onOpenChange={setSnykDialogOpen} />
      <JiraConfigDialog open={jiraDialogOpen} onOpenChange={setJiraDialogOpen} />
      <AdaptiveSecurityConfigDialog open={adaptiveSecurityDialogOpen} onOpenChange={setAdaptiveSecurityDialogOpen} />
    </>
  )
}

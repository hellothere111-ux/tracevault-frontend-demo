import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Code,
  Sword,
  AlertTriangle,
  Activity,
  Target,
  AlertCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// 6-month remediation trend data
const appSecRemediationData = [
  { month: 'Aug', opened: 18, closed: 12, net: 6 },
  { month: 'Sep', opened: 16, closed: 15, net: 1 },
  { month: 'Oct', opened: 14, closed: 18, net: -4 },
  { month: 'Nov', opened: 12, closed: 22, net: -10 },
  { month: 'Dec', opened: 10, closed: 25, net: -15 },
  { month: 'Jan', opened: 8, closed: 28, net: -20 },
]

const offSecRemediationData = [
  { month: 'Aug', opened: 14, closed: 8, net: 6 },
  { month: 'Sep', opened: 12, closed: 11, net: 1 },
  { month: 'Oct', opened: 10, closed: 13, net: -3 },
  { month: 'Nov', opened: 9, closed: 16, net: -7 },
  { month: 'Dec', opened: 8, closed: 19, net: -11 },
  { month: 'Jan', opened: 6, closed: 21, net: -15 },
]

// Vulnerabilities found data split by AppSec and OffSec
const vulnDataAppSec = [
  { month: 'Aug', critical: 8, high: 15, medium: 24, total: 47 },
  { month: 'Sep', critical: 6, high: 14, medium: 22, total: 42 },
  { month: 'Oct', critical: 7, high: 12, medium: 20, total: 39 },
  { month: 'Nov', critical: 5, high: 11, medium: 18, total: 34 },
  { month: 'Dec', critical: 4, high: 9, medium: 16, total: 29 },
  { month: 'Jan', critical: 3, high: 8, medium: 14, total: 25 },
]

const vulnDataOffSec = [
  { month: 'Aug', critical: 6, high: 12, medium: 18, total: 36 },
  { month: 'Sep', critical: 5, high: 11, medium: 16, total: 32 },
  { month: 'Oct', critical: 6, high: 10, medium: 15, total: 31 },
  { month: 'Nov', critical: 4, high: 9, medium: 14, total: 27 },
  { month: 'Dec', critical: 3, high: 7, medium: 12, total: 22 },
  { month: 'Jan', critical: 2, high: 6, medium: 10, total: 18 },
]

// SLA breach data by asset
const appSecSLAAssets = [
  { asset: 'Payment API', breaches: 3, severity: 'critical' },
  { asset: 'Auth Service', breaches: 2, severity: 'high' },
  { asset: 'User Portal', breaches: 2, severity: 'high' },
  { asset: 'Dashboard', breaches: 1, severity: 'high' },
  { asset: 'API Gateway', breaches: 1, severity: 'high' },
]

const offSecSLAAssets = [
  { asset: 'Production Servers', breaches: 2, severity: 'critical' },
  { asset: 'Database Cluster', breaches: 2, severity: 'high' },
  { asset: 'VPN Gateway', breaches: 1, severity: 'high' },
  { asset: 'Load Balancer', breaches: 1, severity: 'high' },
  { asset: 'Storage System', breaches: 1, severity: 'high' },
]

export function Analytics() {
  return (
    <div className='space-y-6'>
      {/* Top Row: Key Metrics Split by AppSec and OffSec */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Code className='h-4 w-4 text-blue-600' />
              AppSec Vulns Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>25</div>
            <p className='text-xs text-muted-foreground'>
              Critical: 3, High: 8, Medium: 14
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Sword className='h-4 w-4 text-red-600' />
              OffSec Vulns Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>18</div>
            <p className='text-xs text-muted-foreground'>
              Critical: 2, High: 6, Medium: 10
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <AlertCircle className='h-4 w-4 text-orange-600' />
              Total Remediations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>128</div>
            <p className='text-xs text-muted-foreground'>
              AppSec: 78, OffSec: 50
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Activity className='h-4 w-4 text-purple-600' />
              Avg MTTR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>6.5d</div>
            <p className='text-xs text-muted-foreground'>
              AppSec: 5.2d, OffSec: 7.9d
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Remediation Trends - 6 Months (List Format) */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* AppSec Remediation Trends */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Code className='h-5 w-5 text-blue-600' />
              AppSec Remediation Trends (6M)
            </CardTitle>
            <CardDescription>
              Vulnerabilities opened vs closed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {appSecRemediationData.map((data) => (
                <div key={data.month} className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='font-medium text-sm w-12'>{data.month}</div>
                  <div className='flex items-center gap-4 flex-1'>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 rounded-full bg-blue-500'></div>
                      <span className='text-sm text-blue-600'>Opened: {data.opened}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 rounded-full bg-green-500'></div>
                      <span className='text-sm text-green-600'>Fixed: {data.closed}</span>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      data.net > 0
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {data.net > 0 ? '+' : ''}{data.net}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* OffSec Remediation Trends */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Sword className='h-5 w-5 text-red-600' />
              OffSec Remediation Trends (6M)
            </CardTitle>
            <CardDescription>
              Vulnerabilities opened vs closed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {offSecRemediationData.map((data) => (
                <div key={data.month} className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='font-medium text-sm w-12'>{data.month}</div>
                  <div className='flex items-center gap-4 flex-1'>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 rounded-full bg-red-500'></div>
                      <span className='text-sm text-red-600'>Opened: {data.opened}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 rounded-full bg-green-500'></div>
                      <span className='text-sm text-green-600'>Fixed: {data.closed}</span>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      data.net > 0
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {data.net > 0 ? '+' : ''}{data.net}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vulnerabilities by Severity - 6 Months Summary */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* AppSec Vulnerabilities */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Code className='h-5 w-5 text-blue-600' />
              AppSec Vulnerabilities (6M)
            </CardTitle>
            <CardDescription>
              By severity level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {vulnDataAppSec.map((data) => (
                <div key={data.month} className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='font-medium text-sm w-12'>{data.month}</div>
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='flex items-center gap-1'>
                      <div className='w-2 h-2 rounded-full bg-red-600'></div>
                      <span className='text-xs text-red-600'>C:{data.critical}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <div className='w-2 h-2 rounded-full bg-orange-500'></div>
                      <span className='text-xs text-orange-600'>H:{data.high}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <div className='w-2 h-2 rounded-full bg-yellow-500'></div>
                      <span className='text-xs text-yellow-600'>M:{data.medium}</span>
                    </div>
                  </div>
                  <Badge variant='outline' className='text-xs'>
                    {data.total}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* OffSec Vulnerabilities */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Sword className='h-5 w-5 text-red-600' />
              OffSec Vulnerabilities (6M)
            </CardTitle>
            <CardDescription>
              By severity level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {vulnDataOffSec.map((data) => (
                <div key={data.month} className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='font-medium text-sm w-12'>{data.month}</div>
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='flex items-center gap-1'>
                      <div className='w-2 h-2 rounded-full bg-red-600'></div>
                      <span className='text-xs text-red-600'>C:{data.critical}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <div className='w-2 h-2 rounded-full bg-orange-500'></div>
                      <span className='text-xs text-orange-600'>H:{data.high}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <div className='w-2 h-2 rounded-full bg-yellow-500'></div>
                      <span className='text-xs text-yellow-600'>M:{data.medium}</span>
                    </div>
                  </div>
                  <Badge variant='outline' className='text-xs'>
                    {data.total}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Assets with SLA Breaches */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* AppSec SLA Breaches */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Code className='h-5 w-5 text-blue-600' />
              AppSec Assets with SLA Breaches
            </CardTitle>
            <CardDescription>
              Top assets requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {appSecSLAAssets.map((asset, idx) => (
                <div key={idx} className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex-1'>
                    <p className='font-medium text-sm'>{asset.asset}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge variant='outline' className='text-xs'>
                      {asset.breaches} breach{asset.breaches !== 1 ? 'es' : ''}
                    </Badge>
                    <Badge
                      variant={asset.severity === 'critical' ? 'destructive' : 'secondary'}
                      className='text-xs'
                    >
                      {asset.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* OffSec SLA Breaches */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Sword className='h-5 w-5 text-red-600' />
              OffSec Assets with SLA Breaches
            </CardTitle>
            <CardDescription>
              Top assets requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {offSecSLAAssets.map((asset, idx) => (
                <div key={idx} className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex-1'>
                    <p className='font-medium text-sm'>{asset.asset}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge variant='outline' className='text-xs'>
                      {asset.breaches} breach{asset.breaches !== 1 ? 'es' : ''}
                    </Badge>
                    <Badge
                      variant={asset.severity === 'critical' ? 'destructive' : 'secondary'}
                      className='text-xs'
                    >
                      {asset.severity}
                    </Badge>
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

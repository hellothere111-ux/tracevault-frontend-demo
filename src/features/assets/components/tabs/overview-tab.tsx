import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Activity, PieChart, AlertCircle, Clock, CheckCircle } from 'lucide-react'
import type { AssetTreeNode } from '../../types/asset.types'

interface OverviewTabProps {
  node: AssetTreeNode | null
}

export function OverviewTab({ node }: OverviewTabProps) {
  if (!node) return null

  const vulnerabilityTrend = [
    { month: 'Jan', discovered: 8, resolved: 5 },
    { month: 'Feb', discovered: 12, resolved: 10 },
    { month: 'Mar', discovered: 6, resolved: 8 },
    { month: 'Apr', discovered: 15, resolved: 12 },
    { month: 'May', discovered: 9, resolved: 11 },
    { month: 'Jun', discovered: 7, resolved: 9 }
  ]

  const severityBreakdown = [
    { severity: 'Critical', count: 2, color: 'bg-red-500' },
    { severity: 'High', count: 4, color: 'bg-orange-500' },
    { severity: 'Medium', count: 3, color: 'bg-yellow-500' },
    { severity: 'Low', count: 3, color: 'bg-green-500' }
  ]

  const criticalAndHigh = 6 // 2 Critical + 4 High
  const currentRisk = node.data?.risk_score || 0

  return (
    <div className="space-y-6">
      {/* Key Analytics Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 w-fit">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total</span>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">45</p>
                <p className="text-xs font-semibold text-muted-foreground mt-2">Known vulnerabilities</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 w-fit">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Alert</span>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">{criticalAndHigh}</p>
                <p className="text-xs font-semibold text-muted-foreground mt-2">Critical & High</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 w-fit">
                  <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Issues</span>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">3</p>
                <p className="text-xs font-semibold text-muted-foreground mt-2">SLA Breached</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 w-fit">
                  <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Speed</span>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">4.2d</p>
                <p className="text-xs font-semibold text-muted-foreground mt-2">Mean time to resolve</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 w-fit">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Fixed</span>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">28</p>
                <p className="text-xs font-semibold text-muted-foreground mt-2">Resolved this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vulnerability Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Vulnerability Discovery vs Resolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vulnerabilityTrend.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm w-12">{item.month}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div 
                      className="bg-red-500 dark:bg-red-400 h-4 rounded"
                      style={{ width: `${(item.discovered / 20) * 100}%` }}
                      title={`Discovered: ${item.discovered}`}
                    ></div>
                    <div 
                      className="bg-green-500 dark:bg-green-400 h-4 rounded"
                      style={{ width: `${(item.resolved / 20) * 100}%` }}
                      title={`Resolved: ${item.resolved}`}
                    ></div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="outline" className="text-red-600 border-red-200">
                      +{item.discovered}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      -{item.resolved}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Severity Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Severity Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {severityBreakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="text-sm font-medium w-20">{item.severity}</span>
                  <div className="flex-1">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full ${item.color}`}
                        style={{ width: `${(item.count / 12) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

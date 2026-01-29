import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Activity, Target, BarChart3, PieChart } from 'lucide-react'
import type { AssetTreeNode } from '../../types/asset.types'

interface AnalyticsTabProps {
  node: AssetTreeNode | null
}

export function AnalyticsTab({ node }: AnalyticsTabProps) {
  if (!node) return null

  // Mock analytics data - ensure there's data for the graph
  const riskTrend = [
    { month: 'Jan', score: 7.2 },
    { month: 'Feb', score: 6.8 },
    { month: 'Mar', score: 6.5 },
    { month: 'Apr', score: 6.7 },
    { month: 'May', score: 6.5 },
    { month: 'Jun', score: 6.1 }
  ]

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

  const currentRisk = node.data?.risk_score || 0
  const previousRisk = riskTrend[riskTrend.length - 2]?.score || 0
  const riskImprovement = previousRisk - currentRisk

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Risk</p>
                <p className="text-2xl font-bold">{currentRisk.toFixed(1)}</p>
              </div>
              <div className="flex items-center gap-1">
                {riskImprovement > 0 ? (
                  <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400 dark:text-green-400" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400 dark:text-red-400" />
                )}
                <span className={`text-sm font-medium ${
                  riskImprovement > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {Math.abs(riskImprovement).toFixed(1)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">MTTR</p>
                <p className="text-2xl font-bold">4.2d</p>
              </div>
              <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400 dark:text-green-400" />
            </div>
            <p className="text-xs text-muted-foreground">Days to resolve</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Scan Coverage</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-muted-foreground">Assets scanned</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-xs text-muted-foreground">Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Risk Score Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Line Graph */}
            <div className="h-48 bg-gray-50 dark:bg-card rounded-lg p-4 relative">
              {/* Grid Lines */}
              <div className="absolute inset-4 flex flex-col justify-between">
                <div className="border-b border-gray-200 dark:border-gray-600"></div>
                <div className="border-b border-gray-200 dark:border-gray-600"></div>
                <div className="border-b border-gray-200 dark:border-gray-600"></div>
                <div className="border-b border-gray-200 dark:border-gray-600"></div>
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>10</span>
                <span>7.5</span>
                <span>5</span>
                <span>2.5</span>
                <span>0</span>
              </div>
              
              {/* Line Chart */}
              <svg className="absolute inset-4 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Line Path */}
                <polyline
                  fill="none"
                  stroke="#3B82F6" class="dark:stroke-blue-400"
                  strokeWidth="2"
                  points="0,28 20,32 40,35 60,33 80,35 100,39"
                  className="drop-shadow-sm"
                />
                
                {/* Data Points */}
                <circle cx="0" cy="28" r="3" fill="#3B82F6" class="dark:fill-blue-400" className="hover:r-4 transition-all cursor-pointer" />
                <circle cx="20" cy="32" r="3" fill="#3B82F6" class="dark:fill-blue-400" className="hover:r-4 transition-all cursor-pointer" />
                <circle cx="40" cy="35" r="3" fill="#3B82F6" class="dark:fill-blue-400" className="hover:r-4 transition-all cursor-pointer" />
                <circle cx="60" cy="33" r="3" fill="#3B82F6" class="dark:fill-blue-400" className="hover:r-4 transition-all cursor-pointer" />
                <circle cx="80" cy="35" r="3" fill="#3B82F6" class="dark:fill-blue-400" className="hover:r-4 transition-all cursor-pointer" />
                <circle cx="100" cy="39" r="3" fill="#3B82F6" class="dark:fill-blue-400" className="hover:r-4 transition-all cursor-pointer" />
                
                {/* Area under the line */}
                <polygon
                  fill="url(#gradient)"
                  opacity="0.3"
                  points="0,28 20,32 40,35 60,33 80,35 100,39 100,100 0,100"
                />
                
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" class="dark:stop-color-blue-400" />
                    <stop offset="100%" stopColor="#3B82F6" class="dark:stop-color-blue-400" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Month Labels */}
            <div className="flex justify-between px-4 text-xs text-muted-foreground dark:text-gray-400">
              {riskTrend.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  {item.month}
                </div>
              ))}
            </div>
            
            {/* Score Values */}
            <div className="flex justify-between px-4 text-xs font-medium text-gray-900 dark:text-foreground">
              {riskTrend.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  {item.score}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

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
                    <Badge variant="outline" className="text-red-600 dark:text-red-400 border-red-200">
                      +{item.discovered}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-200">
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
                    <div className="bg-gray-200 dark:bg-muted rounded-full h-4">
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

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24h</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Average Scan Time</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 dark:text-green-400">98.5%</div>
              <div className="text-sm text-green-700 dark:text-green-300">Uptime</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">156</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Total Scans</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

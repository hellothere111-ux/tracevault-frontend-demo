import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, AlertTriangle, Shield, CheckCircle } from 'lucide-react'
import type { AssetTreeNode } from '../types/asset.types'

interface EnhancedStatsCardsProps {
  node: AssetTreeNode | null
}

export function EnhancedStatsCards({ node }: EnhancedStatsCardsProps) {
  if (!node) return null

  const data = node.data
  
  // Calculate vulnerability breakdown (mock data for now)
  const criticalVulns = Math.floor((data?.vulnerabilities_count || 0) * 0.15)
  const highVulns = Math.floor((data?.vulnerabilities_count || 0) * 0.35)
  const mediumVulns = Math.floor((data?.vulnerabilities_count || 0) * 0.3)
  // Low vulnerabilities calculated but not displayed in current stats
  const lowVulns = (data?.vulnerabilities_count || 0) - criticalVulns - highVulns - mediumVulns
  
  // Calculate health score based on risk and vulnerabilities
  const healthScore = Math.max(0, Math.min(100, 100 - (data?.risk_score || 0) * 10 - criticalVulns * 5))
  
  const stats = [
    {
      title: 'Critical',
      value: criticalVulns,
      icon: AlertCircle,
      color: 'border-red-500 bg-red-50',
      textColor: 'text-red-600',
      iconColor: 'text-red-500'
    },
    {
      title: 'High',
      value: highVulns,
      icon: AlertTriangle,
      color: 'border-orange-500 bg-orange-50',
      textColor: 'text-orange-600',
      iconColor: 'text-orange-500'
    },
    {
      title: 'Risk Score',
      value: (data?.risk_score || 0).toFixed(1),
      icon: Shield,
      color: 'border-blue-500 bg-blue-50',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Health',
      value: `${healthScore.toFixed(0)}%`,
      icon: CheckCircle,
      color: 'border-green-500 bg-green-50',
      textColor: 'text-green-600',
      iconColor: 'text-green-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className={`border-l-4 ${stat.color}`}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  <span className="text-sm font-medium">{stat.title}</span>
                </div>
                {stat.title === 'Health' && (
                  <Badge 
                    variant={healthScore >= 80 ? 'default' : healthScore >= 60 ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {healthScore >= 80 ? 'Good' : healthScore >= 60 ? 'Fair' : 'Poor'}
                  </Badge>
                )}
              </div>
              <p className={`text-2xl font-bold mt-2 ${stat.textColor}`}>
                {stat.value}
              </p>
              {stat.title === 'Critical' && criticalVulns > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Requires immediate attention
                </p>
              )}
              {stat.title === 'High' && highVulns > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Plan remediation soon
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

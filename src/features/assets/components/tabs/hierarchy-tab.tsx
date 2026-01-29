import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowDown, Users, Link2, GitBranch } from 'lucide-react'
import type { AssetTreeNode } from '../../types/asset.types'
import { AssetType } from '../../types/asset.types'

interface HierarchyTabProps {
  node: AssetTreeNode | null
}

export function HierarchyTab({ node }: HierarchyTabProps) {
  if (!node) return null

  // Mock child assets based on node type
  const getMockChildren = () => {
    switch (node.type) {
      case AssetType.TENANT:
        return [
          { type: 'project', name: 'Mobile App', status: 'active', vulns: 12, risk: 6.5 },
          { type: 'project', name: 'Enterprise Portal', status: 'active', vulns: 33, risk: 7.9 }
        ]
      case AssetType.PROJECT:
        return [
          { type: 'sub_project', name: 'Backend API', status: 'active', vulns: 5, risk: 5.2 },
          { type: 'sub_project', name: 'Frontend App', status: 'active', vulns: 7, risk: 7.8 }
        ]
      case AssetType.SUB_PROJECT:
        return [
          { type: 'environment', name: 'Dev Server', status: 'active', vulns: 2, risk: 3.1 },
          { type: 'environment', name: 'Production', status: 'active', vulns: 3, risk: 7.1 }
        ]
      default:
        return []
    }
  }

  const children = getMockChildren()

  return (
    <div className="space-y-6">
      {/* Current Asset Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Current Asset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{node.name}</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {node.type}
                </Badge>
                <Badge className={node.data?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {node.data?.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>Vulnerabilities: {node.data?.vulnerabilities_count || 0}</span>
                <span>Risk Score: {(node.data?.risk_score || 0).toFixed(1)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Child Assets */}
      {children.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowDown className="h-5 w-5" />
              Child Assets ({children.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {children.map((child, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${
                    child.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{child.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {child.type}
                      </Badge>
                      <Badge className={child.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {child.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>Vulnerabilities: {child.vulns}</span>
                      <span>Risk Score: {child.risk.toFixed(1)}</span>
                    </div>
                  </div>
                  <Link2 className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{children.length}</div>
              <div className="text-sm text-red-700 dark:text-red-300">Direct Dependencies</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {children.reduce((sum, child) => sum + child.vulns, 0)}
              </div>
              <div className="text-sm text-orange-700 dark:text-orange-300">Total Child Vulnerabilities</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {children.length > 0 ? (children.reduce((sum, child) => sum + child.risk, 0) / children.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Average Child Risk Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

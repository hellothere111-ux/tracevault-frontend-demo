import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EnhancedAssetHeader } from './enhanced-asset-header'
import { OverviewTab } from './tabs/overview-tab'
import { DetailsTab } from './tabs/details-tab'
import { HierarchyTab } from './tabs/hierarchy-tab'
import type { AssetTreeNode } from '../types/asset.types'

interface EnhancedAssetDetailPanelProps {
  node: AssetTreeNode | null
}

export function EnhancedAssetDetailPanel({ 
  node 
}: EnhancedAssetDetailPanelProps) {
  return (
    <div className="space-y-4">
      {/* Enhanced Header */}
      <EnhancedAssetHeader 
        node={node} 
      />

      {/* Tab Navigation */}
      {node && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="details">📋 Details</TabsTrigger>
            <TabsTrigger value="hierarchy">🔗 Hierarchy</TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="overview" className="mt-4">
            <OverviewTab node={node} />
          </TabsContent>

          <TabsContent value="details" className="mt-4">
            <DetailsTab node={node} />
          </TabsContent>

          <TabsContent value="hierarchy" className="mt-4">
            <HierarchyTab node={node} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

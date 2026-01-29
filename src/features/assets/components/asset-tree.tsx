import { ChevronRight, ChevronDown, Plus, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { AssetTreeNode } from '../types/asset.types'
import { AssetType } from '../types/asset.types'

interface AssetTreeProps {
  nodes: AssetTreeNode[]
  expandedNodes: Set<string>
  selectedNode: AssetTreeNode | null
  onToggleNode: (nodeId: string) => void
  onSelectNode: (node: AssetTreeNode) => void
  onCreateChild: (parentNode: AssetTreeNode) => void
  onEdit: (node: AssetTreeNode) => void
  onDelete: (node: AssetTreeNode) => void
}

export function AssetTree({
  nodes,
  expandedNodes,
  selectedNode,
  onToggleNode,
  onSelectNode,
  onCreateChild,
  onEdit,
  onDelete,
}: AssetTreeProps) {
  const getTypeIcon = (type: AssetType) => {
    switch (type) {
      case AssetType.TENANT:
        return '🏢'
      case AssetType.PROJECT:
        return '📦'
      case AssetType.SUB_PROJECT:
        return '📁'
      case AssetType.ENVIRONMENT:
        return '🌍'
      default:
        return '📄'
    }
  }

  const getTypeColor = (type: AssetType) => {
    switch (type) {
      case AssetType.TENANT:
        return 'text-blue-600 dark:text-blue-400'
      case AssetType.PROJECT:
        return 'text-purple-600 dark:text-purple-400'
      case AssetType.SUB_PROJECT:
        return 'text-green-600 dark:text-green-400'
      case AssetType.ENVIRONMENT:
        return 'text-orange-600 dark:text-orange-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const renderNode = (node: AssetTreeNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)
    const isSelected = selectedNode?.id === node.id

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer group transition-colors ${
            isSelected
              ? 'bg-accent border-l-2 border-primary'
              : 'hover:bg-muted dark:hover:bg-muted/50'
          }`}
          style={{ marginLeft: `${depth * 16}px` }}
          onClick={() => onSelectNode(node)}
        >
          {/* Expand/Collapse Button */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleNode(node.id)
              }}
              className='p-0.5 hover:bg-muted dark:hover:bg-muted/50 rounded'
            >
              {isExpanded ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
            </button>
          ) : (
            <div className='w-5' />
          )}

          {/* Icon and Name */}
          <span className='text-lg'>{getTypeIcon(node.type)}</span>
          <span className={`flex-1 font-medium text-foreground ${getTypeColor(node.type)}`}>
            {node.name}
          </span>

          {/* Vulnerability Count Badge */}
          {node.data?.vulnerabilities_count > 0 && (
            <span className='text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded-full font-semibold'>
              {node.data.vulnerabilities_count}
            </span>
          )}

          {/* Risk Score */}
          {node.data?.risk_score > 0 && (
            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold ${
                node.data.risk_score >= 8
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : node.data.risk_score >= 5
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}
            >
              Risk: {node.data.risk_score}
            </span>
          )}

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='opacity-0 group-hover:opacity-100'
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {node.type !== AssetType.ENVIRONMENT && (
                <DropdownMenuItem onClick={() => onCreateChild(node)}>
                  <Plus className='h-4 w-4 mr-2' />
                  Add{' '}
                  {node.type === AssetType.TENANT
                    ? 'Project'
                    : node.type === AssetType.PROJECT
                      ? 'Sub-project'
                      : 'Environment'}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onEdit(node)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(node)}
                className='text-red-600 dark:text-red-400'
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Render Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='space-y-1'>
      {nodes.map((node) => renderNode(node))}
    </div>
  )
}
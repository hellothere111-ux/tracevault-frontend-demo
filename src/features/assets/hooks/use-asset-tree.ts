import { useState, useCallback } from 'react'
import type {
  Tenant,
  AssetTreeNode,
} from '../types/asset.types'
import { AssetType as AssetTypeEnum } from '../types/asset.types'

export function useAssetTree(tenants: Tenant[]) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [selectedNode, setSelectedNode] = useState<AssetTreeNode | null>(null)

  // Build tree from flat tenants data
  const buildTree = useCallback((): AssetTreeNode[] => {
    return tenants.map((tenant) => ({
      id: tenant.id,
      name: tenant.name,
      type: AssetTypeEnum.TENANT,
      level: 0,
      expanded: expandedNodes.has(tenant.id),
      selected: selectedNode?.id === tenant.id,
      children: tenant.projects.map((project) => ({
        id: project.id,
        name: project.name,
        type: AssetTypeEnum.PROJECT,
        level: 1,
        parent_id: tenant.id,
        expanded: expandedNodes.has(project.id),
        selected: selectedNode?.id === project.id,
        children: project.sub_projects.map((subProject) => ({
          id: subProject.id,
          name: subProject.name,
          type: AssetTypeEnum.SUB_PROJECT,
          level: 2,
          parent_id: project.id,
          expanded: expandedNodes.has(subProject.id),
          selected: selectedNode?.id === subProject.id,
          children: subProject.environments.map((env) => ({
            id: env.id,
            name: env.name,
            type: AssetTypeEnum.ENVIRONMENT,
            level: 3,
            parent_id: subProject.id,
            expanded: false,
            selected: selectedNode?.id === env.id,
            children: [],
            data: env,
          })) as AssetTreeNode[],
          data: subProject,
        })) as AssetTreeNode[],
        data: project,
      })) as AssetTreeNode[],
      data: tenant,
    })) as AssetTreeNode[]
  }, [tenants, expandedNodes, selectedNode])

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }, [])

  const selectNode = useCallback((node: AssetTreeNode) => {
    setSelectedNode(node)
  }, [])

  const expandAll = useCallback(() => {
    const allNodeIds = new Set<string>()
    const collect = (nodes: AssetTreeNode[]) => {
      nodes.forEach((node) => {
        allNodeIds.add(node.id)
        if (node.children && node.children.length > 0) {
          collect(node.children)
        }
      })
    }
    collect(buildTree())
    setExpandedNodes(allNodeIds)
  }, [buildTree])

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set())
  }, [])

  return {
    tree: buildTree(),
    expandedNodes,
    selectedNode,
    toggleNode,
    selectNode,
    expandAll,
    collapseAll,
  }
}
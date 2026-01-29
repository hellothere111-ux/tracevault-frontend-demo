import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

interface SourceTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  counts: {
    all: number
    snyk_sca: number
    snyk_sast: number
    snyk_dast: number
    manual_vapt: number
    asset_scan: number
  }
}

export function SourceTabs({
  activeTab,
  onTabChange,
  counts,
}: SourceTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className='w-full'>
      <TabsList className='grid w-full grid-cols-6 lg:w-auto'>
        <TabsTrigger value='all' className='flex items-center gap-2 text-sm'>
          All
          <Badge variant='secondary'>{counts.all}</Badge>
        </TabsTrigger>
        <TabsTrigger value='snyk_sca' className='flex items-center gap-2 text-sm'>
          SCA
          <Badge variant='secondary'>{counts.snyk_sca}</Badge>
        </TabsTrigger>
        <TabsTrigger value='snyk_sast' className='flex items-center gap-2 text-sm'>
          SAST
          <Badge variant='secondary'>{counts.snyk_sast}</Badge>
        </TabsTrigger>
        <TabsTrigger value='snyk_dast' className='flex items-center gap-2 text-sm'>
          DAST
          <Badge variant='secondary'>{counts.snyk_dast}</Badge>
        </TabsTrigger>
        <TabsTrigger value='manual_vapt' className='flex items-center gap-2 text-sm'>
          VAPT
          <Badge variant='secondary'>{counts.manual_vapt}</Badge>
        </TabsTrigger>
        <TabsTrigger value='asset_scan' className='flex items-center gap-2 text-sm'>
          Assets
          <Badge variant='secondary'>{counts.asset_scan}</Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
import { createFileRoute } from '@tanstack/react-router'
import { OffensiveTeam } from '@/features/offensive-team'

export const Route = createFileRoute('/_authenticated/offensive-team/')({
  component: OffensiveTeamPage,
})

function OffensiveTeamPage() {
  return <OffensiveTeam />
}

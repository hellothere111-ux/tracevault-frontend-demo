import { createFileRoute } from '@tanstack/react-router'
import { OmniFlow } from '@/features/omniflow'

export const Route = createFileRoute('/_authenticated/omniflow/')({
  component: OmniFlow,
})

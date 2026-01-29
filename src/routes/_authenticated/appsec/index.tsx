import { createFileRoute } from '@tanstack/react-router'
import { AppSec } from '@/features/appsec'

export const Route = createFileRoute('/_authenticated/appsec/')({
  component: AppSecPage,
})

function AppSecPage() {
  return <AppSec />
}

import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/features/auth/auth-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const Disabled = () => (
  <AuthLayout>
    <Card className='gap-4 border-slate-700 bg-slate-800'>
      <CardHeader>
        <CardTitle className='text-lg tracking-tight'>Sign up is disabled</CardTitle>
        <CardDescription>
          New user creation is restricted. Please ask an administrator to
          create an account for you.
        </CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter>
        <p className='px-8 text-center text-sm text-muted-foreground'>
          If you believe you need access, contact your administrator.
        </p>
      </CardFooter>
    </Card>
  </AuthLayout>
)

export const Route = createFileRoute('/clerk/(auth)/sign-up')({
  component: Disabled,
})

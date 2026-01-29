import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import authService from '@/services/auth.service'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/password-input'

const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLFormElement> {
  token?: string
}

export function ResetPasswordForm({
  className,
  token: tokenProp,
  ...props
}: ResetPasswordFormProps) {
  const navigate = useNavigate()
  const search = useSearch({ from: '/reset-password' }) as any
  const token = tokenProp || search.token
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!token) {
      setError('Invalid or missing reset token')
      return
    }

    setIsLoading(true)

    try {
      await authService.resetPassword(token, data.password)
      setSubmitted(true)
      toast.success('Password reset successfully!')

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate({ to: '/sign-in-2', replace: true })
      }, 2000)
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password')
      setError(err.message || 'Failed to reset password')
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-8'>
        <div className='text-lg font-semibold text-red-500'>Invalid Reset Link</div>
        <p className='text-center text-sm text-slate-300'>
          The password reset link is invalid or expired.
          <br />
          Please request a new one.
        </p>
        <Button
          onClick={() => navigate({ to: '/forgot-password' })}
          className='mt-4'
        >
          Request New Link
        </Button>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-8'>
        <CheckCircle2 className='h-16 w-16 text-green-500' />
        <h3 className='text-lg font-semibold text-white'>Password reset successfully!</h3>
        <p className='text-center text-sm text-slate-300'>
          Your password has been changed. Redirecting to login...
        </p>
      </div>
    )
  }

  return (
    <>
      {error && (
        <div className='rounded-lg bg-red-500/10 border border-red-500/20 p-3 mb-4'>
          <p className='text-sm text-red-500'>{error}</p>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('grid gap-3', className)}
          {...props}
        >
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='Enter new password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='Confirm new password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-2' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className='animate-spin' />
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}

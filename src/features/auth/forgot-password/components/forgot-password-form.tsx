import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
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
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Please enter your email' : undefined),
  }),
})

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await authService.forgotPassword(data.email)
      setSubmitted(true)
      toast.success('Password reset email sent! Check your inbox for the link.')
      
      // Show success message for 3 seconds, then redirect to login
      setTimeout(() => {
        navigate({ to: '/sign-in-2', replace: true })
      }, 3000)
    } catch (error: any) {
      toast.error(error.message || 'Failed to send password reset email')
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-8'>
        <CheckCircle2 className='h-16 w-16 text-green-500' />
        <h3 className='text-lg font-semibold text-white'>Email sent!</h3>
        <p className='text-center text-sm text-slate-300'>
          Check your email for a password reset link.
          <br />
          The link will expire in 24 hours.
        </p>
        <Button
          variant='outline'
          onClick={() => navigate({ to: '/sign-in-2' })}
          className='mt-4'
        >
          Back to login
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-2', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className='animate-spin' />
              Sending...
            </>
          ) : (
            <>
              Continue
              <ArrowRight />
            </>
          )}
        </Button>

        <Link
          to='/sign-in-2'
          className='text-sm text-slate-400 hover:text-slate-300 text-center mt-2'
        >
          Back to sign in
        </Link>
      </form>
    </Form>
  )
}

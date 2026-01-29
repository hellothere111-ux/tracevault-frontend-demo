import { Logo } from '@/assets/logo'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='dark container grid h-svh max-w-none items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <Logo className='me-2' />
          <h1 className='text-xl font-medium text-white'>TraceVault</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

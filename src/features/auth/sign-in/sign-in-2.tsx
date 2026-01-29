import { Logo } from '@/assets/logo'
import { cn } from '@/lib/utils'
import traceVaultLogo from './assets/TraceVault.png'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn2() {
  return (
    <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 dark bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <div className='lg:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <Logo className='me-2' />
            <h1 className='text-xl font-medium text-white'>TraceVault</h1>
          </div>
        </div>
        <div className='mx-auto flex w-full max-w-sm flex-col justify-center space-y-2'>
          <div className='flex flex-col space-y-2 text-start'>
            <h2 className='text-lg font-semibold tracking-tight text-white'>Sign in</h2>
            <p className='text-sm text-slate-300'>
              Enter your email and password below <br />
              to log into your account
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>

      <div
        className={cn(
          'relative h-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 max-lg:hidden flex items-center justify-center'
        )}
      >
        <img
          src={traceVaultLogo}
          width={1347}
          height={1361}
          alt='TraceVault'
          className='h-80 w-80 object-contain drop-shadow-2xl'
        />
      </div>
    </div>
  )
}

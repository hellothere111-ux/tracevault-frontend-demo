import { Logo } from '@/assets/logo'
import { cn } from '@/lib/utils'
import traceVaultLogo from './assets/TraceVault.png'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn2() {
  return (
    <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 bg-background dark:bg-background'>
      <div className='relative lg:p-8 bg-card dark:bg-card border-r border-border dark:border-border'>
        <div className='relative mx-auto flex w-full flex-col justify-center space-y-6 py-8 sm:w-[480px] sm:p-8'>
          <div className='mb-6 flex items-center justify-center'>
            <Logo className='me-3 h-10 w-10' />
            <h1 className='text-2xl font-bold text-foreground dark:text-foreground tracking-tight'>TraceVault</h1>
          </div>
          
          <div className='mx-auto flex w-full max-w-sm flex-col justify-center space-y-6'>
            <div className='flex flex-col space-y-3 text-center'>
              <h2 className='text-2xl font-bold tracking-tight text-foreground dark:text-foreground'>
                Welcome Back
              </h2>
              <p className='text-base text-muted-foreground dark:text-muted-foreground leading-relaxed'>
                Enter your credentials to access your security dashboard
              </p>
            </div>
            <UserAuthForm className="backdrop-blur-sm" />
          </div>
        </div>
      </div>

      <div className='relative h-full overflow-hidden bg-background dark:bg-background max-lg:hidden flex items-center justify-center border-l border-border dark:border-border'>
        <div className='relative z-10 flex flex-col items-center justify-center space-y-6 px-12'>
          <img
            src={traceVaultLogo}
            width={1347}
            height={1361}
            alt='TraceVault'
            className='h-64 w-64 object-contain drop-shadow-2xl filter brightness-110 dark:brightness-100'
          />
          <div className='text-center space-y-3'>
            <h3 className='text-3xl font-bold text-foreground dark:text-foreground tracking-tight'>
              Enterprise Security Platform
            </h3>
            <p className='text-lg text-muted-foreground dark:text-muted-foreground max-w-md leading-relaxed'>
              Comprehensive vulnerability management and security analytics for modern organizations
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

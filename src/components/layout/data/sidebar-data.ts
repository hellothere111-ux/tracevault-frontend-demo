import {
  LayoutDashboard,
  Bug,
  ListTodo,
  HelpCircle,
  Package,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Users,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  GitBranch,
  Target,
  Sword,
  Lock,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'TraceVault',
      logo: '/TraceVault.png',
      plan: 'Security Management',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'OmniFlow',
          url: '/omniflow',
          icon: GitBranch,
        },
        {
          title: 'Vulnerabilities',
          url: '/vulnerabilities',
          icon: Bug,
        },
        {
          title: 'Assets',
          url: '/assets',
          icon: Package,
        },
        {
          title: 'Remediation Center',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: Package,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
        {
          title: 'AppSec',
          url: '/appsec',
          icon: Lock,
        },
        {
          title: 'Offensive Team',
          url: '/offensive-team',
          icon: Sword,
        },
        {
          title: 'Phishing & Training',
          url: '/phishing-training',
          icon: Target,
        },
        {
          title: 'Secured by Clerk',
          icon: Command,
          items: [
            {
              title: 'Sign In',
              url: '/clerk/sign-in',
            },
            {
              title: 'User Management',
              url: '/clerk/user-management',
            },
          ],
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: ShieldCheck,
          items: [
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}

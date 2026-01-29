import {
  IconGithub,
  IconGitlab,
} from '@/assets/brand-icons'
import { IconAzureDevops } from '@/assets/brand-icons/icon-azure-devops'

export const apps = [
  {
    name: 'GitHub',
    logo: <IconGithub />,
    connected: false,
    desc: 'Source code repository and CI/CD integration for DevOps workflows.',
  },
  {
    name: 'GitLab',
    logo: <IconGitlab />,
    connected: false,
    desc: 'GitLab CI/CD pipelines and repository management integration.',
  },
  {
    name: 'Azure DevOps',
    logo: <IconAzureDevops />,
    connected: false,
    desc: 'Azure DevOps for project management and CI/CD pipelines.',
  },
]

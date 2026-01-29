import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { PhishingOverview } from './components/phishing-overview'
import { PhishingTab } from './components/phishing-tab'
import { TrainingTab } from './components/training-tab'
import { BarChart3, Target, BookOpen } from 'lucide-react'

// Mock data for phishing campaigns
const campaigns = [
  {
    id: 1,
    name: 'Q4 2023 Phishing Simulation',
    status: 'completed',
    sent: 450,
    opened: 324,
    clicked: 89,
    reported: 67,
    date: 'Dec 15, 2023',
    risk: 'high'
  },
  {
    id: 2,
    name: 'Spear Phishing Awareness',
    status: 'completed',
    sent: 180,
    opened: 156,
    clicked: 23,
    reported: 45,
    date: 'Jan 10, 2024',
    risk: 'critical'
  },
  {
    id: 3,
    name: 'Executive Phishing Test',
    status: 'active',
    sent: 75,
    opened: 62,
    clicked: 8,
    reported: 12,
    date: 'Feb 5, 2024',
    risk: 'high'
  },
  {
    id: 4,
    name: 'Basic Phishing Simulation',
    status: 'scheduled',
    sent: 0,
    opened: 0,
    clicked: 0,
    reported: 0,
    date: 'Mar 15, 2024',
    risk: 'medium'
  },
  {
    id: 5,
    name: 'Advanced Social Engineering',
    status: 'scheduled',
    sent: 0,
    opened: 0,
    clicked: 0,
    reported: 0,
    date: 'Apr 20, 2024',
    risk: 'high'
  },
  {
    id: 6,
    name: 'Q2 2024 Phishing Campaign',
    status: 'planned',
    sent: 0,
    opened: 0,
    clicked: 0,
    reported: 0,
    date: 'Jun 1, 2024',
    risk: 'medium'
  }
]

// Mock data for user performance
const userPerformance = [
  {
    rank: 1,
    name: 'John Smith',
    riskLevel: 'critical',
    phishingClicks: 12,
    reportedPhishing: 2,
    trainingScore: 35,
    completed: 2
  },
  {
    rank: 2,
    name: 'Sarah Johnson',
    riskLevel: 'high',
    phishingClicks: 8,
    reportedPhishing: 3,
    trainingScore: 42,
    completed: 3
  },
  {
    rank: 3,
    name: 'Mike Davis',
    riskLevel: 'high',
    phishingClicks: 7,
    reportedPhishing: 1,
    trainingScore: 48,
    completed: 4
  },
  {
    rank: 4,
    name: 'Emily Wilson',
    riskLevel: 'medium',
    phishingClicks: 5,
    reportedPhishing: 4,
    trainingScore: 65,
    completed: 6
  },
  {
    rank: 5,
    name: 'Robert Brown',
    riskLevel: 'medium',
    phishingClicks: 4,
    reportedPhishing: 2,
    trainingScore: 58,
    completed: 5
  }
]

// Mock data for training modules
const trainingModules = [
  {
    id: 1,
    title: 'Email Security Fundamentals',
    status: 'completed',
    enrolled: 245,
    completed: 208,
    duration: '45 min',
    difficulty: 'Beginner',
    date: 'Nov 15-30, 2023',
    type: 'mandatory'
  },
  {
    id: 2,
    title: 'Advanced Phishing Detection',
    status: 'completed',
    enrolled: 156,
    completed: 112,
    duration: '60 min',
    difficulty: 'Advanced',
    date: 'Dec 5-18, 2023',
    type: 'recommended'
  },
  {
    id: 3,
    title: 'Social Engineering Awareness',
    status: 'active',
    enrolled: 312,
    completed: 284,
    duration: '30 min',
    difficulty: 'Intermediate',
    date: 'Jan 10-25, 2024',
    type: 'mandatory'
  },
  {
    id: 4,
    title: 'Password Management Best Practices',
    status: 'scheduled',
    enrolled: 428,
    completed: 291,
    duration: '25 min',
    difficulty: 'Beginner',
    date: 'Feb 1-15, 2024',
    type: 'recommended'
  },
  {
    id: 5,
    title: 'Data Protection and Privacy',
    status: 'scheduled',
    enrolled: 189,
    completed: 149,
    duration: '40 min',
    difficulty: 'Intermediate',
    date: 'Mar 5-20, 2024',
    type: 'mandatory'
  },
  {
    id: 6,
    title: 'Incident Response Procedures',
    status: 'planned',
    enrolled: 98,
    completed: 86,
    duration: '55 min',
    difficulty: 'Advanced',
    date: 'Apr 10-30, 2024',
    type: 'optional'
  }
]

// Helper functions
const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'critical':
      return 'bg-red-500'
    case 'high':
      return 'bg-orange-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'low':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'active':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'scheduled':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'planned':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export function PhishingTraining() {
  const [selectedTab, setSelectedTab] = useState('overview')

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header>
        <TopNav links={[]} />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className="flex flex-col">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 space-y-6 overflow-auto p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight dark:text-gray-100">
                Phishing & Training
              </h1>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="phishing" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Phishing
                </TabsTrigger>
                <TabsTrigger value="training" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Training
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <PhishingOverview 
                  userPerformance={userPerformance}
                  getRiskLevelColor={getRiskLevelColor}
                />
              </TabsContent>

              {/* Phishing Tab */}
              <TabsContent value="phishing">
                <PhishingTab 
                  campaigns={campaigns}
                  getStatusColor={getStatusColor}
                  getRiskColor={getRiskColor}
                />
              </TabsContent>

              {/* Training Tab */}
              <TabsContent value="training">
                <TrainingTab trainingModules={trainingModules} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Main>
    </div>
  )
}

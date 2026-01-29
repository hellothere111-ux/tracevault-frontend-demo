import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Users, Target, Shield, BookOpen, Calendar, Edit, Download, Eye, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Campaign {
  id: number
  name: string
  status: string
  sent: number
  opened: number
  clicked: number
  reported: number
  date: string
  risk: string
}

interface UserPerformance {
  rank: number
  name: string
  riskLevel: string
  phishingClicks: number
  reportedPhishing: number
  trainingScore: number
  completed: number
}

interface TrainingModule {
  id: number
  title: string
  duration: string
  difficulty: string
  progress: number
  enrolled: number
  completed: number
}

interface PhishingOverviewProps {
  userPerformance: UserPerformance[]
  getRiskLevelColor: (level: string) => string
}

export function PhishingOverview({ userPerformance, getRiskLevelColor }: PhishingOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Overall Risk Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Risk Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Overall Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="mb-4">
                <span className="px-4 py-2 rounded-full text-lg font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  MODERATE
                </span>
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
                Tenant Name
              </div>
              <div className="text-5xl font-bold dark:text-gray-100 mb-2">50</div>
              <div className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                SAMM out of 100
              </div>
              <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                <Target className="h-4 w-4 rotate-180" />
                <span className="font-medium">-25</span>
                <span className="text-sm">all time</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Highest Risk Departments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Highest Risk Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium dark:text-gray-100 border-b pb-2">
                <div>Department</div>
                <div>Risk Score</div>
                <div>Employees</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="dark:text-gray-100">Engineering</div>
                <div className="text-red-600 dark:text-red-400 font-medium">75 High</div>
                <div className="dark:text-gray-100">45</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="dark:text-gray-100">Sales</div>
                <div className="text-orange-600 dark:text-orange-400 font-medium">65 Medium</div>
                <div className="dark:text-gray-100">32</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="dark:text-gray-100">Marketing</div>
                <div className="text-yellow-600 dark:text-yellow-400 font-medium">55 Medium</div>
                <div className="dark:text-gray-100">28</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Highest Risk Per Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Highest Risk Per Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium dark:text-gray-100 border-b pb-2">
                <div>Location</div>
                <div>Risk Score</div>
                <div>Employees</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="dark:text-gray-100">New York</div>
                <div className="text-red-600 dark:text-red-400 font-medium">82 High</div>
                <div className="dark:text-gray-100">120</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="dark:text-gray-100">London</div>
                <div className="text-orange-600 dark:text-orange-400 font-medium">68 Medium</div>
                <div className="dark:text-gray-100">85</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="dark:text-gray-100">Tokyo</div>
                <div className="text-yellow-600 dark:text-yellow-400 font-medium">45 Low</div>
                <div className="dark:text-gray-100">67</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Highest Risk Employees */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Top 5 Highest Risk Employees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userPerformance.map((user) => (
              <div key={user.rank} className="border-l-4 border-l-red-500 pl-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      user.riskLevel === 'critical' ? 'bg-red-500' : 
                      user.riskLevel === 'high' ? 'bg-orange-500' : 
                      user.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-gray-100">{user.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(user.riskLevel)}`}>
                          {user.riskLevel.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground dark:text-gray-400">
                          {user.completed} modules completed
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">{user.phishingClicks}</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Phishing clicks</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {user.reportedPhishing} reported
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      Training: {user.trainingScore}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

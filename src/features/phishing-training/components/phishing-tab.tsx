import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, AlertTriangle, Shield, BookOpen, Eye, Check, Clock, Play } from 'lucide-react'
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

interface PhishingTabProps {
  campaigns: Campaign[]
  getStatusColor: (status: string) => string
  getRiskColor: (risk: string) => string
}

export function PhishingTab({ campaigns, getStatusColor, getRiskColor }: PhishingTabProps) {
  return (
    <div className="space-y-6">
      {/* Phishing Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Simulations Run */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Simulations Run
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold dark:text-gray-100">24</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Number</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,250</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Messages Sent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Failure Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Failure Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 dark:text-red-400">18.5%</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Percentage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">231</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Failed Simulations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remediation Training */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Remediation Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">72.8%</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Percentage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">168</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Completed Trainings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reported via PAB */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Reported via PAB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">45.2%</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Percentage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">565</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Messages Reported</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phishing Campaigns Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Phishing Campaigns Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Timeline */}
            <div className="relative">
              {/* Main Timeline Line */}
              <div className="absolute left-0 right-0 top-6 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              {/* Timeline Items */}
              <div className="relative flex justify-between">
                {/* Dec 2023 - Completed */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Q4 2023</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Dec 10-22</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Completed</div>
                  </div>
                </div>
                
                {/* Jan 2024 - Completed */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Spear Phishing</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Jan 8-15</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Completed</div>
                  </div>
                </div>
                
                {/* Feb 2024 - Active */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Executive Test</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Feb 1-10</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">In Progress</div>
                  </div>
                </div>
                
                {/* Mar 2024 - Scheduled */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Basic Simulation</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Mar 12-20</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Scheduled</div>
                  </div>
                </div>
                
                {/* Apr 2024 - Scheduled */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Social Eng.</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Apr 15-25</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Scheduled</div>
                  </div>
                </div>
                
                {/* Jun 2024 - Scheduled */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Q2 2024</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Jun 1-15</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Scheduled</div>
                  </div>
                </div>
                
                {/* Mar 2025 - Scheduled */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Q1 2025</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Mar 10-25</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Scheduled</div>
                  </div>
                </div>
              </div>
              
              {/* Year Labels - Fixed positioning */}
              <div className="relative mt-16">
                <div className="absolute left-0 -mt-8 text-xs font-medium text-muted-foreground dark:text-gray-400">2023</div>
                <div className="absolute left-1/2 -translate-x-1/2 -mt-8 text-xs font-medium text-muted-foreground dark:text-gray-400">2024</div>
                <div className="absolute right-0 -mt-8 text-xs font-medium text-muted-foreground dark:text-gray-400">2025</div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-8 pt-4 border-t dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs text-muted-foreground dark:text-gray-400">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Play className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs text-muted-foreground dark:text-gray-400">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                  <Clock className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs text-muted-foreground dark:text-gray-400">Scheduled</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Phishing Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            All Phishing Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium dark:text-gray-100">{campaign.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <span className="text-xs text-muted-foreground dark:text-gray-400">
                        {campaign.date}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${getRiskColor(campaign.risk)}`}></div>
                      <span className="text-xs text-muted-foreground dark:text-gray-400">
                        {campaign.risk} risk
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold dark:text-gray-100">{campaign.sent}</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Sent</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold dark:text-gray-100">{campaign.opened}</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Opened</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">{campaign.clicked}</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Clicked</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">{campaign.reported}</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Reported</div>
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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Eye, Check, Clock, Play, Target, Shield, Calendar, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TrainingModule {
  id: number
  title: string
  status: string
  enrolled: number
  completed: number
  duration: string
  difficulty: string
  date: string
  type: string
}

interface TrainingTabProps {
  trainingModules: TrainingModule[]
}

export function TrainingTab({ trainingModules }: TrainingTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'scheduled':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
      case 'planned':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mandatory':
        return 'bg-red-500'
      case 'recommended':
        return 'bg-blue-500'
      case 'optional':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Training Statistics - Same format as Phishing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Training Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Training Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold dark:text-gray-100">4</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Campaigns</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">260</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">864</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Total Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">13</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Past Due</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">30.1%</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">436</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Not Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Programs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Scheduled Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">8</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Number</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">329</div>
                <div className="text-sm text-muted-foreground dark:text-gray-400">Completed Programs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Campaigns Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Training Campaigns Timeline
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
                {/* Nov 2023 - Completed */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Email Security</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Nov 15-30</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Completed</div>
                  </div>
                </div>
                
                {/* Dec 2023 - Completed */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Password Mgmt</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Dec 5-18</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Completed</div>
                  </div>
                </div>
                
                {/* Jan 2024 - Active */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Social Eng.</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Jan 10-25</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">In Progress</div>
                  </div>
                </div>
                
                {/* Feb 2024 - Scheduled */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Data Protection</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Feb 1-15</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Scheduled</div>
                  </div>
                </div>
                
                {/* Mar 2024 - Scheduled */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Q2 Training</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Mar 5-20</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Scheduled</div>
                  </div>
                </div>
                
                {/* Apr 2024 - Scheduled */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Advanced Security</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Apr 10-30</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Scheduled</div>
                  </div>
                </div>
                
                {/* May 2025 - Scheduled */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-4 text-center min-w-[80px]">
                    <div className="text-xs font-medium dark:text-gray-100">Future Training</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">May 15-31</div>
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

      {/* All Training Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            All Training Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingModules.map((module) => (
              <div key={module.id} className="border rounded-lg p-4 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium dark:text-gray-100">{module.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                        {module.status}
                      </span>
                      <span className="text-xs text-muted-foreground dark:text-gray-400">
                        {module.date}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${getTypeColor(module.type)}`}></div>
                      <span className="text-xs text-muted-foreground dark:text-gray-400">
                        {module.type} training
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
                    <div className="text-lg font-bold dark:text-gray-100">{module.enrolled}</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Enrolled</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">{module.completed}</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Completed</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{module.duration}</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Duration</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{module.difficulty}</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Difficulty</div>
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

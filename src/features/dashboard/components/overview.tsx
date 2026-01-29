import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
  {
    name: 'Jan',
    vulnerabilities: 142,
  },
  {
    name: 'Feb',
    vulnerabilities: 138,
  },
  {
    name: 'Mar',
    vulnerabilities: 155,
  },
  {
    name: 'Apr',
    vulnerabilities: 128,
  },
  {
    name: 'May',
    vulnerabilities: 115,
  },
  {
    name: 'Jun',
    vulnerabilities: 98,
  },
  {
    name: 'Jul',
    vulnerabilities: 87,
  },
  {
    name: 'Aug',
    vulnerabilities: 92,
  },
  {
    name: 'Sep',
    vulnerabilities: 78,
  },
  {
    name: 'Oct',
    vulnerabilities: 65,
  },
  {
    name: 'Nov',
    vulnerabilities: 52,
  },
  {
    name: 'Dec',
    vulnerabilities: 45,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          direction='ltr'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Line
          type='monotone'
          dataKey='vulnerabilities'
          stroke='currentColor'
          strokeWidth={2}
          className='stroke-primary'
          dot={{ fill: 'currentColor' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

import { motion } from 'framer-motion'
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Users } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts'

const geographyData = [
  { name: 'France', churned: 810, retained: 4204 },
  { name: 'Germany', churned: 814, retained: 1695 },
  { name: 'Spain', churned: 413, retained: 2064 }
]

const ageGroupData = [
  { name: '18-25', churnRate: 12 },
  { name: '26-35', churnRate: 18 },
  { name: '36-45', churnRate: 24 },
  { name: '46-55', churnRate: 32 },
  { name: '56-65', churnRate: 38 },
  { name: '65+', churnRate: 45 }
]

const productData = [
  { name: '1 Product', value: 45, color: '#8b5cf6' },
  { name: '2 Products', value: 35, color: '#3b82f6' },
  { name: '3 Products', value: 15, color: '#10b981' },
  { name: '4 Products', value: 5, color: '#f59e0b' }
]

const segmentData = [
  { month: 'Jan', highRisk: 120, medRisk: 340, lowRisk: 890 },
  { month: 'Feb', highRisk: 145, medRisk: 320, lowRisk: 920 },
  { month: 'Mar', highRisk: 110, medRisk: 360, lowRisk: 880 },
  { month: 'Apr', highRisk: 180, medRisk: 300, lowRisk: 950 },
  { month: 'May', highRisk: 155, medRisk: 280, lowRisk: 970 },
  { month: 'Jun', highRisk: 130, medRisk: 310, lowRisk: 990 }
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-muted-foreground">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function AnalyticsCharts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Analytics Overview</h2>
          <p className="text-sm text-muted-foreground">Comprehensive churn analysis across segments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geography Chart */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">Churn by Geography</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geographyData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'rgb(156, 163, 175)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgb(156, 163, 175)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="churned" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Churned" />
                <Bar dataKey="retained" fill="#10b981" radius={[4, 4, 0, 0]} name="Retained" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Age Group Chart */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">Churn by Age Group</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'rgb(156, 163, 175)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgb(156, 163, 175)', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="churnRate" fill="url(#ageGradient)" radius={[4, 4, 0, 0]} name="Churn Rate" />
                <defs>
                  <linearGradient id="ageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Product Distribution */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
              <PieChartIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">Product Distribution</span>
          </div>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  paddingAngle={4}
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                  formatter={(value) => <span className="text-muted-foreground">{value}</span>}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Customer Segmentation */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">Customer Segmentation</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgb(156, 163, 175)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgb(156, 163, 175)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="lowRisk" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Low Risk" />
                <Area type="monotone" dataKey="medRisk" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Medium Risk" />
                <Area type="monotone" dataKey="highRisk" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.6} name="High Risk" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

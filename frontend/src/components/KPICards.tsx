import { motion } from 'framer-motion'
import { TrendingUp, Target, Users, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const kpis = [
  {
    title: 'Model Accuracy',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: Target,
    color: 'from-violet-500 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.3)'
  },
  {
    title: 'ROC-AUC Score',
    value: '0.967',
    change: '+0.012',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.3)'
  },
  {
    title: 'Predictions Served',
    value: '1.2M',
    change: '+15.3%',
    trend: 'up',
    icon: BarChart3,
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.3)'
  },
  {
    title: 'Active Customers',
    value: '48.5K',
    change: '-2.4%',
    trend: 'down',
    icon: Users,
    color: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.3)'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function KPICards() {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {kpis.map((kpi) => (
        <motion.div
          key={kpi.title}
          variants={item}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="glass-card rounded-2xl p-5 cursor-pointer group"
          style={{ boxShadow: `0 0 30px ${kpi.glowColor}` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${kpi.color} opacity-90 group-hover:opacity-100 transition-opacity`}>
              <kpi.icon className="w-5 h-5 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${
              kpi.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {kpi.trend === 'up' ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {kpi.change}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {kpi.value}
            </h3>
            <p className="text-sm text-muted-foreground">
              {kpi.title}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

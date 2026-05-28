import { motion } from 'framer-motion'
import { Sparkles, Gift, Phone, Mail, Target, CheckCircle2 } from 'lucide-react'
import type { PredictionResult } from '../App'

interface RecommendationPanelProps {
  prediction: PredictionResult | null
}

const recommendations = {
  high: [
    {
      icon: Phone,
      title: 'Immediate Outreach',
      description: 'Schedule a personal call within 24 hours to address concerns',
      priority: 'critical'
    },
    {
      icon: Gift,
      title: 'Retention Offer',
      description: 'Provide exclusive 20% discount on premium services',
      priority: 'high'
    },
    {
      icon: Target,
      title: 'Personalized Plan',
      description: 'Create custom engagement plan based on usage patterns',
      priority: 'high'
    }
  ],
  medium: [
    {
      icon: Mail,
      title: 'Email Campaign',
      description: 'Enroll in targeted re-engagement email sequence',
      priority: 'medium'
    },
    {
      icon: Gift,
      title: 'Loyalty Rewards',
      description: 'Offer bonus points or rewards for continued engagement',
      priority: 'medium'
    },
    {
      icon: Target,
      title: 'Feature Education',
      description: 'Highlight underutilized product features',
      priority: 'medium'
    }
  ],
  low: [
    {
      icon: Mail,
      title: 'Regular Updates',
      description: 'Continue standard communication cadence',
      priority: 'low'
    },
    {
      icon: CheckCircle2,
      title: 'Monitor Status',
      description: 'Track engagement metrics monthly',
      priority: 'low'
    },
    {
      icon: Target,
      title: 'Upsell Opportunity',
      description: 'Consider premium service recommendations',
      priority: 'low'
    }
  ]
}

const priorityColors = {
  critical: 'from-rose-500 to-red-600',
  high: 'from-amber-500 to-orange-500',
  medium: 'from-blue-500 to-cyan-500',
  low: 'from-emerald-500 to-teal-500'
}

const priorityBg = {
  critical: 'bg-rose-500/10 border-rose-500/20',
  high: 'bg-amber-500/10 border-amber-500/20',
  medium: 'bg-blue-500/10 border-blue-500/20',
  low: 'bg-emerald-500/10 border-emerald-500/20'
}

export function RecommendationPanel({ prediction }: RecommendationPanelProps) {
  const currentRecommendations = prediction 
    ? recommendations[prediction.riskLevel] 
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
          <p className="text-sm text-muted-foreground">Personalized retention strategies</p>
        </div>
      </div>

      {currentRecommendations ? (
        <div className="space-y-4">
          {currentRecommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-4 rounded-xl border ${priorityBg[rec.priority as keyof typeof priorityBg]}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${priorityColors[rec.priority as keyof typeof priorityColors]}`}>
                  <rec.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-foreground">{rec.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      rec.priority === 'critical' ? 'bg-rose-500/20 text-rose-400' :
                      rec.priority === 'high' ? 'bg-amber-500/20 text-amber-400' :
                      rec.priority === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Action Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-foreground">Action Summary</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {prediction?.riskLevel === 'high' 
                ? 'High-priority retention actions required. Focus on personal outreach and immediate value delivery.'
                : prediction?.riskLevel === 'medium'
                ? 'Proactive engagement recommended. Implement targeted campaigns to strengthen relationship.'
                : 'Standard relationship management sufficient. Consider upselling opportunities.'}
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Run a prediction to receive AI recommendations
          </p>
        </div>
      )}
    </motion.div>
  )
}

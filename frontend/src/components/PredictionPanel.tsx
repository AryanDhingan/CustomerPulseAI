import { motion, AnimatePresence } from 'framer-motion'
import { Brain, AlertTriangle, CheckCircle2, XCircle, Sparkles, Loader2 } from 'lucide-react'
import type { PredictionResult } from '../App'
import { cn } from '../lib/utils'

interface PredictionPanelProps {
  prediction: PredictionResult | null
  isAnalyzing: boolean
}

export function PredictionPanel({ prediction, isAnalyzing }: PredictionPanelProps) {
  const getRiskColor = (level: PredictionResult['riskLevel']) => {
    switch (level) {
      case 'low': return { bg: 'from-emerald-500 to-teal-500', text: 'text-emerald-400', glow: 'rgba(16, 185, 129, 0.3)' }
      case 'medium': return { bg: 'from-amber-500 to-orange-500', text: 'text-amber-400', glow: 'rgba(245, 158, 11, 0.3)' }
      case 'high': return { bg: 'from-rose-500 to-red-500', text: 'text-rose-400', glow: 'rgba(244, 63, 94, 0.3)' }
    }
  }

  const getRiskIcon = (level: PredictionResult['riskLevel']) => {
    switch (level) {
      case 'low': return CheckCircle2
      case 'medium': return AlertTriangle
      case 'high': return XCircle
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-2xl p-6 glow-blue"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Prediction</h2>
          <p className="text-sm text-muted-foreground">Real-time churn probability analysis</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary mb-4"
            />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Running AI analysis...</span>
            </div>
          </motion.div>
        ) : prediction ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Main Gauge */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-secondary"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className={cn(
                      prediction.riskLevel === 'low' && 'text-emerald-500',
                      prediction.riskLevel === 'medium' && 'text-amber-500',
                      prediction.riskLevel === 'high' && 'text-rose-500'
                    )}
                    stroke="currentColor"
                    strokeDasharray={`${prediction.churnProbability * 251.2} 251.2`}
                    initial={{ strokeDasharray: '0 251.2' }}
                    animate={{ strokeDasharray: `${prediction.churnProbability * 251.2} 251.2` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="text-4xl font-bold text-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {Math.round(prediction.churnProbability * 100)}%
                  </motion.span>
                  <span className="text-sm text-muted-foreground">Churn Risk</span>
                </div>
              </div>
            </div>

            {/* Risk Level Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
              {(() => {
                const colors = getRiskColor(prediction.riskLevel)
                const Icon = getRiskIcon(prediction.riskLevel)
                return (
                  <div 
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-full',
                      `bg-gradient-to-r ${colors.bg}`
                    )}
                    style={{ boxShadow: `0 0 20px ${colors.glow}` }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white capitalize">
                      {prediction.riskLevel} Risk
                    </span>
                  </div>
                )
              })()}
            </motion.div>

            {/* Confidence */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-4 rounded-xl bg-secondary/30"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Model Confidence</span>
                <span className="text-sm font-medium text-foreground">
                  {Math.round(prediction.confidence * 100)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.confidence * 100}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </motion.div>

            {/* Quick Insights */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-foreground">AI Insight</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {prediction.riskLevel === 'high' 
                  ? 'This customer shows significant churn indicators. Immediate retention action recommended.'
                  : prediction.riskLevel === 'medium'
                  ? 'Moderate risk detected. Consider proactive engagement strategies.'
                  : 'Customer appears stable. Continue standard relationship management.'}
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Prediction Yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Fill in the customer details and click &quot;Run Churn Analysis&quot; to get AI-powered predictions.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

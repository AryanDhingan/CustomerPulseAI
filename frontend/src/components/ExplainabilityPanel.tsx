import { motion } from 'framer-motion'
import { Lightbulb, TrendingDown, AlertCircle, Info } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import type { PredictionResult } from '../App'

interface ExplainabilityPanelProps {
  prediction: PredictionResult | null
}

const featureImportance = [
  { feature: 'Activity Status', importance: 0.28, direction: 'negative' },
  { feature: 'Age', importance: 0.22, direction: 'negative' },
  { feature: 'Account Balance', importance: 0.18, direction: 'positive' },
  { feature: 'Credit Score', importance: 0.15, direction: 'positive' },
  { feature: 'Number of Products', importance: 0.09, direction: 'negative' },
  { feature: 'Tenure', importance: 0.08, direction: 'positive' }
]

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { feature: string; importance: number; direction: string } }> }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="glass-card rounded-lg p-3">
        <p className="text-sm font-medium text-foreground mb-1">{data.feature}</p>
        <p className="text-xs text-muted-foreground">
          Impact: {(data.importance * 100).toFixed(0)}%
        </p>
        <p className="text-xs text-muted-foreground">
          Direction: {data.direction === 'negative' ? 'Increases Churn' : 'Decreases Churn'}
        </p>
      </div>
    )
  }
  return null
}

export function ExplainabilityPanel({ prediction }: ExplainabilityPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">SHAP Explainability</h2>
          <p className="text-sm text-muted-foreground">Understanding model predictions</p>
        </div>
      </div>

      {prediction ? (
        <div className="space-y-6">
          {/* Feature Importance Chart */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Feature Importance</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportance} layout="vertical">
                  <XAxis type="number" tick={{ fill: 'rgb(156, 163, 175)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 0.3]} />
                  <YAxis type="category" dataKey="feature" tick={{ fill: 'rgb(156, 163, 175)', fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                    {featureImportance.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.direction === 'negative' ? '#f43f5e' : '#10b981'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Churn Drivers */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Top Churn Drivers</span>
            </div>
            <div className="space-y-3">
              {featureImportance.slice(0, 3).map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.direction === 'negative' ? 'bg-rose-500' : 'bg-emerald-500'
                    }`} />
                    <span className="text-sm text-foreground">{item.feature}</span>
                  </div>
                  <span className={`text-xs font-medium ${
                    item.direction === 'negative' ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {item.direction === 'negative' ? '↑ Increases' : '↓ Decreases'} Risk
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Insight Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-violet-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Explainable AI Insight</p>
                <p className="text-xs text-muted-foreground">
                  SHAP values indicate that customer activity status and age are the primary drivers 
                  of churn prediction. Inactive older customers with low account balances show 
                  significantly higher churn probabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Run a prediction to see explainability insights
          </p>
        </div>
      )}
    </motion.div>
  )
}

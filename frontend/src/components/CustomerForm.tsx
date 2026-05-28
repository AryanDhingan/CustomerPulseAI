import { motion } from 'framer-motion'
import { User, MapPin, CreditCard, Briefcase, Loader2 } from 'lucide-react'
import type { CustomerData } from '../App'
import { cn } from '../lib/utils'

interface CustomerFormProps {
  customerData: CustomerData
  setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>
  onAnalyze: () => void
  isAnalyzing: boolean
}

export function CustomerForm({ customerData, setCustomerData, onAnalyze, isAnalyzing }: CustomerFormProps) {
  const updateField = <K extends keyof CustomerData>(field: K, value: CustomerData[K]) => {
    setCustomerData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-2xl p-6 glow-purple"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Customer Risk Analysis</h2>
          <p className="text-sm text-muted-foreground">Enter customer details for churn prediction</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Personal Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Age</label>
              <input
                type="number"
                value={customerData.age}
                onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Gender</label>
              <select
                value={customerData.gender}
                onChange={(e) => updateField('gender', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Geography</span>
          </div>
          <select
            value={customerData.geography}
            onChange={(e) => updateField('geography', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
          >
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Spain">Spain</option>
          </select>
        </div>

        {/* Financial Information */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Financial Details</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Credit Score</label>
              <input
                type="number"
                value={customerData.creditScore}
                onChange={(e) => updateField('creditScore', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Account Balance</label>
              <input
                type="number"
                value={customerData.balance}
                onChange={(e) => updateField('balance', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-muted-foreground mb-2">Estimated Salary</label>
              <input
                type="number"
                value={customerData.estimatedSalary}
                onChange={(e) => updateField('estimatedSalary', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Account Details</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Tenure (years)</label>
              <input
                type="number"
                value={customerData.tenure}
                onChange={(e) => updateField('tenure', parseInt(e.target.value) || 0)}
                min={0}
                max={10}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Number of Products</label>
              <select
                value={customerData.numOfProducts}
                onChange={(e) => updateField('numOfProducts', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={customerData.hasCrCard}
                onChange={(e) => updateField('hasCrCard', e.target.checked)}
                className="sr-only peer"
              />
              <div className={cn(
                "w-11 h-6 rounded-full transition-colors",
                customerData.hasCrCard ? "bg-violet-500" : "bg-secondary"
              )} />
              <div className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md",
                customerData.hasCrCard && "translate-x-5"
              )} />
            </div>
            <span className="text-sm text-muted-foreground">Credit Card Holder</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={customerData.isActiveMember}
                onChange={(e) => updateField('isActiveMember', e.target.checked)}
                className="sr-only peer"
              />
              <div className={cn(
                "w-11 h-6 rounded-full transition-colors",
                customerData.isActiveMember ? "bg-violet-500" : "bg-secondary"
              )} />
              <div className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md",
                customerData.isActiveMember && "translate-x-5"
              )} />
            </div>
            <span className="text-sm text-muted-foreground">Active Member</span>
          </label>
        </div>

        {/* Analyze Button */}
        <motion.button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Run Churn Analysis'
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

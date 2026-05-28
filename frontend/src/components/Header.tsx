import { motion } from 'framer-motion'
import { Activity, Zap, Signal } from 'lucide-react'

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center glow-purple">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  CustomerPulse <span className="text-gradient">AI</span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI-Powered Customer Churn Intelligence Platform
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Customers
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Analytics
              </a>
            </nav>
            
            <div className="flex items-center gap-2">
              <motion.div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Signal className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">API Online</span>
              </motion.div>
              
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Zap className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

import { useState } from 'react'
import { Header } from './components/Header'
import { KPICards } from './components/KPICards'
import { CustomerForm } from './components/CustomerForm'
import { PredictionPanel } from './components/PredictionPanel'
import { AnalyticsCharts } from './components/AnalyticsCharts'
import { ExplainabilityPanel } from './components/ExplainabilityPanel'
import { RecommendationPanel } from './components/RecommendationPanel'
import axios from 'axios'

export interface CustomerData {
  creditScore: number
  age: number
  geography: string
  gender: string
  balance: number
  estimatedSalary: number
  tenure: number
  numOfProducts: number
  hasCrCard: boolean
  isActiveMember: boolean
}

export interface PredictionResult {
  prediction: string
  churnProbability: number
  riskLevel: 'low' | 'medium' | 'high'
  confidence: number
  recommendedActions: string[]
}

const defaultCustomerData: CustomerData = {
  creditScore: 650,
  age: 35,
  geography: 'France',
  gender: 'Male',
  balance: 50000,
  estimatedSalary: 75000,
  tenure: 5,
  numOfProducts: 2,
  hasCrCard: true,
  isActiveMember: true,
}

function App() {
  const [customerData, setCustomerData] = useState<CustomerData>(defaultCustomerData)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {

    try {

      setIsAnalyzing(true)

      const payload = {

        CreditScore: customerData.creditScore,
        Geography: customerData.geography,
        Gender: customerData.gender,
        Age: customerData.age,
        Tenure: customerData.tenure,
        Balance: customerData.balance,
        NumOfProducts: customerData.numOfProducts,
        HasCrCard: customerData.hasCrCard ? 1 : 0,
        IsActiveMember: customerData.isActiveMember ? 1 : 0,
        EstimatedSalary: customerData.estimatedSalary

      }

      const response = await axios.post(

        "http://127.0.0.1:8000/predict",

        payload

      )

      const data = response.data

      setPrediction({

        prediction: data.prediction,

        churnProbability: data.churn_probability,

        riskLevel: data.risk_level.toLowerCase(),

        confidence: 0.94,

        recommendedActions: data.recommended_actions

      })

    }

    catch (error) {

      console.error(error)

    }

    finally {

      setIsAnalyzing(false)

    }

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <KPICards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Form */}
          <CustomerForm
            customerData={customerData}
            setCustomerData={setCustomerData}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />

          {/* Prediction Panel */}
          <PredictionPanel
            prediction={prediction}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Analytics Section */}
        <AnalyticsCharts />

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Explainability */}
          <ExplainabilityPanel prediction={prediction} />

          {/* Recommendations */}
          <RecommendationPanel prediction={prediction} />
        </div>
      </main>
    </div>
  )
}

export default App

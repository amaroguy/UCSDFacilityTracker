import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CategoryScale, Chart, LinearScale, BarElement, PointElement, LineElement } from 'chart.js'

const queryClient = new QueryClient()
Chart.register(CategoryScale)
Chart.register(LinearScale)
Chart.register(BarElement)
Chart.register(PointElement)
Chart.register(LineElement)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)

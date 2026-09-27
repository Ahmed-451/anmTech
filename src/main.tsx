import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MotionProvider } from './lib/motion/MotionProvider'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </React.StrictMode>
)
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import NamesProvider from './NamesProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <NamesProvider>
      <App/>
    </NamesProvider>
  // </StrictMode>
)

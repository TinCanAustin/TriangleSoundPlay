import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AppV2 from './appV2.jsx'

import SpinningMigu from './spinningMigu.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpinningMigu />
    <BrowserRouter>
      <Routes>
        <Route index element={<AppV2/>}/>
        <Route path='/v2' element={<App/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <App /> // без стрикта потому что тогда компонент дёргается дважды на дев сервере а ничем полезным с чем может помочь дев мод и стрикт мы не занимаемся
)

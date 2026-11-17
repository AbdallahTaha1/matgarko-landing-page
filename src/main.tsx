import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Fixed weights, not the variable font: every engine draws them, including old in-app browsers.
import '@fontsource/noto-kufi-arabic/400.css'
import '@fontsource/noto-kufi-arabic/700.css'
import '@fontsource/noto-kufi-arabic/800.css'
import './index.css'
import App from './App.tsx'


const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (root.hasChildNodes() && !root.dataset.errorPage) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}

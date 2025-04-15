import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextWrapper } from './contexts/AuthContext.jsx'
import { BookContextWrapper } from './contexts/BookContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
    <AuthContextWrapper>
    <BookContextWrapper>
    <App />
    </BookContextWrapper>
    </AuthContextWrapper>
     </BrowserRouter>
    
  </StrictMode>,
)

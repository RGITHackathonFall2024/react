'use client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChatPage from './pages/ChatPage'
import ProfilePage from './pages/ProfilePage'
import LogoutPage from './pages/LogoutPage'

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
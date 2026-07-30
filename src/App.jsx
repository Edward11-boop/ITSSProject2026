import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword'
import Register from './pages/Register';
import Home from './pages/Home';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard'
import ChangePassword from './pages/ChangePassword'

function App() {
  return (
    <BrowserRouter>
      <Topbar />

      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
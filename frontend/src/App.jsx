import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Gallery from './pages/Gallery'
import Contacts from './pages/Contacts'

export default function App() {
  return (
    <div>
      <header className="site-header">
        <h1>Премиальное ателье — Рязань</h1>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/services">Прайс-лист</Link>
          <Link to="/booking">Запись</Link>
          <Link to="/gallery">Галерея</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
    </div>
  )
}

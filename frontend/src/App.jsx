import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Gallery from './pages/Gallery'
import Contacts from './pages/Contacts'

export default function App() {
  return (
    <div className="site-root">
      <header className="site-header" role="banner">
        <div className="container">
          <h1>Премиальное ателье — Рязань</h1>
          <nav aria-label="Главное меню">
            <Link to="/">Главная</Link>
            <Link to="/services">Прайс-лист</Link>
            <Link to="/booking">Запись</Link>
            <Link to="/gallery">Галерея</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
        </div>
      </header>

      <main role="main" className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>

      <footer role="contentinfo" className="site-footer">
        <div className="container">
          <p>© Премиальное ателье — Рязань. Тел: <a href="tel:+79001234567">+7 (900) 123-45-67</a></p>
        </div>
      </footer>
    </div>
  )
}

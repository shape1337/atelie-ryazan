import React, { useEffect } from 'react'

export default function Contacts(){
  useEffect(()=>{
    // Пример инициализации Яндекс.Карт — замените на ваш API-ключ при необходимости
    const load = () => {
      if (window.ymaps) {
        window.ymaps.ready(init)
      } else {
        const s = document.createElement('script')
        s.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
        s.onload = () => window.ymaps.ready(init)
        document.head.appendChild(s)
      }
    }

    function init(){
      try{
        const map = new window.ymaps.Map('yamap', {
          center: [54.6198, 39.7366], // пример — Рязань
          zoom: 14
        })
        const placemark = new window.ymaps.Placemark([54.6198, 39.7366], {
          balloonContent: 'Премиальное ателье — Рязань'
        })
        map.geoObjects.add(placemark)
      } catch(e){ console.warn(e) }
    }

    load()
  },[])

  return (
    <section aria-labelledby="contacts-title">
      <h2 id="contacts-title">Контакты</h2>
      <address>
        <p>Адрес: г. Рязань, ул. Примерная, 1</p>
        <p>Телефон: <a href="tel:+79001234567">+7 (900) 123-45-67</a></p>
        <p>Email: <a href="mailto:info@atelie-ryazan.ru">info@atelie-ryazan.ru</a></p>
      </address>
      <p>
        <a href="https://wa.me/79001234567" target="_blank" rel="noreferrer noopener">WhatsApp</a> ·
        <a href="https://t.me/yourtelegram" target="_blank" rel="noreferrer noopener">Telegram</a> ·
        <a href="https://www.instagram.com/your_insta" target="_blank" rel="noreferrer noopener">Instagram</a>
      </p>
      <h3>Режим работы</h3>
      <p>Пн–Пт: 10:00–19:00 · Сб: 10:00–16:00 · Вс: выходной</p>
      <p>Для срочных заказов возможен индивидуальный график по договорённости.</p>
      <div id="yamap" style={{width: '100%', height: 400}} aria-hidden="false"></div>
    </section>
  )
}

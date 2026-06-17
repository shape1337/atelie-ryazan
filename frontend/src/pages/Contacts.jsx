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
    <section>
      <h2>Контакты</h2>
      <p>Адрес: г. Рязань, ул. Примерная, 1</p>
      <p>Телефон: <a href="tel:+79001234567">+7 (900) 123-45-67</a></p>
      <p>
        <a href="https://wa.me/79001234567" target="_blank" rel="noreferrer">WhatsApp</a> ·
        <a href="https://t.me/yourtelegram" target="_blank" rel="noreferrer">Telegram</a>
      </p>
      <div id="yamap" style={{width: '100%', height: 400}}></div>
    </section>
  )
}

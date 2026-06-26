import React, { useEffect, useState } from 'react'

export default function Services(){
  const [services, setServices] = useState([])
  const [error, setError] = useState(null)
  useEffect(()=>{
    fetch('/api/services').then(r=>{
      if (!r.ok) throw new Error('Network response was not ok: ' + r.status)
      return r.json()
    }).then(setServices).catch((err)=>{
      console.error('Failed to fetch /api/services', err)
      setError(err.message || 'Ошибка загрузки прайс-листа')
      // Резервный список услуг, если API недоступен
      setServices([
        { id:1, name: 'Пошив платья на заказ', price: 12000, duration_minutes: 480, description: 'Индивидуальный пошив вечерних и коктейльных платьев. Подбор ткани и примерки.' },
        { id:2, name: 'Ремонт и реставрация костюма', price: 3500, duration_minutes: 120, description: 'Починка подкладки, устранение дефектов, замена молний и пуговиц.' },
        { id:3, name: 'Укоротить и подогнать по фигуре', price: 900, duration_minutes: 45, description: 'Изменение длины, подшивка и подгон по талии.' }
      ])
    })
  },[])

  return (
    <section aria-labelledby="services-title">
      <h2 id="services-title">Прайс-лист</h2>
      <ul>
        {error && <p style={{color:'crimson'}}>Ошибка загрузки прайс-листа: {error}</p>}
        {services.map(s=> (
          <li key={s.id} className="service-item">
            <strong>{s.name}</strong>
            <div className="service-meta">{s.price} руб · {s.duration_minutes} мин</div>
            <p className="service-desc">{s.description}</p>
            <button onClick={() => { window.location.href = '/booking' }} aria-label={`Записаться на услугу ${s.name}`}>Записаться</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

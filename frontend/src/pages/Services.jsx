import React, { useEffect, useState } from 'react'

export default function Services(){
  const [services, setServices] = useState([])
  useEffect(()=>{
    fetch('/api/services').then(r=>r.json()).then(setServices).catch(()=>{
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

import React, { useEffect, useState } from 'react'

export default function Services(){
  const [services, setServices] = useState([])
  useEffect(()=>{
    fetch('/api/services').then(r=>r.json()).then(setServices).catch(()=>{})
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
          </li>
        ))}
      </ul>
    </section>
  )
}

import React, { useEffect, useState } from 'react'

export default function Services(){
  const [services, setServices] = useState([])
  useEffect(()=>{
    fetch('/api/services').then(r=>r.json()).then(setServices).catch(()=>{})
  },[])

  return (
    <section>
      <h2>Прайс-лист</h2>
      <ul>
        {services.map(s=> (
          <li key={s.id}>{s.name} — {s.price} руб. ({s.duration_minutes} мин)</li>
        ))}
      </ul>
    </section>
  )
}

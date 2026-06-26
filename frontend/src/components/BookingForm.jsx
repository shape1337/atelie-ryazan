import React, { useEffect, useState } from 'react'

export default function BookingForm(){
  const [services, setServices] = useState([])
  const [form, setForm] = useState({ name: '', phone: '', email: '', service_id: '', date_time: '', comment: '' })
  const [status, setStatus] = useState(null)

  useEffect(()=>{
    fetch('/api/services').then(r=>{
      if (!r.ok) throw new Error('Network response was not ok: ' + r.status)
      return r.json()
    }).then(setServices).catch((err)=>{
      console.error('Failed to fetch /api/services for booking form', err)
      // оставляем services пустым, форма покажет сообщение
      setServices([])
    })
  },[])

  async function submit(e){
    e.preventDefault()
    setStatus('sending')
    try{
      // Простая нормализация телефона: оставить только цифры и добавить +7 если нужно
      const normalizedPhone = form.phone.replace(/[^0-9]/g, '');
      const payload = { ...form, phone: (normalizedPhone.length === 10 ? '7' + normalizedPhone : normalizedPhone) }

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      let data
      try{ data = await res.json() } catch(e){ data = null }
      if (res.ok && data && data.success) setStatus('ok')
      else {
        console.error('Appointment submission failed', res.status, data)
        setStatus('error')
      }
    } catch(e){ setStatus('error') }
  }

  return (
    <form onSubmit={submit} className="booking-form" aria-label="Форма записи на примерку">
      <label>Имя<input placeholder="Иван Иванов" aria-label="Имя" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required /></label>
      <label>Телефон<input placeholder="+7 (900) 123-45-67" aria-label="Телефон" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} required /></label>
      <label>Email (опц.)<input type="email" placeholder="you@example.com" aria-label="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} /></label>
      <label>Услуга
        <select aria-label="Услуга" value={form.service_id} onChange={e=>setForm({...form, service_id: e.target.value})} required>
          <option value="">-- выберите --</option>
          {services.map(s=> <option key={s.id} value={s.id}>{s.name} ({s.price} руб)</option>)}
        </select>
      </label>
      <label>Дата и время
        <input aria-label="Дата и время" type="datetime-local" value={form.date_time} onChange={e=>setForm({...form, date_time: e.target.value})} required />
      </label>
      <label>Комментарий<textarea aria-label="Комментарий" value={form.comment} onChange={e=>setForm({...form, comment: e.target.value})} /></label>
      <button className="btn-primary" type="submit">Записаться</button>
      {status === 'sending' && <p>Отправка...</p>}
      {status === 'ok' && <p>Спасибо! Ваша заявка принята.</p>}
      {status === 'error' && <p style={{color:'crimson'}}>Ошибка при отправке. Проверьте соединение или попробуйте позже.</p>}
      {services.length === 0 && <p style={{color:'crimson'}}>Список услуг недоступен — обновите страницу или свяжитесь по телефону.</p>}
    </form>
  )
}

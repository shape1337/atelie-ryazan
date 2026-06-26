import React from 'react'

export default function Gallery(){
  const items = [
    { src: '/images/dress.jpg', alt: 'Пошив платья', caption: 'Пошив платья' },
    { src: '/images/suit.jpg', alt: 'Ремонт костюма', caption: 'Ремонт костюма' },
    { src: '/images/alteration.jpg', alt: 'Изменение длины', caption: 'Изменение длины' }
  ]

  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title">Галерея работ</h2>
      <p>Ниже — примеры наших работ. Каждое изделие шилось или корректировалось
        с учётом индивидуальных пожеланий клиента.</p>
      <div className="gallery-grid" role="list">
        {items.map((it, idx) => (
          <figure key={idx} role="listitem">
            <img src={it.src} alt={it.alt} loading="lazy" style={{display: 'block'}} width={400} height={300} />
            <figcaption>
              <strong>{it.caption}</strong>
              <div className="caption-desc">Краткое описание работы и использованные материалы.</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

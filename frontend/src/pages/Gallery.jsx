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
      <div className="gallery-grid" role="list">
        {items.map((it, idx) => (
          <figure key={idx} role="listitem">
            <img src={it.src} alt={it.alt} />
            <figcaption>{it.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

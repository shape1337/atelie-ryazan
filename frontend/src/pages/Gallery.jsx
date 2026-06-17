import React from 'react'

export default function Gallery(){
  return (
    <article aria-labelledby="gallery-title">
      <h2 id="gallery-title">Галерея работ</h2>
      <p>Здесь будут фотографии до/после. (Добавьте реальные изображения с alt-текстом для SEO)</p>
      <div className="gallery-grid">
        <figure>
          <img src="/images/sample1.jpg" alt="Пошив платья — пример" />
          <figcaption>Пошив платья — до/после</figcaption>
        </figure>
      </div>
    </article>
  )
}

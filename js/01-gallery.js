import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

// 1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// 2. Реализация делегирования на div.gallery и получение url большого изображения.
// 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// 4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// 5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
const galleryContainer = document.querySelector('.gallery');
let instance = '';

galleryContainer.addEventListener('click', showLightboxOnImgClick);

addGalleryMarkup(galleryItems, galleryContainer);

function addGalleryMarkup(incomingElements, markupContainer) {
  let galleryMarkup = '';

  incomingElements.forEach(({ original, preview, description }) => {
    galleryMarkup += `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
  });

  markupContainer.insertAdjacentHTML('afterbegin', galleryMarkup);
}

function showLightboxOnImgClick(event) {
  event.preventDefault();

  if (event.target === galleryContainer) {
    return;
  }

  instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800" height="600">`,
  );

  instance.show(
    galleryContainer.addEventListener('keydown', closeLightboxOnEskKey),
  );
}

function closeLightboxOnEskKey(event) {
  if (event.code === 'Escape') {
    instance.close(
      galleryContainer.removeEventListener('keydown', closeLightboxOnEskKey),
    );
  }
}

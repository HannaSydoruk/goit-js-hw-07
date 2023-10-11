import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryUl = document.querySelector('.gallery');

function createImageGallery(galleryItems) {

    const markup = galleryItems.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item" >
    <a class="gallery__link" href="large-image.jpg">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li >`
    }).join('');

    galleryUl.insertAdjacentHTML('beforeend', markup);
}

createImageGallery(galleryItems);

galleryUl.addEventListener('click', onGaleryClick);

function onGaleryClick(ev) {

    ev.preventDefault();

    if (!ev.target.classList.contains('gallery__image')) {
        return;
    }

    const originalUrl = ev.target.dataset.source;
    const instance = basicLightbox.create(
        `
        <div class="modal">
        <img src="${originalUrl}" width="900" height="700" />
        </div>
    `,
        {
            onShow: () => {
                window.addEventListener("keydown", keydownHandler);
            },
            onClose: () => {
                window.removeEventListener("keydown", keydownHandler);
            }
        }
    )

    instance.show();

    function keydownHandler(event) {
        if (event.key === 'Escape') {
            instance.close();
        }
    }

    // Данний код був потрібен для закривання модального вікна по кліку на картинці всередині модалки
    // елемент з селектором .modal з"являється тільки після відкриття модалки, тому його не можна було винести за межі функції
    // const modalElement = document.querySelector('.modal');
    // modalElement.addEventListener('click', () => { instance.close(); })
}

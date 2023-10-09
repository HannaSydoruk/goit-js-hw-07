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

const links = document.querySelectorAll('.gallery__link');

links.forEach(link => {
    link.addEventListener('click', (ev) => ev.preventDefault());
});

galleryUl.addEventListener('click', onGaleryClick);

function onGaleryClick(ev) {

    if (!ev.target.classList.contains('gallery__image')) {
        return;
    }
    const originalUrl = ev.target.dataset.source;
    const instance = basicLightbox.create(`
        <div class="modal">
        <img src="${originalUrl}" width="900" height="700" />
        </div>
    `)

    instance.show();

    document.querySelector('.modal').addEventListener('click', () => {
        instance.close();
    });

    document.addEventListener("keydown", event => {
        if (event.key === 'Escape') {
            instance.close();
        }
    });

}


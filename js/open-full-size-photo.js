import { addDocumentEscListener, isEscapeKey, removeDocumentEscListener } from './utils.js';
import { renderFullSizePhoto } from './draws-full-size-photo.js';
import { thumbnailsPhoto as allPhotos } from './draws-thumbnails.js';

const body = document.querySelector('body');
const drawingFullSizePhotoElement = document.querySelector('.big-picture');
const drawingFullSizePhotoOpenElement = document.querySelector('.pictures');
const drawingFullSizePhotoCloseElement = document.querySelector('.big-picture__cancel');

const handleDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeFullSizePhoto();
  }
};

const openFullSizePhoto = (evt) => {
  const fullSizePhotoElement = evt.target;
  const fullSizePhotoElementLink = fullSizePhotoElement.closest('.picture');

  if (fullSizePhotoElementLink) {
    body.classList.add('modal-open');
    evt.preventDefault();
    drawingFullSizePhotoElement.classList.remove('hidden');
    const thumbnailId = Number(fullSizePhotoElementLink.id);

    const selectedThumbnail = allPhotos.find((photo) => photo.id === thumbnailId);

    if (selectedThumbnail) {
      renderFullSizePhoto(selectedThumbnail.id, selectedThumbnail.url, selectedThumbnail.likes, selectedThumbnail.comments, selectedThumbnail.description);
    }
    addDocumentEscListener(handleDocumentEscKeydown);
  }
};

const closeFullSizePhoto = () => {
  body.classList.remove('modal-open');
  drawingFullSizePhotoElement.classList.add('hidden');

  removeDocumentEscListener(handleDocumentEscKeydown);
};

drawingFullSizePhotoOpenElement.addEventListener('click', openFullSizePhoto);
drawingFullSizePhotoCloseElement.addEventListener('click', closeFullSizePhoto);

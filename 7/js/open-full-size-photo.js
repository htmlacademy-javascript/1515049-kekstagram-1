import { isEscapeKey } from './utils.js';
import { renderFullSizePhoto } from './draws-full-size-photo.js';
import { thumbnailsPhoto as allPhotos } from './draws-thumbnails.js';

const drawingFullSizePhotoElement = document.querySelector('.big-picture');
const drawingFullSizePhotoOpenElement = document.querySelector('.pictures');
const drawingFullSizePhotoCloseElement = document.querySelector('.big-picture__cancel');

const onFullSizePhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeFullSizePhoto();
  }
};

const openFullSizePhoto = (evt) => {
  document.body.classList.add('modal-open');
  const fullSizePhotoElement = evt.target;
  const fullSizePhotoElementLink = fullSizePhotoElement.closest('.picture');

  if (fullSizePhotoElementLink) {
    evt.preventDefault();
    drawingFullSizePhotoElement.classList.remove('hidden');
    const thumbnailId = Number(fullSizePhotoElementLink.id);

    const selectedThumbnail = allPhotos.find((photo) => photo.id === thumbnailId);

    if (selectedThumbnail) {
      renderFullSizePhoto(selectedThumbnail.id, selectedThumbnail.url, selectedThumbnail.likes, selectedThumbnail.comments, selectedThumbnail.description);
    }
  }

  document.addEventListener('keydown', onFullSizePhotoEscKeydown);
};

const closeFullSizePhoto = () => {
  document.body.classList.remove('modal-open');
  drawingFullSizePhotoElement.classList.add('hidden');

  document.removeEventListener('keydown', onFullSizePhotoEscKeydown);
};

const openBigPhoto = () => drawingFullSizePhotoOpenElement.addEventListener('click', openFullSizePhoto);
const closeBigPhoto = () => drawingFullSizePhotoCloseElement.addEventListener('click', closeFullSizePhoto);

export { openBigPhoto, closeBigPhoto };

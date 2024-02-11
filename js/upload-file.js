import { isEscapeKey } from './utils.js';
import { onFullSizePhotoEscKeydown } from './open-full-size-photo.js';

const uploadFileModal = document.querySelector('.img-upload__overlay');
const controlUploadFile = document.querySelector('#upload-file');
const resetButton = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const isHashtagInputOnFocus = () => document.activeElement === hashtagInput;
const isCommentInputOnFocus = () => document.activeElement === commentInput;

const onUploadFileModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (!evt.defaultPrevented) {
      evt.preventDefault();
    }
    if (isHashtagInputOnFocus() || isCommentInputOnFocus()) {
      document.removeEventListener('keydown', onFullSizePhotoEscKeydown);
      evt.stopPropagation();
    } else {
      // eslint-disable-next-line no-use-before-define
      closeModal();
    }
  }
};
const openModal = () => {
  document.removeEventListener('keydown', onFullSizePhotoEscKeydown);
  document.body.classList.add('modal-open');
  uploadFileModal.classList.remove('hidden');

  document.addEventListener('keydown', onUploadFileModalEscKeydown);
};

const closeModal = () => {
  document.body.classList.remove('modal-open');
  uploadFileModal.classList.add('hidden');
  controlUploadFile.value = '';

  document.removeEventListener('keydown', onUploadFileModalEscKeydown);
};

controlUploadFile.addEventListener('change', openModal);
resetButton.addEventListener('click', closeModal);


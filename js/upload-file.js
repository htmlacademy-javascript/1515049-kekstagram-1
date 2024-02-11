import { isEscapeKey } from './utils.js';

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
      evt.stopPropagation();
    } else {
      // eslint-disable-next-line no-use-before-define
      closeModal();
    }
  }
};
const openModal = () => {
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

const openUploadFileModal = () => controlUploadFile.addEventListener('change', openModal);
const closeUploadFileModal = () => resetButton.addEventListener('click', closeModal);

export { openUploadFileModal, closeUploadFileModal };

// TODO поправить нажатие на esc при фокусе на инпутах. Сейчас теряется класс на body и появляется скрол

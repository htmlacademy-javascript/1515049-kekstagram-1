import { isEscapeKey, addDocumentEscListener, removeDocumentEscListener } from './utils.js';
import { formStateDefault } from './filters-user-photo.js';

const body = document.querySelector('body');
const uploadFileModal = document.querySelector('.img-upload__overlay');
const controlUploadFile = document.querySelector('#upload-file');
const resetButton = uploadFileModal.querySelector('.img-upload__cancel');
const hashtagInput = uploadFileModal.querySelector('.text__hashtags');
const commentInput = uploadFileModal.querySelector('.text__description');

let isInputOrTextareaFocused = false;

/**
 * Обработчик события нажатия клавиши Escape на документе
 * @param evt
 */
const handleDocumentEscKeydown = (evt) => {
  document.body.classList.add('modal-open');
  if (isEscapeKey(evt) && !isInputOrTextareaFocused) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeModal();
  }
};

/**
 * Открытие окна загрузки фото
 */
const openModal = () => {
  formStateDefault();
  body.classList.add('modal-open');
  uploadFileModal.classList.remove('hidden');

  addDocumentEscListener(handleDocumentEscKeydown);
};

/**
 * Закрытие окна загрузки фото
 */
const closeModal = () => {
  body.classList.remove('modal-open');
  uploadFileModal.classList.add('hidden');

  removeDocumentEscListener(handleDocumentEscKeydown);
};

const handleFocusInputOrTextarea = () => {
  isInputOrTextareaFocused = true;
};

const handleBlurInputOrTextarea = () => {
  isInputOrTextareaFocused = false;
};

controlUploadFile.addEventListener('change', openModal);
resetButton.addEventListener('click', closeModal);
hashtagInput.addEventListener('focus', handleFocusInputOrTextarea);
hashtagInput.addEventListener('blur', handleBlurInputOrTextarea);
commentInput.addEventListener('focus', handleFocusInputOrTextarea);
commentInput.addEventListener('blur', handleBlurInputOrTextarea);

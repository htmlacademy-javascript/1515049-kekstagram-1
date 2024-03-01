import { isEscapeKey, addDocumentEscListener, removeDocumentEscListener } from './utils.js';

const SCALE_STEP = 25;
const Scale = {
  MIN: 25,
  MAX: 100,
};

const body = document.querySelector('body');
const uploadFileModal = document.querySelector('.img-upload__overlay');
const controlUploadFile = document.querySelector('#upload-file');
const resetButton = uploadFileModal.querySelector('.img-upload__cancel');
const hashtagInput = uploadFileModal.querySelector('.text__hashtags');
const commentInput = uploadFileModal.querySelector('.text__description');
const effectsList = uploadFileModal.querySelector('.effects__list');
const effectPreviewNone = uploadFileModal.querySelector('.effects__preview--none');
const smallerButton = uploadFileModal.querySelector('.scale__control--smaller');
const biggerButton = uploadFileModal.querySelector('.scale__control--bigger');
const scaleValue = uploadFileModal.querySelector('.scale__control--value');
const imgPreview = uploadFileModal.querySelector('.img-upload__preview img');
const slider = uploadFileModal.querySelector('.img-upload__effect-level');

let scale = Scale.MAX;
let isInputOrTextareaFocused = false;

const isEffectPreviewNoneOnFocus = () => document.activeElement === effectPreviewNone;

const formStateDefault = () => {
  controlUploadFile.value = '';
  imgPreview.className = '';
  scale = Scale.MAX;
  scaleValue.value = scale;
  imgPreview.style = '';
  isEffectPreviewNoneOnFocus();
  if (isEffectPreviewNoneOnFocus) {
    slider.classList.add('hidden');
  }
};

/**
 * Изменение масштаба изображения в окне загрузки
 * @param value
 */
const changeScale = (value) => {
  scale += value;
  if (scale < Scale.MIN) {
    scale = Scale.MIN;
  }
  if (scale > Scale.MAX) {
    scale = Scale.MAX;
  }
  imgPreview.style.transform = `scale(${scale / 100})`;
  scaleValue.value = `${scale}%`;
};

/**
 * добавляет эффекты к фото по кликам на миниатюры
 * @param input
 */
const applyingEffectImage = (input) => {
  const effectClasses = Array.from(imgPreview.classList).filter((className) => className.startsWith('effects__preview--'));
  imgPreview.classList.remove(...effectClasses);
  imgPreview.classList.add(`effects__preview--${input.value}`);
};

/**
 * Добавление эффектов к фото
 * @param evt
 */
const handleApplyEffect = (evt) => {
  const input = evt.target.closest('input');
  const selectedRadioInput = uploadFileModal.querySelector('input[name="effect"]:checked');
  const selectedValue = selectedRadioInput.value;
  if (input) {
    if (selectedValue === 'none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
    applyingEffectImage(input);
  }
};

/**
 * Уменьшение масштаба изображения
 */
const handleZoomingOut = () => {
  changeScale(-`${SCALE_STEP}`);
};

/**
 * Увеличение масштаба изображения
 */
const handleZoomingIn = () => {
  changeScale(+`${SCALE_STEP}`);
};


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
smallerButton.addEventListener('click', handleZoomingOut);
biggerButton.addEventListener('click', handleZoomingIn);
effectsList.addEventListener('click', handleApplyEffect);
resetButton.addEventListener('click', closeModal);
hashtagInput.addEventListener('focus', handleFocusInputOrTextarea);
hashtagInput.addEventListener('blur', handleBlurInputOrTextarea);
commentInput.addEventListener('focus', handleFocusInputOrTextarea);
commentInput.addEventListener('blur', handleBlurInputOrTextarea);


// TODO: подумать почему не удаляется класс с body при клике на крестик

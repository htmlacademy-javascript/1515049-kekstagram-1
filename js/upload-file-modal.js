import { isEscapeKey } from './utils.js';
import { onFullSizePhotoEscKeydown } from './open-full-size-photo.js';

const SCALE_STEP = 25;
const Scale = {
  MIN: 25,
  MAX: 100,
};

const uploadFileModal = document.querySelector('.img-upload__overlay');
const controlUploadFile = document.querySelector('#upload-file');

const resetButton = uploadFileModal.querySelector('#upload-cancel');
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

const isHashtagInputOnFocus = () => document.activeElement === hashtagInput;
const isCommentInputOnFocus = () => document.activeElement === commentInput;
const isEffectPreviewNoneOnFocus = () => document.activeElement === effectPreviewNone;

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
 * Обработчик события нажатия клавиши Escape на документе
 * @param evt
 */
const onUploadFileModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (isHashtagInputOnFocus() || isCommentInputOnFocus()) {
      // Без следующей строки при нажатии esc с фокусом на инпуте исчезает класс с body и появляется скролл
      document.removeEventListener('keydown', onFullSizePhotoEscKeydown);
      document.removeEventListener('keydown', onUploadFileModalEscKeydown);
      evt.stopPropagation();
    } else {
      // eslint-disable-next-line no-use-before-define
      closeModal();
    }
  }
};

if (isHashtagInputOnFocus() || isCommentInputOnFocus()) {
  // Без следующей строки при нажатии esc с фокусом на инпуте исчезает класс с body и появляется скролл
  document.removeEventListener('keydown', onFullSizePhotoEscKeydown);
  document.removeEventListener('keydown', onUploadFileModalEscKeydown);
}
// TODO после добавления if выше, скролл на body появляется только пре первом нажатии esc при фокусе на инпут. Разобраться.

/**
 * Открытие окна загрузки фото
 */
const openModal = () => {
  document.body.classList.add('modal-open');
  uploadFileModal.classList.remove('hidden');

  scaleValue.value = `${scale}%`;

  if (isEffectPreviewNoneOnFocus) {
    slider.classList.add('hidden');
  }

  document.addEventListener('keydown', onUploadFileModalEscKeydown);
};

/**
 * Закрытие окна загрузки фото
 */
const closeModal = () => {
  document.body.classList.remove('modal-open');
  uploadFileModal.classList.add('hidden');
  controlUploadFile.value = '';
  imgPreview.className = '';
  scale = Scale.MAX;
  scaleValue.value = scale;
  imgPreview.style = '';

  document.removeEventListener('keydown', onUploadFileModalEscKeydown);
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

smallerButton.addEventListener('click', handleZoomingOut);
biggerButton.addEventListener('click', handleZoomingIn);
effectsList.addEventListener('click', handleApplyEffect);
controlUploadFile.addEventListener('change', openModal);
resetButton.addEventListener('click', closeModal);

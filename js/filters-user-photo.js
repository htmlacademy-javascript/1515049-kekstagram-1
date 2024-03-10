const SCALE_STEP = 25;
const SLIDER_STEP = 1;

const Scale = {
  MIN: 25,
  MAX: 100,
};
const Slider = {
  MIN: 0,
  MAX: 100,
};


const uploadFileModal = document.querySelector('.img-upload__overlay');
const controlUploadFile = document.querySelector('#upload-file');

const effectPreviewNone = uploadFileModal.querySelector('.effects__preview--none');

const scaleValue = uploadFileModal.querySelector('.scale__control--value');
const imgPreview = uploadFileModal.querySelector('.img-upload__preview img');
const slider = uploadFileModal.querySelector('.img-upload__effect-level');
const effectsList = uploadFileModal.querySelector('.effects__list');
const smallerButton = uploadFileModal.querySelector('.scale__control--smaller');
const biggerButton = uploadFileModal.querySelector('.scale__control--bigger');
const effectLevelSlider = uploadFileModal.querySelector('.effect-level__slider');
const effectLevelValue = uploadFileModal.querySelector('.effect-level__value');

const isEffectPreviewNoneOnFocus = () => document.activeElement === effectPreviewNone;

let scale = Scale.MAX;

const formStateDefault = () => {
  controlUploadFile.value = '';
  imgPreview.className = '';
  scale = Scale.MAX;
  scaleValue.value = scale;
  imgPreview.style = '';
  imgPreview.style.filter = '';
  effectLevelSlider.noUiSlider.reset();
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
  effectLevelSlider.noUiSlider.reset();
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

noUiSlider.create(effectLevelSlider, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  step: SLIDER_STEP,
  connect: 'lower',
});

const applyFilter = (value) => {
  const selectedRadioInput = uploadFileModal.querySelector('input[name="effect"]:checked');
  const selectedValue = selectedRadioInput.value;

  switch (selectedValue) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${parseInt(value, 10) * 0.01})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${parseInt(value, 10) * 0.01})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${Math.floor(value)}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${(parseInt(value, 10) * 3) * 0.01}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${(parseInt(value, 10) * 3) * 0.01})`;
      break;
    default:
      imgPreview.style.filter = '';
  }
};

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  effectLevelValue.value = value;
  applyFilter(value);
});

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

export { formStateDefault };

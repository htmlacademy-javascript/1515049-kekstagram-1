const MIN_SYMBOLS = 2;
const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const ErrorMessages = {
  NUMBER_HASHTAGS: `Количество хэштегов не должно превышать ${MAX_HASHTAGS}`,
  HASHTAG_MIN_LENGTH: 'Хэштег не может состоять только из решетки',
  HASHTAG_MAX_LENGTH: `Длина хэштега не должна превышать ${MAX_SYMBOLS} символов`,
  FIRST_SYMBOL: 'Хэштег должен начинаться с символа #',
  HASHTAG_TEMPLATE: 'Допустимые символы после решетки: буквы и цифры',
  REPEAT_HASHTAG: 'Такой хэштег вы уже ввели',
};

const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

let errorMessageText = '';

const validateHashTags = (value) => {
  const repeatHashtag = {};
  const hashtagsArray = value.trim().toLowerCase().replace(/\\s+/g, ' ').split(' ').filter(Boolean);

  // поле необязательно к заполнению
  if (hashtagsArray.length === 0) {
    return true;
  }

  // Проверка на количество хэштегов
  if (hashtagsArray.length > MAX_HASHTAGS) {
    errorMessageText = ErrorMessages.NUMBER_HASHTAGS;
  } else {
    for (let hashtag of hashtagsArray) {
      hashtag = hashtag.trim();

      switch (true) {
        // Проверка на длину хэштега
        case (hashtag[0] === '#' && hashtag.length < MIN_SYMBOLS):
          errorMessageText = ErrorMessages.HASHTAG_MIN_LENGTH;
          break;

        case (hashtag.length > MAX_SYMBOLS):
          errorMessageText = ErrorMessages.HASHTAG_MAX_LENGTH;
          break;

        // Проверка на начало с #
        case (hashtag[0] !== '#'):
          errorMessageText = ErrorMessages.FIRST_SYMBOL;
          break;

        case (!/^[a-zA-Zа-яА-Я0-9]+$/.test(hashtag.slice(1))):
          errorMessageText = ErrorMessages.HASHTAG_TEMPLATE;
          break;

        // Проверка на повторяющиеся хэштеги
        case (repeatHashtag[hashtag]):
          errorMessageText = ErrorMessages.REPEAT_HASHTAG;
          break;

        default:
          repeatHashtag[hashtag] = true;
      }

      if (errorMessageText) {
        return false;
      }
    }
  }
  return true;
};

pristine.addValidator(textHashtags, validateHashTags, () => errorMessageText);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});

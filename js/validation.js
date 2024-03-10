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
  errorTextClass: 'text-help',
});

let errorMessageText = '';

const validateHashTags = (value) => {
  const repeatHashtag = {};
  const hashtagsArray = value.trim().toLowerCase().replace(/\\s+/g, ' ').split(' ').filter(Boolean);

  // поле необязательно к заполнению
  if (hashtagsArray.length === 0) {
    errorMessageText = '';
    return true;
  }

  // Проверка на количество хэштегов
  if (hashtagsArray.length > MAX_HASHTAGS) {
    errorMessageText = ErrorMessages.NUMBER_HASHTAGS;
  } else {
    errorMessageText = '';
    for (let hashtag of hashtagsArray) {
      hashtag = hashtag.trim();

      switch (true) {
        // Проверка на начало с #
        case (hashtag[0] !== '#'):
          errorMessageText = ErrorMessages.FIRST_SYMBOL;
          return false;

        // Проверка на длину хэштега
        case (hashtag.length < MIN_SYMBOLS):
          errorMessageText = ErrorMessages.HASHTAG_MIN_LENGTH;
          return false;

        case (hashtag.length > MAX_SYMBOLS):
          errorMessageText = ErrorMessages.HASHTAG_MAX_LENGTH;
          return false;

        case (!/^[a-zA-Zа-яА-Я0-9]+$/.test(hashtag.slice(1))):
          errorMessageText = ErrorMessages.HASHTAG_TEMPLATE;
          return false;

        // Проверка на повторяющиеся хэштеги
        case (repeatHashtag[hashtag]):
          errorMessageText = ErrorMessages.REPEAT_HASHTAG;
          return false;

        default:
          repeatHashtag[hashtag] = true;
      }
    }
    return true;
  }
};

pristine.addValidator(textHashtags, validateHashTags, () => errorMessageText);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});

// TODO: почему не отправляется форма? Даже пустая? В isValid выше всегда false??????

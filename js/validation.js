const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
// const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const validateHashTags = (value) => {
  const repeatHashtag = {};
  const hashtagsArray = value.trim().toLowerCase().replace(/\\s+/g, ' ').split(' ').filter(Boolean);

  // поле необязательно к заполнению
  if (hashtagsArray.length === 0) {
    return true;
  }

  // Проверка на количество хэштегов
  if (hashtagsArray.length > MAX_HASHTAGS) {
    return false;
  }

  for (let hashtag of hashtagsArray) {
    hashtag = hashtag.trim();
    // Проверка на длину хэштега
    if (hashtag.length === 0 || hashtag.length > MAX_SYMBOLS) {
      return false;
    }
    // Проверка на начало с #
    if (hashtag[0] !== '#') {
      return false;
    }
    // Проверка на соответствие регулярному выражению ^[a-zA-Z0-9]+$
    if (!/^[a-zA-Zа-яА-Я0-9]+$/.test(hashtag.slice(1))) {
      return false;
    }
    // Проверка на повторяющиеся хэштеги
    if (repeatHashtag[hashtag]) {
      return false;
    }
    repeatHashtag[hashtag] = true;
  }

  return true;
};

// не повторяются


const getValidateMessage = () => {
  return 'Поле ввода хэштегов не валидно';
};

pristine.addValidator(textHashtags, validateHashTags, getValidateMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});

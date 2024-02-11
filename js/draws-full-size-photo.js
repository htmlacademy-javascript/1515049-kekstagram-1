const COMMENTS_PER_PAGE = 5;

/**
 * Создаёт аватар комментатора
 * @param avatar
 * @param name
 * @returns {HTMLImageElement}
 */
const createCommentImage = (avatar, name) => {
  const socialPicture = document.createElement('img');
  socialPicture.className = 'social__picture';
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialPicture.width = 35;
  socialPicture.height = 35;
  return socialPicture;
};

/**
 * Создаёт текст комментария
 * @param message
 * @returns {HTMLParagraphElement}
 */
const createCommentText = (message) => {
  const socialText = document.createElement('p');
  socialText.className = 'social__text';
  socialText.textContent = message;
  return socialText;
};

/**
 * Создаёт комментарий для большого фото
 * @param avatar
 * @param message
 * @param name
 * @returns {HTMLLIElement}
 */
const createCommentElement = ({avatar, message, name}) => {
  const socialComment = document.createElement('li');
  socialComment.className = 'social__comment';

  const socialPicture = createCommentImage(avatar, name);
  const socialText = createCommentText(message);

  socialComment.appendChild(socialPicture);
  socialComment.appendChild(socialText);

  return socialComment;
};

/**
 * Устанавливает изображение и описание в полноразмерном просмотре
 * @param url
 * @param likes
 * @param description
 */
const setPhotoInfo = (url, likes, description) => {
  const bigPicturePreview = document.querySelector('.big-picture__preview');
  bigPicturePreview.querySelector('.big-picture__img img').src = url;
  bigPicturePreview.querySelector('.likes-count').textContent = likes;
  bigPicturePreview.querySelector('.social__caption').textContent = description;
};

/**
 * Показывает комментарии на странице полноразмерного фото
 * @param comments
 * @param startIndex
 * @param endIndex
 * @returns {*}
 */
const showComments = (comments, startIndex, endIndex) => {
  const commentsList = document.querySelector('.social__comments');

  const showingComments = comments.slice(startIndex, endIndex);

  if (startIndex === 0) {
    commentsList.innerHTML = '';
  }

  showingComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsList.appendChild(commentElement);
  });

  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');

  socialCommentCount.querySelector('.showing-comments').textContent = `${comments.length <= COMMENTS_PER_PAGE ? comments.length : COMMENTS_PER_PAGE}`;
  socialCommentCount.querySelector('.comments-count').textContent = comments.length;

  if (comments.length <= endIndex) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  return showingComments;
};

/**
 * Показывает дополнительные комментарии
 * @param comments
 * @param startIndex
 * @param endIndex
 */
const loadMoreComments = (comments, startIndex, endIndex) => {
  showComments(comments, startIndex, endIndex);

  if (endIndex >= comments.length) {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
};

/**
 * Показывает большое фото при клике на миниатюру
 * @param id
 * @param url
 * @param likes
 * @param comments
 * @param description
 */
const renderFullSizePhoto = (id, url, likes, comments, description) => {
  let startIndex = 0;
  let endIndex = COMMENTS_PER_PAGE;

  setPhotoInfo(url, likes, description);
  showComments(comments, startIndex, endIndex);

  const commentsLoader = document.querySelector('.comments-loader');

  commentsLoader.addEventListener('click', () => {
    startIndex += COMMENTS_PER_PAGE;

    endIndex = Math.min(startIndex + COMMENTS_PER_PAGE, comments.length);
    loadMoreComments(comments, startIndex, endIndex);
  });
};

export { renderFullSizePhoto };

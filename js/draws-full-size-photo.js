const createCommentElement = ({avatar, message, name}) => {
  const socialComment = document.createElement('li');
  socialComment.className = 'social__comment';

  const socialPicture = document.createElement('img');
  socialPicture.className = 'social__picture';
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialPicture.width = 35;
  socialPicture.height = 35;

  socialComment.appendChild(socialPicture);

  const socialText = document.createElement('p');
  socialText.className = 'social__text';
  socialText.textContent = message;

  socialComment.appendChild(socialText);

  return socialComment;
};

const renderFullSizePhoto = (id, url, likes, comments, description) => {
  const COMMENTS_PER_PAGE = 5;
  let startIndex = 0;
  let endIndex = COMMENTS_PER_PAGE;

  const bigPictureContainer = document.querySelector('.big-picture');
  const bigPicturePreview = bigPictureContainer.querySelector('.big-picture__preview');

  const socialCommentCount = bigPicturePreview.querySelector('.social__comment-count');
  const commentsLoader = bigPicturePreview.querySelector('.comments-loader');

  bigPicturePreview.querySelector('.big-picture__img img').src = url;
  bigPicturePreview.querySelector('.likes-count').textContent = likes;
  bigPicturePreview.querySelector('.showing-comments').textContent = `${comments.length <= COMMENTS_PER_PAGE ? comments.length : COMMENTS_PER_PAGE}`;
  bigPicturePreview.querySelector('.comments-count').textContent = comments.length;
  bigPicturePreview.querySelector('.social__comments').innerHTML = '';
  bigPicturePreview.querySelector('.social__caption').textContent = description;

  const commentsList = bigPicturePreview.querySelector('.social__comments');

  const showComments = (start, end) => {
    const showingComments = comments.slice(start, end);

    showingComments.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      commentsList.appendChild(commentElement);
    });

    if (comments.length <= endIndex) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }

    return showingComments;
  };

  showComments(startIndex, endIndex);

  const loadMoreComments = () => {
    startIndex += COMMENTS_PER_PAGE;
    endIndex = Math.min(startIndex + COMMENTS_PER_PAGE, comments.length);
    const newComments = showComments(startIndex, endIndex);
    comments.concat(newComments);

    socialCommentCount.querySelector('.showing-comments').textContent = `${endIndex}`;

    if (endIndex >= comments.length) {
      commentsLoader.classList.add('hidden');
    }
  };

  commentsLoader.addEventListener('click', loadMoreComments);
};

export { renderFullSizePhoto };

const renderFullSizePhoto = (id, url, likes, comments, description) => {
  const bigPictureContainer = document.querySelector('.big-picture');
  const bigPicturePreview = bigPictureContainer.querySelector('.big-picture__preview');

  // скрываем блоки счетчика комментариев и загрузки новых комментариев
  bigPicturePreview.querySelector('.social__comment-count').classList.add('hidden');
  bigPicturePreview.querySelector('.comments-loader').classList.add('hidden');

  bigPicturePreview.querySelector('.big-picture__img img').src = url;
  bigPicturePreview.querySelector('.likes-count').textContent = likes;
  bigPicturePreview.querySelector('.comments-count').textContent = comments.length;
  bigPicturePreview.querySelector('.social__comments').innerHTML = '';
  const commensList = bigPicturePreview.querySelector('.social__comments');
  comments.forEach(({avatar, message, name}) => {
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
    commensList.appendChild(socialComment);
  });
  bigPicturePreview.querySelector('.social__caption').textContent = description;
};

export { renderFullSizePhoto };

import { createPhotos } from './data.js';

const drawingFullSizePhoto = () => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  const allPhotos = createPhotos();

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  allPhotos.forEach(({url, likes, comments, description}) => {
    bigPicture.querySelector('.big-picture__img img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes.toString();
    bigPicture.querySelector('.comments-count').textContent = comments.length.toString();
    bigPicture.querySelector('.social__caption').textContent = description;
    const messagesContainer = bigPicture.querySelector('.social__comments');
    messagesContainer.innerHTML = '';
    comments.forEach(({id, avatar, message, name}) => {
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
      messagesContainer.appendChild(socialComment);
    });
  });
};

const openBigPhoto = document.querySelector('.pictures');
openBigPhoto.addEventListener('click', (evt) => {
  console.log(evt.target);
});

import { createPhotos } from './data.js';

const drawsThumbnails = () => {
  const pictureTemplate = document.querySelector('#picture');
  const picturesContainer = document.querySelector('.pictures');

  const thumbnailsPhoto = createPhotos();

  const thumbnailPhotoFragment = document.createDocumentFragment();

  thumbnailsPhoto.forEach(({url, likes, comments}) => {
    const pictureTemplateElement = pictureTemplate.cloneNode(true).content;
    pictureTemplateElement.querySelector('.picture__img').src = url;
    pictureTemplateElement.querySelector('.picture__likes').textContent = likes.toString();
    pictureTemplateElement.querySelector('.picture__comments').textContent = comments.length.toString();

    thumbnailPhotoFragment.appendChild(pictureTemplateElement);
  });

  picturesContainer.appendChild(thumbnailPhotoFragment);
};

export { drawsThumbnails };

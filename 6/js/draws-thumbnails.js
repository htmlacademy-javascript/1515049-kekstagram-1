import { createPhotos } from './data.js';

const drawsThumbnails = () => {
  const pictureTemplate = document.querySelector('#picture');
  const picturesContainer = document.querySelector('.pictures');

  const thumbnailPhotoFragment = document.createDocumentFragment();

  const thumbnailsPhoto = createPhotos();

  thumbnailsPhoto.forEach(({id, url, likes, comments}) => {
    const pictureTemplateElement = pictureTemplate.cloneNode(true).content;
    pictureTemplateElement.querySelector('a').setAttribute('id', id);
    pictureTemplateElement.querySelector('.picture__img').src = url;
    pictureTemplateElement.querySelector('.picture__likes').textContent = likes.toString();
    pictureTemplateElement.querySelector('.picture__comments').textContent = comments.length.toString();

    thumbnailPhotoFragment.appendChild(pictureTemplateElement);
  });

  picturesContainer.appendChild(thumbnailPhotoFragment);
};

export { drawsThumbnails };

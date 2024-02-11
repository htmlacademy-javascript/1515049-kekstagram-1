import { drawsThumbnails } from './draws-thumbnails.js';
import { closeBigPhoto, openBigPhoto } from './open-full-size-photo.js';
import { closeUploadFileModal, openUploadFileModal } from './upload-file.js';

drawsThumbnails();

openBigPhoto();
closeBigPhoto();

openUploadFileModal();
closeUploadFileModal();

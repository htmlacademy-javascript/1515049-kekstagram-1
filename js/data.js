import { getRandomNum } from './function.js';

const PHOTOS_ARR_LEN = 25;

const NAMES = [
  'Александр',
  'Елена',
  'Михаил',
  'Анна',
  'Владимир',
  'Наталья',
  'Иван',
  'Ольга',
  'Сергей',
  'Татьяна',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Закат на горизонте',
  'Радужные волны',
  'Горы в тумане',
  'Цветочное вдохновение',
  'Утренний свет',
  'Мост в перспективе',
  'Снежная симфония',
  'Летнее безмятежье',
  'Сказочный закат',
  'Прибрежные камни',
  'Взгляд в будущее',
  'Живописная дорога',
  'Осенний камуфляж',
  'Архитектурные линии',
  'Пляжные воспоминания',
  'Огонь над водой',
  'Подсолнухи в поле',
  'Городские огоньки',
  'Магия в лесу',
  'Весеннее пробуждение',
  'Мост через реку',
  'Воздушный замок',
  'Спокойствие озера',
  'Граффити на стене',
  'Зимний пейзаж',
];
//
// const IdComments = {
//   MIN: 1,
//   MAX: 500,
// };

const Comments = {
  MIN: 1,
  MAX: 5,
};

const Likes = {
  MIN: 15,
  MAX: 200,
};

const UniqueMessage = {
  MIN: 1,
  MAX: 2,
};

/**
 * Возвращает одно или несколько случайных предложений из массива
 * @
 * @returns {string}
 */
const getRandomMessages = () => {
  const uniqueMessagesSet = new Set();

  while (uniqueMessagesSet.size < (getRandomNum(UniqueMessage.MIN, UniqueMessage.MAX))) {
    uniqueMessagesSet.add(MESSAGES[getRandomNum(0, MESSAGES.length - 1)]);
  }
  return Array.from(uniqueMessagesSet).join(' ');
};

/**
 * Создает объект комментария
 * @param id
 * @returns {{name: string, id, avatar: string, message: string}}
 */
const createCommentsArr = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
  message: getRandomMessages(),
  name: `${NAMES[getRandomNum(0, NAMES.length - 1)]}`,
});

/**
 * Создает объект поста
 * @param id
 * @returns {{comments: {name: string, id, avatar: string, message: string}[], description: string, id, url: string, likes: number}}
 */
const createPost = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomNum(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNum(Likes.MIN, Likes.MAX),
  comments: Array.from({length: (getRandomNum(Comments.MIN, Comments.MAX))}, (_, index) => createCommentsArr(index + 1)),
});

const photos = () => Array.from({length: PHOTOS_ARR_LEN}, (elem, index) => createPost(index + 1));

export { photos };

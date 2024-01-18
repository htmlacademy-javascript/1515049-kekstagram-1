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

const IdComments = {
  MIN: 1,
  MAX: 500,
};

const Comments = {
  MIN: 1,
  MAX: 5,
};

const Likes = {
  MIN: 15,
  MAX: 200,
};

const getRandomNum = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomMessages = () => {
  const uniqueMessagesSet = new Set();

  while (uniqueMessagesSet.size < (getRandomNum(1, 2))) {
    uniqueMessagesSet.add(MESSAGES[getRandomNum(0, MESSAGES.length - 1)]);
  }
  return Array.from(uniqueMessagesSet).join(' ');
};

const createCommentsArr = () => ({
  id: getRandomNum(IdComments.MIN, IdComments.MAX),
  avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
  message: getRandomMessages(),
  name: `${NAMES[getRandomNum(0, NAMES.length - 1)]}`,
});

const createPhotos = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomNum(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNum(Likes.MIN, Likes.MAX),
  comments: Array.from({length: (getRandomNum(Comments.MIN, Comments.MAX))}, createCommentsArr),
});

// ниже должна создаваться переменная photos, в которую записывается созданный массив фотографий. Но eslint не пропускает ни неиспользуемую переменную, ни console.log. Поэтому оставляю так

// const photos = Array.from({length: PHOTOS_ARR_LEN}, (elem, index) => createPhotos(index + 1));
// console.log(photos);

Array.from({length: PHOTOS_ARR_LEN}, (elem, index) => createPhotos(index + 1));

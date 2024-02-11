/**
 * Определяет является ли палиндромом переданная строка
 * @param string
 * @returns {boolean}
 */
const isPalindrom = (string) => {
  string = string.trim().toLowerCase().replaceAll(' ', '');
  const expandedString = string.split('').reverse().join('');
  return expandedString === string;
};

isPalindrom('топот');

/**
 * Возвращает число из строки
 * @param string
 * @returns {number}
 */
const extractsNumbersFromString = (string) => {
  let numbers = '';

  if (!isNaN(string)) {
    string = string.toString().replaceAll(/[^0-9]/g, '').trim();
    return parseInt(string, 10);
  }

  for (const i in string) {

    if (!isNaN(string[i])) {
      numbers += string[i];
    }
  }

  numbers = numbers.replaceAll(' ', '').trim();

  return parseInt(numbers, 10);
};

extractsNumbersFromString('2023 год');

/**
 * Дополняет строку заданными символами до заданной длины
 * @param string
 * @param length
 * @param symbols
 * @returns {*}
 */
const padStringToLength = (string, length, symbols) => {
  while (symbols.length + string.length < length) {
    symbols = symbols.slice(0, ((length - string.length) - symbols.length)) + symbols;
  }
  return symbols.slice(0, (length - string.length)) + string;
};

padStringToLength('1', 2, '0');

/**
 * Проверяет соответствие длины строки заданному значению
 * @param string
 * @param length
 * @returns {boolean}
 */
const checkingStringLength = (string, length) => string.length <= length;

checkingStringLength('проверяемая строка', 20);

/**
 * Возвращает случайное число из заданного диапазона
 * @param min
 * @param max
 * @returns {number}
 */
const getRandomNum = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Проверяет, является ли нажатая клавиша клавишей Esc
 * @param evt
 * @returns {boolean}
 */
const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { getRandomNum, isEscapeKey };

const isPalindrom = (string) => {
  if (string
      .toLowerCase()
      .replaceAll(' ', '')
      .split('').reverse()
      .join('')
      .trim()
    === string
      .toLowerCase()
      .replaceAll(' ', '')
      .trim()) {
    return true;
  }
  return false;
};

// console.log(isPalindrom('топот'));
// console.log(isPalindrom('ДовОд'));
// console.log(isPalindrom('Кекс'));
// console.log(isPalindrom('Лёша на полке клопа нашёл '));

const extractsNumbersFromString = (string) => {
  let numbers = '';

  if (!isNaN(string)) {
    numbers = string;
    numbers = numbers.toString().replaceAll('.', '').replaceAll('-', '').trim();
    return parseInt(numbers, 10);
  }

  for (const i in string) {

    if (!isNaN(string[i])) {
      numbers += string[i];
    }
  }

  numbers = numbers.replaceAll(' ', '').trim();

  return parseInt(numbers, 10);
};

// console.log(extractsNumbersFromString('2023 год'));
// console.log(extractsNumbersFromString('ECMAScript 2022'));
// console.log(extractsNumbersFromString('1 кефир, 0.5 батона'));
// console.log(extractsNumbersFromString('агент 007'));
// console.log(extractsNumbersFromString('а я томат'));
// console.log(extractsNumbersFromString(-1.5));

const padStringToLength = (string, length, symbols) => {
  let paddedString = '';
  if (string.length < length) {
    const symbolsToAdd = length - string.length;
    paddedString = symbols.repeat(Math.ceil(symbolsToAdd / symbols.length)).slice(0, symbolsToAdd) + string;
  }

  if (string.length >= length) {
    paddedString = string;
  }

  return paddedString;
};

// console.log(padStringToLength('1', 2, '0')); // '01'
// console.log(padStringToLength('1', 4, '0')); // '0001'
// console.log(padStringToLength('q', 4, 'werty')); // 'werq'
// console.log(padStringToLength('q', 4, 'we')); // 'wweq' у меня выводится 'wewq'
// console.log(padStringToLength('qwerty', 4, '0')); // 'qwerty'

const checkingStringLength = (string, length) => {
  if (string.length <= length) {
    return true;
  }
  return false;
};

// console.log(checkingStringLength('проверяемая строка', 20)); // true
// console.log(checkingStringLength('проверяемая строка', 18)); // true
// console.log(checkingStringLength('проверяемая строка', 10)); // false

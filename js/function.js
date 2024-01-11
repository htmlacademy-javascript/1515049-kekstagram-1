const isPalindrom = (string) => {
  string = string.trim().toLowerCase().replaceAll(' ', '');
  const expandedString = string.split('').reverse().join('');
  return expandedString === string;
};

isPalindrom('топот');
// console.log(isPalindrom('ДовОд'));
// console.log(isPalindrom('Кекс'));
// console.log(isPalindrom('Лёша на полке клопа нашёл '));

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
// console.log(extractsNumbersFromString('ECMAScript 2022'));
// console.log(extractsNumbersFromString('1 кефир, 0.5 батона'));
// console.log(extractsNumbersFromString('агент 007'));
// console.log(extractsNumbersFromString('а я томат'));
// console.log(extractsNumbersFromString(-1.5));

const padStringToLength = (string, length, symbols) => {
  if (string.length < length) {
    const symbolsToAdd = length - string.length;
    while (symbols.length + string.length < length) {
      symbols = symbols.slice(0, (symbolsToAdd - symbols.length)) + symbols;
    }
    string = symbols.slice(0, symbolsToAdd) + string;
  } else {
    return string;
  }
  return string;
};

padStringToLength('1', 2, '0'); // '01'
// console.log(padStringToLength('1', 4, '0')); // '0001'
// console.log(padStringToLength('q', 4, 'werty')); // 'werq'
// console.log(padStringToLength('q', 4, 'we')); // 'wweq'
// console.log(padStringToLength('qwerty', 4, '0')); // 'qwerty'

const checkingStringLength = (string, length) => string.length <= length;

checkingStringLength('проверяемая строка', 20); // true
// console.log(checkingStringLength('проверяемая строка', 18)); // true
// console.log(checkingStringLength('проверяемая строка', 10)); // false

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
// console.log(extractsNumbersFromString(0.5));

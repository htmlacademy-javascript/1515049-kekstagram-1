const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

/**
 * Проверяет, является ли нажатая клавиша клавишей Esc
 * @param evt
 * @returns {boolean}
 */
const isEscapeKey = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

/**
 * Создаёт элемент с классом
 * @param element тег, который необходимо создать
 * @param className имя класса для создаваемого тега
 * @returns {HTMLAnchorElement | HTMLElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDivElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFormElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLLinkElement | HTMLMapElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLObjectElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLTrackElement | HTMLUListElement | HTMLVideoElement}
 */
const createElementAndAddClass = (element, className) => {
  const newElement = document.createElement(element);
  newElement.className = className;
  return newElement;
};

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

export { getRandomNum, isEscapeKey, createElementAndAddClass };

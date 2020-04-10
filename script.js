const BUTTONS = [
  [
    { name: 'Backquote', eng: ['`', '˜'], rus: [']', '['] },
    { name: 'Digit1', eng: ['1', '!'], rus: ['1', '!'] },
    { name: 'Digit2', eng: ['2', '@'], rus: ['2', '"'] },
    { name: 'Digit3', eng: ['3', '#'], rus: ['3', '№'] },
    { name: 'Digit4', eng: ['4', '$'], rus: ['4', ';'] },
    { name: 'Digit5', eng: ['5', '%'], rus: ['5', '%'] },
    { name: 'Digit6', eng: ['6', 'ˆ'], rus: ['6', ':'] },
    { name: 'Digit7', eng: ['7', '&'], rus: ['7', '?'] },
    { name: 'Digit8', eng: ['8', '*'], rus: ['8', '*'] },
    { name: 'Digit9', eng: ['9', '('], rus: ['9', '('] },
    { name: 'Digit0', eng: ['0', ')'], rus: ['0', ')'] },
    { name: 'Minus', eng: ['-', '_'], rus: ['-', '_'] },
    { name: 'Equal', eng: ['=', '+'], rus: ['=', '+'] },
    { name: 'Backspace', value: 'Backspace' },
  ],
  [
    { name: 'Tab', value: 'Tab' },
    { name: 'KeyQ', eng: ['q', 'Q'], rus: ['й', 'Й'] },
    { name: 'KeyW', eng: ['w', 'W'], rus: ['ц', 'Ц'] },
    { name: 'KeyE', eng: ['e', 'E'], rus: ['у', 'У'] },
    { name: 'KeyR', eng: ['r', 'R'], rus: ['к', 'К'] },
    { name: 'KeyT', eng: ['t', 'T'], rus: ['е', 'Е'] },
    { name: 'KeyY', eng: ['y', 'Y'], rus: ['н', 'Н'] },
    { name: 'KeyU', eng: ['u', 'U'], rus: ['г', 'Г'] },
    { name: 'KeyI', eng: ['i', 'I'], rus: ['ш', 'Ш'] },
    { name: 'KeyO', eng: ['o', 'O'], rus: ['щ', 'Щ'] },
    { name: 'KeyP', eng: ['p', 'P'], rus: ['з', 'З'] },
    { name: 'BracketLeft', eng: ['[', '{'], rus: ['х', 'Х'] },
    { name: 'BracketRight', eng: [']', '}'], rus: ['ъ', 'Ъ'] },
    { name: 'Backslash', eng: ['\\', '|'], rus: ['\\', '/'] },
  ],
  [
    { name: 'CapsLock', value: 'CapsLock' },
    { name: 'KeyA', eng: ['a', 'A'], rus: ['ф', 'Ф'] },
    { name: 'KeyS', eng: ['s', 'S'], rus: ['ы', 'Ы'] },
    { name: 'KeyD', eng: ['d', 'D'], rus: ['в', 'В'] },
    { name: 'KeyF', eng: ['f', 'F'], rus: ['а', 'А'] },
    { name: 'KeyG', eng: ['g', 'G'], rus: ['п', 'П'] },
    { name: 'KeyH', eng: ['h', 'H'], rus: ['р', 'Р'] },
    { name: 'KeyJ', eng: ['j', 'J'], rus: ['о', 'О'] },
    { name: 'KeyK', eng: ['k', 'K'], rus: ['л', 'Л'] },
    { name: 'KeyL', eng: ['l', 'L'], rus: ['д', 'Д'] },
    { name: 'Semicolon', eng: [';', ':'], rus: ['ж', 'Ж'] },
    { name: 'Quote', eng: ['\'', '"'], rus: ['э', 'Э'] },
    { name: 'Enter', value: 'Enter' },
  ],
  [
    { name: 'ShiftLeft', value: 'Shift' },
    { name: 'KeyZ', eng: ['z', 'Z'], rus: ['я', 'Я'] },
    { name: 'KeyX', eng: ['x', 'X'], rus: ['ч', 'Ч'] },
    { name: 'KeyC', eng: ['c', 'C'], rus: ['с', 'С'] },
    { name: 'KeyV', eng: ['v', 'V'], rus: ['м', 'М'] },
    { name: 'KeyB', eng: ['b', 'B'], rus: ['и', 'И'] },
    { name: 'KeyN', eng: ['n', 'N'], rus: ['т', 'Т'] },
    { name: 'KeyM', eng: ['m', 'M'], rus: ['ь', 'Ь'] },
    { name: 'Comma', eng: [',', '<'], rus: ['б', 'Б'] },
    { name: 'Period', eng: ['.', '>'], rus: ['ю', 'Ю'] },
    { name: 'Slash', eng: ['/', '?'], rus: ['.', ','] },
    { name: 'ArrowUp', value: '▲' },
    { name: 'ShiftRight', value: 'Shift' },
  ],
  [
    { name: 'ControlLeft', value: 'Control' },
    { name: 'AltLeft', value: 'Alt' },
    { name: 'MetaLeft', value: 'Meta' },
    { name: 'Space', value: '' },
    { name: 'MetaRight', value: 'Meta' },
    { name: 'AltRight', value: 'Alt' },
    { name: 'ArrowLeft', value: '◄' },
    { name: 'ArrowDown', value: '▼' },
    { name: 'ArrowRight', value: '►' },
  ],
];

const HEADING = document.createElement('h1');
HEADING.innerText = 'RSS Виртуальная клавиатура';
document.body.append(HEADING);

const TEXTAREA = document.createElement('textarea');
TEXTAREA.className = 'textarea';
TEXTAREA.setAttribute('cols', '120');
TEXTAREA.setAttribute('rows', '15');
document.body.append(TEXTAREA);

const KEYBOARD_CONTAINER = document.createElement('div');
KEYBOARD_CONTAINER.className = 'keyboard-container';
document.body.append(KEYBOARD_CONTAINER);

const EXPLANATION = document.createElement('p');
EXPLANATION.className = 'explanation';
EXPLANATION.innerText = `Клавиатура создана в операционной системе Mac OS
Для переключения языка комбинация: левыe ctrl + alt`;
document.body.append(EXPLANATION);

let LANGUAGE;
if (localStorage.getItem('lang')) {
  LANGUAGE = localStorage.getItem('lang');
} else {
  LANGUAGE = 'eng';
}

class Button {
  constructor(prop) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add(prop.name);
    buttonContainer.classList.add('button');
    const buttonValueEng = document.createElement('span');
    buttonValueEng.classList.add('eng');
    const buttonValueEngShift = document.createElement('span');
    buttonValueEngShift.classList.add('eng-shift');
    const buttonValueRus = document.createElement('span');
    buttonValueRus.classList.add('rus');
    const buttonValueRusShift = document.createElement('span');
    buttonValueRusShift.classList.add('rus-shift');

    if ('value' in prop) {
      buttonContainer.classList.add('special');
      buttonValueEng.innerText = prop.value;
      buttonValueRus.innerText = prop.value;
    } else {
      buttonContainer.classList.add('simple');
      [buttonValueEng.innerText, buttonValueEngShift.innerText] = prop.eng;
      [buttonValueRus.innerText, buttonValueRusShift.innerText] = prop.rus;
    }
    buttonContainer.append(buttonValueEng);
    buttonContainer.append(buttonValueEngShift);
    buttonContainer.append(buttonValueRus);
    buttonContainer.append(buttonValueRusShift);
    return buttonContainer;
  }
}

function buildRows(arr) {
  const ROW_CONTAINER = document.createElement('div');
  ROW_CONTAINER.classList.add('row-container');
  arr.forEach((el) => {
    const key = new Button(el);
    ROW_CONTAINER.append(key);
  });
  KEYBOARD_CONTAINER.append(ROW_CONTAINER);
}

function buildKeyboard() {
  BUTTONS.forEach(buildRows);
  if (LANGUAGE === 'eng') {
    KEYBOARD_CONTAINER.querySelectorAll('.rus').forEach((el) => el.classList.add('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.rus-shift').forEach((el) => el.classList.add('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.eng-shift').forEach((el) => el.classList.add('hidden'));
  } else {
    KEYBOARD_CONTAINER.querySelectorAll('.eng').forEach((el) => el.classList.add('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.eng-shift').forEach((el) => el.classList.add('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.rus-shift').forEach((el) => el.classList.add('hidden'));
  }
}

buildKeyboard();

const allButtons = KEYBOARD_CONTAINER.querySelectorAll('.button');
const simpleButtons = KEYBOARD_CONTAINER.querySelectorAll('.simple');
const changeLang = () => {
  if (LANGUAGE === 'eng') {
    LANGUAGE = 'rus';
    KEYBOARD_CONTAINER.querySelectorAll('.rus').forEach((el) => el.classList.remove('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.eng').forEach((el) => el.classList.add('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.eng-shift').forEach((el) => el.classList.add('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.rus-shift').forEach((el) => el.classList.add('hidden'));
  } else {
    LANGUAGE = 'eng';
    KEYBOARD_CONTAINER.querySelectorAll('.eng').forEach((el) => el.classList.remove('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.rus').forEach((el) => el.classList.add('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.rus-shift').forEach((el) => el.classList.add('hidden'));
    KEYBOARD_CONTAINER.querySelectorAll('.eng-shift').forEach((el) => el.classList.add('hidden'));
  }
  localStorage.setItem('lang', LANGUAGE);
};
const special = (elem) => {
  if (elem.classList.contains('Enter')) {
    TEXTAREA.value += '\r\n';
  } else if (elem.classList.contains('Tab')) {
    TEXTAREA.value += '\t';
  } else if (elem.classList.contains('Space')) {
    TEXTAREA.value += ' ';
  } else if (elem.classList.contains('Backspace')) {
    TEXTAREA.value = TEXTAREA.value.slice(0, TEXTAREA.value.length - 1);
  } else if (elem.classList.contains('ArrowUp') || elem.classList.contains('ArrowDown') || elem.classList.contains('ArrowLeft') || elem.classList.contains('ArrowRight')) {
    TEXTAREA.value += elem.querySelector(`span.${LANGUAGE}`).innerText;
  }
};
document.addEventListener('keydown', (event) => {
  TEXTAREA.focus();
  event.preventDefault();
  allButtons.forEach((button) => {
    if (event.code === button.classList[0]) {
      button.classList.add('press');
      if (button.classList.contains('simple') && event.shiftKey) {
        TEXTAREA.value += button.querySelector(`span.${LANGUAGE}-shift`).innerText;
      } else if (button.classList.contains('simple')) {
        TEXTAREA.value += button.querySelector(`span.${LANGUAGE}`).innerText;
      } else if (button.classList.contains('CapsLock')) {
        simpleButtons.forEach((el) => el.classList.add('up'));
      } else if (event.shiftKey) {
        simpleButtons.forEach((elem) => elem.querySelector(`.${LANGUAGE}`).classList.add('hidden'));
        simpleButtons.forEach((elem) => elem.querySelector(`.${LANGUAGE}-shift`).classList.remove('hidden'));
      } else if (event.altKey && event.ctrlKey) {
        changeLang();
      } else {
        special(button);
      }
    }
  });
});

document.addEventListener('keyup', (event) => {
  event.preventDefault();
  allButtons.forEach((key) => {
    if (event.code === key.classList[0]) {
      key.classList.remove('press');
    } else if (event.code === 'CapsLock') {
      simpleButtons.forEach((el) => el.classList.remove('up'));
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      simpleButtons.forEach((elem) => elem.querySelector(`.${LANGUAGE}`).classList.remove('hidden'));
      simpleButtons.forEach((elem) => elem.querySelector(`.${LANGUAGE}-shift`).classList.add('hidden'));
    }
  });
});

allButtons.forEach((el) => el.addEventListener('click', () => {
  TEXTAREA.focus();

  if (el.classList.contains('simple')) {
    el.classList.add('press');
    setTimeout(() => { el.classList.remove('press'); }, 200);
    TEXTAREA.value += el.querySelector(`span.${LANGUAGE}`).innerText;
  } else if (el.classList.contains('CapsLock')) {
    el.classList.toggle('press');
    simpleButtons.forEach((elem) => elem.classList.toggle('up'));
  } else {
    el.classList.add('press');
    setTimeout(() => { el.classList.remove('press'); }, 200);
    special(el);
  }
}));

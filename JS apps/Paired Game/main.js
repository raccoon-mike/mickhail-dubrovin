// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

// Инициализируем переменные для логики игры
let firstCard = null;
let secondCard = null;
let firstCardValue;
let secondCardValue;

// функция, генерирующая массив парных чисел
function createNumbersArray(count) {
  let arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i);
    arr.push(i);
  }
  console.log(arr);
  return arr;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

// функция перемешивания массива
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  console.log(arr);
  return arr;
}

// функция создания карточки
function createCard(number) {
  const card = document.createElement('div');
  card.classList.add('card-front');
  card.dataset.value = number;
  card.textContent = number;
  return card;
}

// функция для сброса игры до начального состояния
function resetGame() {
  // удаляем все карточки
  let cards = document.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }
  // удаляем кнопку сброса игры
  let resetBtn = document.querySelector('.reset-button');
  resetBtn.remove();

  // удаляем заголовок
  let title = document.querySelector('.title');
  title.remove();

  let container = document.querySelector('.container');
  container.classList.remove('container-2', 'container-6', 'container-8', 'container-10');

  // создаем новое игровое поле
  pairedGame();
}

// создание поля с карточками
function createCardsFromArray(array) {
  const container = document.querySelector('.container');
  // создаем заголовок
  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = 'Игра в пары'
  container.appendChild(title);
  // создаем карточку для каждого номера в массиве чисел
  array.forEach((number) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const cardFront = createCard(number);
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = ''

    container.appendChild(card);
    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', () => {
      // если кликнули на открытую карту - игнорируем это действие
      if (card.classList.contains('flipped')) {
        return;
      }

      // открываем карту
      card.classList.add('flipped');

      // если на момент открытия карты уже есть две другие открытые карты - закрываем их
      if (firstCard && secondCard) {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null
        secondCard = null;
      }

      // если это первая карта - запоминаем её
      if (firstCard === null) {

        firstCard = card;
        firstCardValue = cardFront;
        return;
      }

      // если это вторая карта - запоминаем её
      if (secondCard === null) {
        secondCard = card;
        secondCardValue = cardFront;
      }

      // Если открыли две карты, проверяем их значение
      if (firstCard && secondCard) {
        // Если значения совпадают, закрываем карты и обнуляем переменные
        if (firstCardValue.dataset.value === secondCardValue.dataset.value) {
          firstCard = null;
          secondCard = null;
        }
      }
      // если открыты все карты - создаем кнопку ресета игры
      if (document.querySelectorAll('.flipped').length === array.length) {
        const resetBtn = document.createElement('button');
        const timer = document.querySelector('.timer');
        timer.remove();
        resetBtn.classList.add('reset-button', 'btn');
        resetBtn.textContent = 'Сыграть ещё раз';
        container.appendChild(resetBtn);
        document.querySelector('.reset-button').addEventListener('click', resetGame);
      }
    });
  });
  startTimer(array);
  return container;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {
  const pairedArray = createNumbersArray(count);
  shuffle(pairedArray);
  createCardsFromArray(pairedArray);
}

// создаем и возвращаем форму для создания игры
function createGameForm() {
  let title = document.createElement('h2');
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  title.classList.add('title');
  title.textContent = 'Введите количество карточек по вертикали/горизонтали (четное число от 2 до 10)';
  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn');
  button.textContent = 'Начать игру';

  form.append(title);
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

function startTimer(array) {
  let timeLeft = 60; // количество секунд, которое осталось до конца игры
  const timerElement = document.createElement('div');
  timerElement.classList.add('timer');
  timerElement.textContent = `Осталось времени: ${timeLeft} секунд`;
  const container = document.querySelector('.container');
  container.appendChild(timerElement);

  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Осталось времени: ${timeLeft} секунд`;
    if (document.querySelectorAll('.flipped').length === array.length) {
      return
    }
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      alert('Время вышло!');
      location.reload();
    }
  }, 1000);
}

function pairedGame() {
  let gameForm = createGameForm();
  let container = document.querySelector('.container');
  container.append(gameForm.form);

  // браузер создаёт событие submit на форме по нажанию Enter или на кнопку создания дела
  gameForm.form.addEventListener('submit', function (e) {
    // эта строчка необходима, чтобы предотвратить стандартное действие браузера
    // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
    e.preventDefault();
    // игнорируем создание элемента, если пользователь ничего не ввёл в поле
    if (!gameForm.input.value) {
      return;
    }
    let count = (parseInt(gameForm.input.value) ** 2) / 2;
    if (count === 2 || count === 8 || count === 18 || count === 32 || count === 50) {
      if (count === 2) {
        let container = document.querySelector('.container');
        container.classList.add('container-2');
      } else if (count === 18) {
        let container = document.querySelector('.container');
        container.classList.add('container-6');
      } else if (count === 32) {
        let container = document.querySelector('.container');
        container.classList.add('container-8');
      } else if (count === 50) {
        let container = document.querySelector('.container');
        container.classList.add('container-10');
      }
    } else {
      count = 8;
    }
    let removeForm = document.querySelector('.input-group');
    removeForm.remove();
    startGame(count);
  })
}

pairedGame();

// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
  // Добавьте сюда объекты студентов
  {
    name: 'Андрей',
    surname: 'Филипов',
    secondName: 'Леонидович',
    birthDate: new Date(1995, 3, 25),
    startYear: 2013,
    faculty: 'Факультет Прикладных Наук'
  },
  {
    name: 'Екатерина',
    surname: 'Коновалова',
    secondName: 'Валерьевна',
    birthDate: new Date(1993, 9, 16),
    startYear: 2011,
    faculty: 'Информационный факультет'
  },
  {
    name: 'Павел',
    surname: 'Антосенко',
    secondName: 'Андреевич',
    birthDate: new Date(2003, 2, 9),
    startYear: 2021,
    faculty: 'Строительно-технологический Факультет'
  },
  {
    name: 'Жанна',
    surname: 'Фролова',
    secondName: 'Аркадьевна',
    birthDate: new Date(2004, 11, 3),
    startYear: 2022,
    faculty: 'Факультет Промышленного и Гражданского строительства'
  },
  {
    name: 'Роман',
    surname: 'Цыбакин',
    secondName: 'Юрьевич',
    birthDate: new Date(1985, 1, 26),
    startYear: 2003,
    faculty: 'Архитектурный Факультет'
  }
]

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8.
// Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {
  const tableRow = document.createElement('tr');
  const nameData = document.createElement('td');
  const facultyData = document.createElement('td');
  const birthDateData = document.createElement('td');
  let studyYearsData = document.createElement('td');

  tableRow.classList.add('table-row');
  // ФИО полностью
  nameData.textContent = `${studentObj.surname} ${studentObj.name} ${studentObj.secondName}`;
  // Наименование факультета
  facultyData.textContent = `${studentObj.faculty}`;

  // считаем значения дня, месяца и года рождения, а так же возраст в полном количестве лет
  const birthDate = studentObj.birthDate;
  const day = birthDate.getDate().toString().padStart(2, '0');
  const month = (birthDate.getMonth() + 1).toString().padStart(2, '0');
  const year = birthDate.getFullYear().toString();
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  birthDateData.textContent = `${day}.${month}.${year} (${age} лет)`;

  // номер курса
  const courseNumber = new Date().getFullYear() - studentObj.startYear + 1;
  // флаг, указывающий, что обучение уже завершено
  const isGraduated = new Date().getFullYear() > studentObj.startYear + 4 || (new Date().getFullYear() === studentObj.startYear + 4 && new Date().getMonth() >= 8);
  // год окончания обучения
  const endYear = studentObj.startYear + 4;
  // форматирование строки в зависимости от значения флага isGraduated
  if (isGraduated) {
    studyYearsData.textContent = `${studentObj.startYear}-${endYear} (закончил)`;
  } else {
    if (new Date().getMonth() < 8) {
      studyYearsData.textContent = `${studentObj.startYear}-${endYear} (${courseNumber - 1} курс)`;
    } else {
      studyYearsData.textContent = `${studentObj.startYear}-${endYear} (${courseNumber} курс)`;
    }
  }

  tableRow.append(nameData);
  tableRow.append(facultyData);
  tableRow.append(birthDateData);
  tableRow.append(studyYearsData);

  return tableRow

}

// Этап 4. Создайте функцию отрисовки всех студентов.
// Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.
// Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(studentsArray) {
  const container = document.querySelector('.table-body');
  // создаем строчку для каждого студента в списке
  studentsArray.forEach(studentObj => {
    const row = getStudentItem(studentObj)
    container.append(row);
  });
}

renderStudentsTable(studentsList)

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.
// Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

// Получение формы и элементов управления
const form = document.querySelector('#add-student-form');
const nameInput = form.querySelector('#first-name');
const surnameInput = form.querySelector('#last-name');
const secondNameInput = form.querySelector('#middle-name');
const birthDateInput = form.querySelector('#birth-date');
const startYearInput = form.querySelector('#start-year');
const facultyInput = form.querySelector('#faculty');

// функция очистки таблицы
function resetTbody() {
  const container = document.createElement('tbody');
  container.classList.add('table-body');
  const table = document.querySelector('.table');
  table.querySelector('.table-body').replaceWith(container);
}

// Обработчик отправки формы
form.addEventListener('submit', (event) => {
  // Отмена действия по умолчанию (отправки формы)
  event.preventDefault();

  // Получение значений полей и их валидация
  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const secondName = secondNameInput.value.trim();
  const birthDate = new Date(birthDateInput.value);
  const startYear = parseInt(startYearInput.value);
  const faculty = facultyInput.value.trim();
  const currentYear = new Date().getFullYear();

  const errors = [];

  if (birthDate < new Date('1900-01-01')) {
    errors.push('Дата рождения должна быть не ранее 01.01.1900');
  } else if (birthDate > new Date()) {
    errors.push('Дата рождения не может быть в будущем');
  }

  if (startYear < 2000 || startYear > currentYear) {
    errors.push(`Год начала обучения должен быть в диапазоне от 2000 до ${currentYear}`);
  }

  // Если есть ошибки, вывести их и прервать выполнение функции
  if (errors.length) {
    alert(errors.join('\n'));
    return;
  }

  // Создание объекта студента и добавление его в массив
  const student = {
    name,
    surname,
    secondName,
    birthDate,
    startYear,
    faculty
  };

  studentsList.push(student);

  form.reset();

  resetTbody();

  renderStudentsTable(studentsList)
  console.log(studentsList);
});

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// функция сортировки
const sortStudents = (arr, prop, dir = false) => arr.sort((a, b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0);
// функция сортировки по имени
const sortStudentsByName = (arr, dir = false) => arr.sort((a, b) => {
  const fullNameA = `${a.surname} ${a.name} ${a.secondName}`;
  const fullNameB = `${b.surname} ${b.name} ${b.secondName}`;
  return (!dir ? fullNameA < fullNameB : fullNameA > fullNameB) ? -1 : 0;
});

// Обработчик клика по кнопке для сортировки по имени
let dirName = false;
const nameData = document.querySelector('#nameData');
nameData.addEventListener('click', () => {
  resetTbody();
  renderStudentsTable(sortStudentsByName(studentsList, dirName));
  console.log(sortStudentsByName(studentsList, dirName));
  dirName = !dirName;
  dirFaculty = false;
  dirBirthDate = false;
  dirStartYear = false;
})

// Обработчик клика по кнопке для сортировки по факультету
let dirFaculty = false;
const facultyData = document.querySelector('#facultyData');
facultyData.addEventListener('click', () => {
  resetTbody();
  renderStudentsTable(sortStudents(studentsList, 'faculty', dirFaculty));
  console.log(sortStudents(studentsList, 'faculty', dirFaculty));
  dirFaculty = !dirFaculty;
  dirName = false;
  dirBirthDate = false;
  dirStartYear = false;
})

// Обработчик клика по кнопке для сортировки по дате рождения
let dirBirthDate = false;
const birthDateData = document.querySelector('#birthDateData');
birthDateData.addEventListener('click', () => {
  resetTbody();
  renderStudentsTable(sortStudents(studentsList, 'birthDate', dirBirthDate));
  console.log(sortStudents(studentsList, 'birthDate', dirBirthDate));
  dirBirthDate = !dirBirthDate;
  dirName = false;
  dirFaculty = false;
  dirStartYear = false;
})

// Обработчик клика по кнопке для сортировки по году начала обучения
let dirStartYear = false;
const startYearData = document.querySelector('#startYearData');
startYearData.addEventListener('click', () => {
  resetTbody();
  renderStudentsTable(sortStudents(studentsList, 'startYear', dirStartYear));
  console.log(sortStudents(studentsList, 'startYear', dirStartYear));
  dirStartYear = !dirStartYear;
  dirName = false;
  dirFaculty = false;
  dirBirthDate = false;
})

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

// функции фильтра для поиска подстроки в ФИО
function filterSubstringFio(arr, value) {
  let result = [];
  let copy = [...arr];
  for (const item of copy) {
    if (String(item['name']).includes(value) == true || String(item['surname']).includes(value) == true || String(item['secondName']).includes(value) == true) result.push(item);
  }
  return result
}

// функции фильтра для поиска подстроки
function filterSubstring(arr, prop, value) {
  let result = [];
  let copy = [...arr];
  for (const item of copy) {
    if (String(item[prop]).includes(value) == true) result.push(item);
  }
  return result
}

// функция фильтра для полного совпадения
function exactMatchFilter(arr, prop, value) {
  let result = [];
  let copy = [...arr];
  for (const item of copy) {
    if (item[prop] == value) result.push(item);
  }
  return result
}

// функция для отрисовки отфильтрованного массива
function render(arr) {
  resetTbody();
  // значения из полей для ввода
  const fioVal = document.getElementById('inpFio').value;
  const facultyVal = document.getElementById('inpFaculty').value;
  const startVal = document.getElementById('inpStartYear').value;
  const endVal = document.getElementById('inpEndYear').value;

  let newArr = [...arr];
  if (fioVal !== '') newArr = filterSubstringFio(newArr, fioVal);
  if (facultyVal !== '') newArr = filterSubstring(newArr, 'faculty', facultyVal);
  if (startVal !== '') newArr = exactMatchFilter(newArr, 'startYear', startVal);
  if (endVal !== '') newArr = exactMatchFilter(newArr, 'startYear', endVal - 4);

  renderStudentsTable(newArr);
}

document.getElementById('filterForm').addEventListener('submit', function (event) {
  // эта строчка необходима, чтобы предотвратить стандартное действие браузера
  // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
  event.preventDefault();
  render(studentsList);
})

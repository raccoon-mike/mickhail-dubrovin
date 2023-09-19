(async () => {
  let studentsList = []; // Определение и инициализация массива студентов
  // Функция для получения данных студентов с сервера
  async function fetchStudentsFromServer() {
    try {
      const response = await fetch('http://localhost:3000/api/students');

      if (response.ok) {
        const studentsData = await response.json();
        return studentsData;
      } else {
        console.error('Ошибка при получении данных студентов с сервера.');
        return [];
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса на сервер:', error);
      return [];
    }
  }

  // При запуске приложения выполните проверку на наличие данных на сервере и отобразите их на странице (вызовите эту функцию внутри вашего асинхронного блока кода)
  async function initializeApp() {
    const studentsDataFromServer = await fetchStudentsFromServer();
    if (studentsDataFromServer.length > 0) {
      studentsList = studentsDataFromServer; // Обновите массив studentsList данными с сервера
      renderStudentsTable(studentsList); // Отобразите данные на странице
    }
  }

  // Вызовите функцию инициализации при запуске приложения
  initializeApp();
  // Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

  // Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8.
  // Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

  async function deleteStudentFromServer(studentId) {
    try {
      const response = await fetch(`http://localhost:3000/api/students/${studentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Студент с id ${studentId} успешно удален с сервера.`);
      } else {
        console.error('Ошибка при удалении студента с сервера.');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса на сервер:', error);
    }
  }

  function getStudentItem(studentObj) {
    const tableRow = document.createElement('tr');
    const nameData = document.createElement('td');
    const facultyData = document.createElement('td');
    const birthdayData = document.createElement('td');
    let studyYearsData = document.createElement('td');
    const deleteBtn = document.createElement('button');
    const deleteTd = document.createElement('td');
    deleteBtn.classList.add('btn', 'btn-danger');

    tableRow.classList.add('table-row');
    // ФИО полностью
    nameData.textContent = `${studentObj.surname} ${studentObj.name} ${studentObj.lastname}`;
    // Наименование факультета
    facultyData.textContent = `${studentObj.faculty}`;

    // считаем значения дня, месяца и года рождения, а так же возраст в полном количестве лет
    const birthday = new Date(studentObj.birthday);
    const day = birthday.getDate().toString().padStart(2, '0');
    const month = (birthday.getMonth() + 1).toString().padStart(2, '0');
    const year = birthday.getFullYear().toString();
    const ageDiff = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    birthdayData.textContent = `${day}.${month}.${year} (${age} лет)`;

    // номер курса
    const courseNumber = new Date().getFullYear() - parseInt(studentObj.studyStart) + 1;
    // флаг, указывающий, что обучение уже завершено
    const isGraduated = new Date().getFullYear() > parseInt(studentObj.studyStart) + 4 || (new Date().getFullYear() === parseInt(studentObj.studyStart) + 4 && new Date().getMonth() >= 8);
    // год окончания обучения
    const endYear = parseInt(studentObj.studyStart) + 4;
    // форматирование строки в зависимости от значения флага isGraduated
    if (isGraduated) {
      studyYearsData.textContent = `${parseInt(studentObj.studyStart)}-${endYear} (закончил)`;
    } else {
      if (new Date().getMonth() < 8) {
        studyYearsData.textContent = `${parseInt(studentObj.studyStart)}-${endYear} (${courseNumber - 1} курс)`;
      } else {
        studyYearsData.textContent = `${parseInt(studentObj.studyStart)}-${endYear} (${courseNumber} курс)`;
      }
    }

    // создание кнопки deleteBtn
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => {
      // Получите родительский элемент строки (<tr>)
      const row = deleteBtn.parentElement.parentElement;

      // Получите id студента
      const studentId = studentObj.id;

      // Отправьте запрос на удаление студента с указанным id на сервер
      deleteStudentFromServer(studentId);

      // Удалите строку из DOM
      row.remove();

      // Найдите индекс студента в массиве studentsList
      const studentIndex = studentsList.findIndex(student => {
        // Замените это условие на соответствующее вашим данным
        return student.name === studentObj.name && student.surname === studentObj.surname && student.studyStart === studentObj.studyStart;
      });

      // Если индекс студента найден, удалите его из массива
      if (studentIndex !== -1) {
        studentsList.splice(studentIndex, 1);
      }
    });

    deleteTd.append(deleteBtn);

    tableRow.append(nameData);
    tableRow.append(facultyData);
    tableRow.append(birthdayData);
    tableRow.append(studyYearsData);
    tableRow.append(deleteTd);

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

  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.
  // Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

  // Получение формы и элементов управления
  const form = document.querySelector('#add-student-form');
  const nameInput = form.querySelector('#first-name');
  const surnameInput = form.querySelector('#last-name');
  const lastnameInput = form.querySelector('#middle-name');
  const birthdayInput = form.querySelector('#birth-date');
  const studyStartInput = form.querySelector('#start-year');
  const facultyInput = form.querySelector('#faculty');

  // функция очистки таблицы
  function resetTbody() {
    const container = document.createElement('tbody');
    container.classList.add('table-body');
    const table = document.querySelector('.table');
    table.querySelector('.table-body').replaceWith(container);
  }

  // Функция для отправки данных на сервер
  async function saveStudentToServer(studentData) {
    try {
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        const createdStudent = await response.json();
        console.log('Студент успешно сохранен на сервере с id:', createdStudent.id);
        // Добавьте созданного студента в массив studentsList
        studentsList.push(createdStudent);
      } else {
        console.error('Ошибка при сохранении студента на сервере.');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса на сервер:', error);
    }
  }

  // Обработчик отправки формы
  form.addEventListener('submit', async (event) => {
    // Отмена действия по умолчанию (отправки формы)
    event.preventDefault();

    // Получение значений полей и их валидация
    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const lastname = lastnameInput.value.trim();
    const birthday = new Date(birthdayInput.value);
    const studyStart = parseInt(studyStartInput.value);
    const faculty = facultyInput.value.trim();
    const currentYear = new Date().getFullYear();

    const errors = [];

    if (birthday < new Date('1900-01-01')) {
      errors.push('Дата рождения должна быть не ранее 01.01.1900');
    } else if (birthday > new Date()) {
      errors.push('Дата рождения не может быть в будущем');
    }

    if (studyStart < 2000 || studyStart > currentYear) {
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
      lastname,
      birthday,
      studyStart,
      faculty
    };

    await saveStudentToServer(student);

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
    const fullNameA = `${a.surname} ${a.name} ${a.lastname}`;
    const fullNameB = `${b.surname} ${b.name} ${b.lastname}`;
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
    dirbirthday = false;
    dirstudyStart = false;
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
    dirbirthday = false;
    dirstudyStart = false;
  })

  // Обработчик клика по кнопке для сортировки по дате рождения
  let dirbirthday = false;
  const birthdayData = document.querySelector('#birthdayData');
  birthdayData.addEventListener('click', () => {
    resetTbody();
    renderStudentsTable(sortStudents(studentsList, 'birthday', dirbirthday));
    console.log(sortStudents(studentsList, 'birthday', dirbirthday));
    dirbirthday = !dirbirthday;
    dirName = false;
    dirFaculty = false;
    dirstudyStart = false;
  })

  // Обработчик клика по кнопке для сортировки по году начала обучения
  let dirstudyStart = false;
  const studyStartData = document.querySelector('#studyStartData');
  studyStartData.addEventListener('click', () => {
    resetTbody();
    renderStudentsTable(sortStudents(studentsList, 'studyStart', dirstudyStart));
    console.log(sortStudents(studentsList, 'studyStart', dirstudyStart));
    dirstudyStart = !dirstudyStart;
    dirName = false;
    dirFaculty = false;
    dirbirthday = false;
  })

  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

  // функции фильтра для поиска подстроки в ФИО
  function filterSubstringFio(arr, value) {
    let result = [];
    let copy = [...arr];
    for (const item of copy) {
      if (String(item['name']).includes(value) == true || String(item['surname']).includes(value) == true || String(item['lastname']).includes(value) == true) result.push(item);
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
    const startVal = document.getElementById('inpstudyStart').value;
    const endVal = document.getElementById('inpEndYear').value;

    let newArr = [...arr];
    if (fioVal !== '') newArr = filterSubstringFio(newArr, fioVal);
    if (facultyVal !== '') newArr = filterSubstring(newArr, 'faculty', facultyVal);
    if (startVal !== '') newArr = exactMatchFilter(newArr, 'studyStart', startVal);
    if (endVal !== '') newArr = exactMatchFilter(newArr, 'studyStart', endVal - 4);

    renderStudentsTable(newArr);
  }

  document.getElementById('filterForm').addEventListener('submit', function (event) {
    // эта строчка необходима, чтобы предотвратить стандартное действие браузера
    // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
    event.preventDefault();
    render(studentsList);
  })

})();

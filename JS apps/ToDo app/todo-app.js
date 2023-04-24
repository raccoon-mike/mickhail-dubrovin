(function () {
    let todos = [];

    // создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    // функция для сохранения дела в localStorage
    function saveTodoList(listName) {
        localStorage.setItem(listName, JSON.stringify(todos));
    }

    // создаем и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', function (e) {
            e.preventDefault();
            if (input.value.length > 0) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        });

        return {
            form,
            input,
            button,
        };
    }

    // создаем и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name, done) {
        let item = document.createElement('li');
        // кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        let itemDone = done;
        // генерируем уникальный идентификатор
        let id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
        // создаем объект с данными дела и добавляем в массив
        let newItem = { id, name, done };

        // устанавливаем стили для элемента списка, а также для размещения кнопок
        // в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
        return {
            item,
            doneButton,
            deleteButton,
            itemDone,
            id,
            newItem,
        };
    }

    function createTodoApp(container, title = 'Список дел', listName = 'Название списка') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        let storedTodos = localStorage.getItem(listName);
        if (storedTodos) {
            todos = JSON.parse(storedTodos);
            todos.forEach((item) => {
                let todoItem = createTodoItem(item.name, item.done);
                todoList.append(todoItem.item);
                
                if(item.done) {
                    todoItem.item.classList.add('list-group-item-success');
                }

                todoItem.doneButton.addEventListener('click', function () {
                    todoItem.item.classList.toggle('list-group-item-success');
                    item.done = !item.done;
                    saveTodoList(listName);
                    console.log(todos);
                });

                todoItem.deleteButton.addEventListener('click', function () {
                    if (confirm('Вы уверены?')) {
                        todos.splice(todos.indexOf(item), 1);
                        todoItem.item.remove();
                        saveTodoList(listName);
                        console.log(todos);
                    }
                });
            });
        }

        console.log(todos);

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        // браузер создаёт событие submit на форме по нажанию Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function (e) {
            // эта строчка необходима, чтобы предотвратить стандартное действие браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();

            // игнорируем создание элемента, если пользователь ничего не ввёл в поле
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value, false);

            todos.push(todoItem.newItem);
            saveTodoList(listName);
            console.log(todos);

            // добавляем обработчики на кнопки
            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success');
                todoItem.newItem.done = !todoItem.newItem.done;
                saveTodoList(listName);
                console.log(todos);
            });
            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    todos.splice(todos.indexOf(todoItem.newItem), 1);
                    saveTodoList(listName);
                    console.log(todos);
                }
            });

            // создаём и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);
            // обнуляем значение в поле, чтобы не пришлось стирать его вручную
            todoItemForm.input.value = '';
            // делаем кнопку недоступной
            todoItemForm.button.disabled = true;
        });
    }

    window.createTodoApp = createTodoApp;
    // localStorage.clear();
})();
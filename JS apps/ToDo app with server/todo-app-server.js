(() => {
    // создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        const appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
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

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        // <form class = 'input-group mb-3'>
        //     <input class = 'form-control' placeholder = 'Введите название нового дела'></input>
        //     <div class = 'input-group-append'>
        //         <button class = 'btn btn-primary'>Добавить дело</button>
        //     </div>
        // </form>

        return {
            form,
            input,
            button,
        };
    }

    // создаем и возвращаем список элементов
    function createTodoList() {
        const list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItemElement(todoItem, { onDone, onDelete }) {
        const doneClass = 'list-group-item-success'

        const item = document.createElement('li');
        // кнопки помещаем в элемент, который красиво покажет их в одной группе
        const buttonGroup = document.createElement('div');
        const doneButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        // устанавливаем стили для элемента списка, а также для размещения кнопок
        // в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        if (todoItem.done) {
            item.classList.add(doneClass);
        }
        item.textContent = todoItem.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        // добавляем обработчики на кнопки
        doneButton.addEventListener('click', () => {
            onDone({ todoItem, element: item });
            item.classList.toggle(doneClass, todoItem.done);
        });
        deleteButton.addEventListener('click', () => {
            onDelete({ todoItem, element: item });
        });

        // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return item;
    }

    async function createTodoApp(container, title, owner) {
        const todoAppTitle = createAppTitle(title);
        const todoItemForm = createTodoItemForm();
        const todoList = createTodoList();
        const handlers = {
            onDone({ todoItem }) {
                todoItem.done = !todoItem.done;
                fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ done: todoItem.done }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            },
            onDelete({ todoItem, element }) {
                if (!confirm('Вы уверены?')) {
                    return;
                }
                element.remove();
                fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
                    method: 'DELETE',
                });
            },
        };

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        // Отправляем запрос на список всех дел
        const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
        const todoItemList = await response.json();

        todoItemList.forEach(todoItem => {
            const todoItemElement = createTodoItemElement(todoItem, handlers);
            todoList.append(todoItemElement);
        });

        // браузер создаёт событие submit на форме по нажанию Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', async e => {
            // эта строчка необходима, чтобы предотвратить стандартное действие браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();

            // игнорируем создание элемента, если пользователь ничего не ввёл в поле
            if (!todoItemForm.input.value) {
                return;
            }

            const response = await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                body: JSON.stringify({
                    name: todoItemForm.input.value.trim(),
                    owner,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const todoItem = await response.json();

            const todoItemElement = createTodoItemElement(todoItem, handlers);

            // создаём и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItemElement);

            // обнуляем значение в поле, чтобы не пришлось стирать его вручную
            todoItemForm.input.value = '';
        });
    }

    window.createTodoApp = createTodoApp;
    // localStorage.clear();
})();
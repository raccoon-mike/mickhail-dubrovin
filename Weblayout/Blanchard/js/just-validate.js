const validator = new window.JustValidate('.feedback__form');

validator
    .addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Вы не ввели имя',
        },
        {
            rule: 'customRegexp',
            value: /[A-Za-zА-Яа-яЁё]/,
            errorMessage: 'Недопустимый формат'
        },
    ])
    .addField('#tel', [
        {
            rule: 'required',
            errorMessage: 'Вы не ввели телефон',
        },
        {
            rule: 'customRegexp',
            value: /\d$/,
            errorMessage: 'Недопустимый телефон',
        },
    ])
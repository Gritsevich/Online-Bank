export const questions = [
  {
    section: 1,
    items: [
      {
        label: 'Введите логин...',
        type: 'text',
        value: 'login'
      },
      {
        label: 'Пароль должен содержать минимум 8 символов, заглавную букву, цифру и специальный символ',
        type: 'password',
        value: 'password'
      }
    ]
  },
  {
    section: 2,
    items: [
      {
        label: 'Введите имя...',
        type: 'text',
        value: 'name'
      },
      {
        label: 'Введите фамилию...',
        type: 'text',
        value: 'surname'
      },
    ]
  },
  {
    section: 3,
    items: [
      {
        label: 'Введите идентификационный номер...',
        type: 'text',
        value: 'identNumber'
      },
    ]
  },
  {
    section: 4,
    items: [
      {
        label: 'Проверьте правильность ваших данных и нажмите кнопку регистрации',
        type: 'information'
      }
    ]
  }
]
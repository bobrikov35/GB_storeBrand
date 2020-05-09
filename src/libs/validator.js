class Validator {
  /**
   * Проверяет нажатие спец. клавиш
   * @param key: клавиша
   * @returns {boolean}
   */
  static specialKey(key) {
    switch (key) {
      case 'Escape':
      case 'Tab':
      case 'Delete':
      case 'Backspace':
      case 'Enter':
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowLeft': return true;
      default: return false;
    }
  }

  /**
   * Конвертирует строку цифр в номер телефона
   * @param number: строка цифр длинной до 11 символов включительно
   * @returns {string}
   */
  static numberToPhone(number) {
    let result = '+';
    for (let i = 0; i < number.length; i++) {
      result += number[i];
      if (i === 0) result += ' (';
      if (i === 3) result += ') ';
      if (i === 6) result += '-';
      if (i === 8) result += '-';
    }
    return result;
  }

  /**
   * Конвертирует номер телефона в строку цифр
   * @param phone: '+9 (999) 999-99-99'
   * @returns {string}
   */
  static phoneToNumber(phone) {
    return phone.replace(/[-+()]|\s/g, '');
  }

  /**
   * Проверка допустимости введенного имени
   * @param name: строка
   * @returns {boolean}
   */
  static verifyName(name) {
    return /^[a-zа-яё]{3,}$/i.test(name);
  }

  /**
   * Проверка допустимости вводимого символа в поле с именем
   * @param symbol: буква русского или английского алфавита
   * @returns {boolean}
   */
  static verifyNameSymbol(symbol) {
    if (this.specialKey(symbol)) return true;
    return /[a-zа-яё]/i.test(symbol);
  }

  /**
   * Проверка допустимости введенного номера телефона
   * @param phone: '+9 (999) 999-99-99'
   * @returns {boolean}
   */
  static verifyPhone(phone) {
    return /^\+\d+\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(phone);
  }

  /**
   * Проверка допустимости вводимого символа в поле с номером телефона
   * @param symbol: цифра от 0 до 9
   * @returns {boolean}
   */
  static verifyPhoneSymbol(symbol) {
    if (Validator.specialKey(symbol)) return true;
    return /[0-9]/.test(symbol);
  }

  /**
   * Проверка допустимости введенного email
   * @param email: '[имя почтового ящика]@[доменное имя сервера]'
   * @returns {boolean}
   */
  static verifyEmail(email) {
    return /^(([0-9a-z]{1}([-_0-9a-z]|\.)+[0-9a-z]{1})@([0-9a-z]{1}[-_0-9a-z]+\.{1}){1,3}[a-z]{2,})$/i.test(email);
  }

  /**
   * Проверка допустимости вводимого символа в поле с email
   * @param symbol: символ
   * @returns {boolean}
   */
  static verifyEmailSymbol(symbol) {
    if (Validator.specialKey(symbol)) return true;
    return /[-_0-9a-z@]|\./i.test(symbol);
  }

  /**
   * Возвращает новую строку с замененными на заменитель
   * @param string: исходная строка
   * @param subStr: строка, заменяемая на newSubStr - " или '
   * @param newSubStr: строка, заменяющая подстроку из первого параметра - ' или "
   * @returns {void | *}
   */
  static replaceBackticks(string, subStr = "'", newSubStr = '"') {
    const regExp = new RegExp('^\\\'|\\W\\\'|\\\'\\W|\\\'\\$', 'g');
    return string.replace(regExp, (str) => str.replace(subStr, newSubStr));
  }

  /**
   * Выводит сообщение ошибки
   * @param error: строка 'name', 'phone', 'email'
   * @returns {string}
   */
  static errorMessage(error) {
    switch (error.toLowerCase()) {
      case 'name':
        return 'Имя должно содержать не менее трех букв русского или английского алфавита';
      case 'phone':
        return 'Телефон должен соответствовать шаблону +9 (999) 999-99-99';
      case 'email':
        return 'E-mail должен соответствовать виду my.super-mail@mail.ru';
      default:
        return 'Ошибка не предусмотрена валидатором';
    }
  }
}

export default Validator;

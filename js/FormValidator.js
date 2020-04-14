class FormValidator {
  constructor(form, buttonSubmit) {
    this.form = form;
    this.buttonSubmit = buttonSubmit;
    this.inputs = Array.from(this.form.elements);
    this.setEventListeners();
  }

  //валидации поля
  checkInputValidity(element) {
    const errorElement = element.nextElementSibling;
    const errorMessages = {
      valueMissing: 'Это обязательное поле',
      tooShort: 'Должно быть от 2 до 30 символов',
      typeMismatch: 'Здесь должна быть ссылка'
    }
    if (!element.checkValidity()) {
      for (let elem in element.validity) {
        if (element.validity[elem]) {
          errorElement.textContent = errorMessages[elem];
        }
      }
      return false;
    } else {
      errorElement.textContent = '';
      return true;
    }
  }

  //Проверяет валидность всей формы
  checkFormValidity() {
    let isValidForm = true;
    this.inputs.forEach((elem) => {
      if (elem.type !== 'submit') {
        if (!elem.checkValidity()) {
          isValidForm = false;
        }
      }
    })
    return isValidForm;
  }

  //Меняет состояние кнопки сабмита
  setSubmitButtonState() {
    const isValidForm = this.checkFormValidity();

    if (isValidForm) {
      this.buttonSubmit.classList.add('popup__button_active');
      this.buttonSubmit.removeAttribute('disabled');
    } else {
      this.buttonSubmit.classList.remove('popup__button_active');
      this.buttonSubmit.setAttribute('disabled', true);
    }
  }

  clearErrors() {
    this.inputs.forEach(elem => { 
      if (elem.type !== 'submit') {
        elem.nextElementSibling.textContent = '';
      }
    });
  }

  //добавление обработчиков на поля формы
  setEventListeners() {
    this.inputs.forEach((elem) => {
      if (elem.type !== 'submit') {
        elem.addEventListener('input', () => {
          this.checkInputValidity(elem);
          this.setSubmitButtonState();
        });
      }
    })
  }
}
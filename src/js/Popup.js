export class Popup {
  constructor(elem) {
    this.elem = elem;
    this.addEventListenersPopup();
  }

  open() {
    this.elem.classList.add('popup_is-opened');
  }

  close() {
    this.elem.classList.remove('popup_is-opened');
  }

  //Закрытие попап на esc
  keyHandler(event) {
    if (event.key === 'Escape') {
      this.close();
    };
  }

  //Закрытие попап по клику вне формы
  closeByClick(event) {    
    if (event.target.classList.contains('popup_is-opened')) {
      this.close();
    }
  }

  addEventListenersPopup() {
    this.elem.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this.keyHandler.bind(this));
    document.addEventListener('mousedown', this.closeByClick.bind(this));
  }
}


class PopupImage extends Popup {
    constructor(elem) {
      super(elem);                 
    }
  
    //Открывает картинку
    openImage(event) {
      if (event.target.classList.contains('place-card__image')) {
        this.open();    
        this.elem.querySelector('.popup__image').src = event.target.dataset.img;    
      }   
    }
}
import {Popup} from './Popup.js';
export class NewCard extends Popup {
  constructor({ elem, cardList, createCard, form, api}) {
    super(elem);
    this.cardList = cardList;
    this.createCard = createCard;
    this.form = form;
    this.api = api;
    this.addEventListenerNewCard();
  }

  // Отображает состояние загрузки
  renderLoading(isLoading) {    
    const button = this.form.querySelector('button[type="submit"]');
    if (isLoading) {
      button.textContent = 'Загрузка...';      
    } else {
      button.textContent = '+';   
    }  
  } 

  addNewСard(event) {
    event.preventDefault(event);
    const { name, link } = this.form.elements;
    this.renderLoading(true);
    this.api.addNewСard(name.value, link.value)
      .then(data => {
        this.cardList.pushCard(data);
        const card = this.createCard(name.value, link.value, data._id, data.owner._id, data.likes, data.likes.length);    
        this.cardList.addCard(card); 
        this.renderLoading(false);
        this.form.reset();
        this.close();        
      });         
  }

  addEventListenerNewCard() {
    this.form.addEventListener('submit', (event) => this.addNewСard(event));
  }
}

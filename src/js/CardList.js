export class CardList {
  constructor(container, createCard, api) {    
    this.container = container;
    this.createCard = createCard;
    this.api = api;
    this.arrCards = [];    
  }

  setCards(arr) {
    this.arrCards =arr;  
  }

  // Добавление карточки в массив карточек
  pushCard(card) {
    this.arrCards.push(card);  
  }

  // Добавление карточки
  addCard(card) {
    this.container.appendChild(card);
  }

  // Отрисовка всех карточек
  render() {
    const addCard = this.addCard.bind(this);
    this.arrCards.forEach((item) => {      
      const placeCard = this.createCard(item.name, item.link, item._id, item.owner._id, item.likes, item.likes.length);            
      addCard(placeCard);
    });
  }    
}
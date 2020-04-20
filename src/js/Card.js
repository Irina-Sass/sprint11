export class Card {
  constructor(name, link, id, userId, likes, numberLikes, userInfo, api) {
    this.name = name;
    this.link = link;
    this.id = id; // id карточки
    this.userId = userId; // id создателя карточки 
    this.api = api; 
    this.likes = likes; // массив лайков
    this.numberLikes = numberLikes; // количетство лайков  
    this.userInfo = userInfo;     
  }

  //Обработчик лайка
  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
      if (event.target.classList.contains('place-card__like-icon_liked')) {
        this.api.likeCard(this.id)
          .then(data => {
            event.target.closest('.place-card').querySelector('.place-card__like-number').textContent = data.likes.length;
          });
      } 
      else {
        this.api.unLikeCard(this.id)
          .then(data => {
            event.target.closest('.place-card').querySelector('.place-card__like-number').textContent = data.likes.length;
          });        
      }
    }
  }

  //Удаление карточки
  remove(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {     
      if (confirm("Вы действительно хотите удалить эту карточку?")) {
        document.querySelector('.places-list').removeChild(event.target.closest('.place-card'));
        this.api.deleteCard(this.id);       
      }           
    }
  }

  addEventListeners(element) {
    element.addEventListener('click', this.like.bind(this));
    element.addEventListener('click', this.remove.bind(this));
  }

  //Создание карточки
  create() {    
    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', `
        <div class='place-card'>
          <div class='place-card__image'>
            <button class='place-card__delete-icon'></button>
          </div>
          <div class='place-card__description'>
            <h3 class='place-card__name'></h3>
            <div class='place-card__like'>
              <button class='place-card__like-icon'></button>
              <p class='place-card__like-number'></p>
            </div>  
          </div>
        </div>`);
    const placeCard = template.firstElementChild;
    placeCard.querySelector('.place-card__name').textContent = this.name;
    placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
    placeCard.querySelector('.place-card__like-number').textContent = this.numberLikes; 
    placeCard.querySelector('.place-card__image').setAttribute('data-img', this.link);
    if (this.userInfo.user._id ===  this.userId) {
      placeCard.querySelector('.place-card__delete-icon').style.display = 'block';
    }
    if (this.likes.some(element => element._id === this.userInfo.user._id)) {
      placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked'); 
    }    
    
    this.addEventListeners(placeCard);
    return placeCard;
  }
}
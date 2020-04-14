(function () {
  const buttonAddPhoto = document.querySelector('.user-info__button');
  const buttonEdit = document.querySelector('.user-info__edit');
  const buttonAvatar = document.querySelector('.user-info__photo');
  const placesList = document.querySelector('.places-list');
  const editProfilePopup = document.querySelector('#editProfilePopup');
  const editAvatarPopup = document.querySelector('#editАvatar');
  const addPhotoPopup = document.querySelector('#addPhotoPopup');
  const formEdit = editProfilePopup.querySelector('#formEdit');
  const formPhoto = addPhotoPopup.querySelector('#formPhoto');
  const formAvatar = editAvatarPopup.querySelector('#formAvatar');


  const api = new Api( {
    baseUrl: 'https://praktikum.tk/cohort9',
    headers: {
      authorization: '9340f3e9-bf69-4b19-82a3-fbaa33808c0f',
      'Content-Type': 'application/json'
    }
  })
  const userInfo = new UserInfo({
    elem: editProfilePopup,
    form: formEdit,
    userInfoName: document.querySelector('.user-info__name'),
    userInfoJob: document.querySelector('.user-info__job'),
    userInfoPhoto: document.querySelector('.user-info__photo'),
    api
  });
  const createCard = (name, link, id, userId, likes, numberLikes) => {
    const cardElem = new Card(name, link, id, userId, likes, numberLikes, userInfo, api);
    const card = cardElem.create()
    return card;
  };
  const cardList = new CardList(placesList, createCard, api);
  const newCard = new NewCard({
    elem: addPhotoPopup,
    form: formPhoto,
    cardList,
    createCard,
    api
  });
  const popupImage = new PopupImage(document.querySelector('#popupImage'));
  const avatar = new Avatar(editAvatarPopup, formAvatar, api, userInfo);
    const editFormValidator = new FormValidator(formEdit, formEdit.querySelector('.popup__button'));
  const photoFormValidator = new FormValidator(formPhoto, formPhoto.querySelector('.popup__button'));
  const avatarFormValidator = new FormValidator(formAvatar, formAvatar.querySelector('.popup__button'));


  api.getInitialCards()
  .then(data => {
    cardList.setCards(data);
    cardList.render();
  });
  api.getUserData()
  .then(data => {
    userInfo.setUserData(data);
    userInfo.renderUserData();
  });

  //Слушатели событий
  buttonAddPhoto.addEventListener('click', () => {
    newCard.open();
    photoFormValidator.setSubmitButtonState();
  });
  buttonEdit.addEventListener('click', () => {
    userInfo.open();
    userInfo.completeForm();
    editFormValidator.setSubmitButtonState();
    editFormValidator.clearErrors();
  });
  placesList.addEventListener('click', (event) => {
    popupImage.openImage(event);
  });

  buttonAvatar.addEventListener('click', () => {
    avatar.open();
    avatarFormValidator.setSubmitButtonState();
  })
})();



/**REVIEW** Резюме.
 * Очень хорошая работа.
 *
 * Методы класса Api имеют правильную структуру.
 * Обработка ответов сервера происходит вне класса Api методами других классов приложения.
 *
 * Выполнены все дополнительные задания в полном объёме. Молодец!
 *
 *
 * Задание принято!
 *
 *
 */
import {Popup} from './Popup.js';
export class UserInfo extends Popup {
  constructor({ elem, form, userInfoName, userInfoJob, userInfoPhoto, api}) {
    super(elem);
    this.form = form;  
    this.userInfoName = userInfoName;
    this.userInfoJob = userInfoJob;
    this.userInfoPhoto = userInfoPhoto;
    this.user = {};
    this.api = api;
    this.addEventListenerUserInfo();
  }

  // Обновляет данные внутри экземпляра класса
  setUserData(data) {
    this.user = data;
  } 
  
  // Отображает данные пользователя
  renderUserData() {
    const {name, about, avatar} = this.user;
    this.userInfoName.textContent = name;
    this.userInfoJob.textContent = about;    
    this.userInfoPhoto.style.backgroundImage = `url(${avatar})`;
  } 

  // Заполняет форму при открытии
  completeForm() {    
    const {name, job} = this.form.elements; 
    name.value = this.user.name;
    job.value = this.user.about;
  } 

  // Отображает состояние загрузки
  renderLoading(isLoading) {    
    const button = this.form.querySelector('button[type="submit"]');
    if (isLoading) {
      button.textContent = 'Загрузка...';      
    } else {
      button.textContent = 'Сохранить';   
    }  
  } 

  // отображает данные на странице
  updateUserInfo(event) {    
    event.preventDefault(event);
    const {name, job} = this.form.elements;
    this.renderLoading(true);    
    this.api.editProfile(name.value, job.value)    
      .then(data => {        
        this.setUserData(data);
        this.renderUserData();
        this.renderLoading(false);
        this.close();
      })
  } 

  addEventListenerUserInfo() {
    this.form.addEventListener('submit', (event) => { this.updateUserInfo(event); });
  }
}

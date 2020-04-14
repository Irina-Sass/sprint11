class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;            
    }

    doRequest(url, method, body = {}) {        
        if (Object.keys(body).length === 0) {
            return fetch(`${this.baseUrl}${url}`, {
                method: method,
                headers: this.headers                
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } 
                    return Promise.reject(`Ошибка: ${res.status}`);                
                })
                .catch(err => {
                    console.log(err);
                }) 
        } else {
            return fetch(`${this.baseUrl}${url}`, {
                method: method,
                headers: this.headers,
                body: JSON.stringify(body)
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } 
                    return Promise.reject(`Ошибка: ${res.status}`);                
                })
                .catch(err => {
                    console.log(err);
                }) 
        }          
    }
        
    //Загрузка информации о пользователе с сервера
    getUserData() {
        return this.doRequest('/users/me', 'GET')
            .then(data => data)      
    }

    // Загрузка первоначальных карточек с сервера
    getInitialCards() {
        return this.doRequest('/cards', 'GET')
            .then(data => data)             
    }

    // Редактирование профиля   
    editProfile(userName, userAbout) {
        return this.doRequest('/users/me', 'PATCH', {name: userName, about: userAbout})
            .then(data => data);    
    }

    // Добавление новой карточки   
    addNewСard(name, link) {        
        return this.doRequest('/cards', 'POST', {name: name, link: link})
            .then(data => data);    
    }

    // Удаление карточки
    deleteCard(cardId) {        
        return this.doRequest(`/cards/${cardId}`, 'DELETE')
            .then(data => {
                console.log(data);
        });    
    }

    // Постановка лайка
    likeCard(cardId) {        
        return this.doRequest(`/cards/like/${cardId}`, 'PUT')
            .then(data => data); 
    }

    // Удалить лайк
    unLikeCard(cardId) {        
        return this.doRequest(`/cards/like/${cardId}`, 'DELETE')
            .then(data => data); 
    }  
    
    // Редактирование аватара   
    editAvatar(userAvatar) {        
        return this.doRequest('/users/me/avatar', 'PATCH', {avatar: userAvatar})
            .then(data => data);    
    }
}
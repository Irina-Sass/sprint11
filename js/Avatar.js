class Avatar extends Popup {
    constructor(elem, form, api, userInfo) {
        super(elem);
        this.form = form;
        this.api = api;
        this.userInfo = userInfo;
        this.addEventListenerAvatar();
    }

    editAvatar(event) {
        event.preventDefault(event);
        const {link} = this.form.elements;
        this.api.editAvatar(link.value) 
            .then(data => {
                this.close();
                this.form.reset();
                this.userInfo.setUserData(data);
                this.userInfo.renderUserData();
                 
            });
    }

    addEventListenerAvatar() {
        this.form.addEventListener('submit', (event) => this.editAvatar(event));
      }
}
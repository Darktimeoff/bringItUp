import RequestService from '../services/request.services';

export default class Form {
    constructor(forms = null) {
        this.$forms = document.querySelectorAll(forms);
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
        this.path = 'https://jsonplaceholder.typicode.com/posts';
    }

    init() {
        this.$forms.forEach(form => {
            form.addEventListener('submit', _formSubmitHandler.bind(this));
        });
        console.log('hello1');
    }


    useSubmitLoading() {};
    useSubmitSuccess() {};
    useSubmitUnSuccess() {};
}

function _formSubmitHandler(e) {
    e.preventDefault();

    let statusMessage = document.createElement('div');
    statusMessage.style.cssText = `
        display: flex;
        justify-content: center;
        margin-top: 15px;
        font-size: 18px;
        color: grey;
    `;
    e.target.parentElement.append(statusMessage);

    statusMessage.textContent = this.message.loading;

    this.useSubmitLoading();

    const data = Object.fromEntries(new FormData(e.target).entries());
    
    RequestService.postRequest(data, this.path)
        .then((response) => {
            console.log(response)
            statusMessage.textContent = this.message.success;
            this.useSubmitSuccess();
        })
        .catch(error => {
            statusMessage.textContent = this.message.failure;
            useSubmitUnSuccess();
        })
        .finally(() => {
            setTimeout(() => {
                statusMessage.remove()
            }, 5000)
            e.target.reset();
        });
}



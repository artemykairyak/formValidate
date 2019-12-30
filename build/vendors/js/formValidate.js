function formValidate(options) {
    let vf = new validateForm(options);
}

let globalVars = {
    counter: 0,
    inputFirst: false,
    labelFirst: false,
    inputsArray: [],
    amountFiles: 0
}

function reloadFiles(options) {
    let form = options.form;
    let target = options.target;
    let fileInputs = form.querySelectorAll('input[type="file"]');
    let requiredFile = false;
    let labelText = '';
    let startLabelText = '';

    if (fileInputs[0].files[0]) {
        fileInputs[0].classList.remove('error');
    }

    let label = document.createElement('label');

    if (fileInputs[0].getAttribute('data-role').includes('required')) {
        requiredFile = true;
    }

    let lastFileInput = fileInputs[fileInputs.length - 1];

    if (target.nextElementSibling && target.nextElementSibling.tagName === 'LABEL') {
        options.addText ? startLabelText = options.addText : startLabelText = target.nextElementSibling.innerHTML;
        label = target.nextElementSibling;
        labelText = target.files[0].name;
        globalVars.inputFirst = true;
    } else if (target.previousElementSibling && target.previousElementSibling.tagName === 'LABEL') {
        label = target.previousElementSibling;
        options.addText ? startLabelText = options.addText : startLabelText = target.previousElementSibling.innerHTML;
        globalVars.labelFirst = true;
        labelText = target.files[0].name;
        lastFileInput.files[0] = '';
    } else {
        console.log('Structure error. Must be <input><label> or <label><input>');
    }

    label.innerHTML = labelText;
    globalVars.counter = ++globalVars.counter;
    let initialID = fileInputs[0].getAttribute('id');
    let initialName = fileInputs[0].getAttribute('name');
    let newInput = document.createElement('input');

    newInput.setAttribute('name', initialName);
    newInput.setAttribute('type', 'file');
    newInput.setAttribute('data-role', 'file');

    let inputName = newInput.getAttribute('name');
    let newInputName = String(globalVars.counter) + inputName;
    let inputID = newInput.getAttribute('id');
    let newInputID = String(globalVars.counter) + initialID;
    newInput.setAttribute('ID', newInputID);
    newInput.setAttribute('name', newInputName);

    if (globalVars.inputFirst && globalVars.amountFiles <= options.limit) {
        target.after(label);
        label.after(newInput);
        let newLabel = document.createElement('label');
        newLabel.innerHTML = startLabelText;
        newLabel.setAttribute('for', newInputID);
        newInput.after(newLabel);

        globalVars.amountFiles = ++globalVars.amountFiles;

        if (globalVars.amountFiles === options.limit) {
            let inputs = form.querySelectorAll('input[type="file"]');
            inputs[inputs.length - 1].setAttribute('disabled', '');
        }
    } else if (globalVars.labelFirst && globalVars.amountFiles <= options.limit) {
        let newLabel = document.createElement('label');
        newLabel.setAttribute('for', newInputID);
        newLabel.innerHTML = startLabelText;
        target.after(newLabel);
        target.nextElementSibling.after(newInput);
        globalVars.amountFiles = ++globalVars.amountFiles;

        if (globalVars.amountFiles === options.limit) {
            let inputs = form.querySelectorAll('input[type="file"]');
            inputs[inputs.length - 1].setAttribute('disabled', '');
        }
    }

    fileInputs.forEach(item => {
        if (!globalVars.inputsArray.includes(item)) {
            globalVars.inputsArray.push(item);
            item.addEventListener('click', (e) => {
                if (globalVars.inputFirst && e.target.files) {
                    e.preventDefault();
                    if (item.nextElementSibling) {
                        item.nextElementSibling.remove();
                    }
                    delete item.files[0];
                    item.remove();
                    globalVars.amountFiles = --globalVars.amountFiles;

                    if (globalVars.amountFiles === options.limit) {
                        form.querySelectorAll('input[type="file"]')[form.querySelectorAll('input[type="file"]').length - 1].setAttribute('disabled', '');
                    } else {
                        form.querySelectorAll('input[type="file"]')[form.querySelectorAll('input[type="file"]').length - 1].removeAttribute('disabled', '');
                    }
                }

                if (globalVars.labelFirst && e.target.files) {
                    if (!globalVars.inputsArray.includes(item)) {
                        globalVars.inputsArray.push(item);
                    }
                    e.preventDefault();
                    if (item.previousElementSibling) {
                        item.previousElementSibling.remove();
                    }
                    delete item.files[0];
                    item.remove();
                    globalVars.amountFiles = --globalVars.amountFiles;

                    if (globalVars.amountFiles === options.limit) {
                        form.querySelectorAll('input[type="file"]')[form.querySelectorAll('input[type="file"]').length - 1].setAttribute('disabled', '');
                    } else {
                        form.querySelectorAll('input[type="file"]')[form.querySelectorAll('input[type="file"]').length - 1].removeAttribute('disabled', '');
                    }
                }

                if (fileInputs.length === 1 && requiredFile) {
                    form.querySelectorAll('input[type="file"]')[0].setAttribute('data-role', 'file required')
                }
            });
        }
    });
}

class validateForm {
    constructor(options) {
        this.form = options.form;
        this.length = options.form.children.length;
        this.errors = [];
        this.passwordRegExp = options.passwordRegEx || /^.{6,}$/;
        this.emailRegExp = options.emailRegExp || /^[-._a-zA-Z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
        this.phoneRegExp = options.phoneRegExp || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/;
        this.url = options.url;
        this.onLoadStart = (() => {}) || options.onLoadStart;
        this.onSuccess = (() => {}) || options.onSuccess;
        this.onError = (() => {}) || options.onError;
        this.errorClass = options.errorClass || 'error';

        this.validation();
    }

    validation() {
        this.errors = [];

        let inputs = this.form.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type === 'button' || inputs[i].type === 'submit') {
                continue;
            }
            let required = inputs[i].getAttribute('data-role').includes('required');

            if ((required && inputs[i].value === '') ||
                (required && inputs[i].getAttribute('data-role').includes('checkbox') && !inputs[i].checked)) {
                this.errors.push(inputs[i]);
            } else if (inputs[i].getAttribute('data-role').includes('phone')) {
                this.phoneValidation(inputs[i]);
            } else if (inputs[i].getAttribute('data-role').includes('email')) {
                this.emailValidation(inputs[i]);
            } else if (inputs[i].getAttribute('data-role').includes('password')) {
                this.passwordValidation(inputs[i]);
            } else {
                inputs[i].classList.remove(this.errorClass);
            }
        }

        if (this.errors.length) {
            this.errors.forEach(item => {
                item.classList.add(this.errorClass);
                return false;
            });
        } else {
            let errors = false;
            inputs.forEach(item => {
                if (item.classList.contains('error')) {
                    errors = true;
                    return false;
                }
            })

            if (!errors) {
                this.sendInfo(this.url);
            }
        }
    }

    phoneValidation(input) {
        if (input.value.match(this.phoneRegExp)) {
            this.errors.pop(input);
            input.classList.remove(this.errorClass);

            return true;
        }

        this.errors.push(input);
        return false;
    }

    emailValidation(input) {
        if (input.value.match(this.emailRegExp)) {
            this.errors.pop(input);
            input.classList.remove(this.errorClass);
            return true;
        }

        this.errors.push(input);
        return false;
    }

    passwordValidation(input) {
        if (input.value.match(this.passwordRegExp)) {
            this.errors.pop(input);
            input.classList.remove(this.errorClass);
            return true;
        }

        this.errors.push(input);
        return false;
    }

    cleanForm() {
        this.form.reset();

        let firstElem = this.form.querySelector('input[type="file"]');
        let cloneFirstElem = firstElem.cloneNode(false);
        let fileInputs = this.form.querySelectorAll('input[type="file"]');
        let prevElem = firstElem.previousElementSibling;

        for (let i = 0; i < fileInputs.length - 1; i++) {
            if (globalVars.labelFirst) {
                fileInputs[i].previousElementSibling.remove();
                fileInputs[i].remove();
            } else {
                fileInputs[i].nextElementSibling.remove();
                fileInputs[i].remove();
            }
        }

        this.form.querySelectorAll('input[type="file"]')[form.querySelectorAll('input[type="file"]').length - 1].removeAttribute('disabled', '');
        if (globalVars.inputFirst) {
            this.form.querySelectorAll('input[type="file"]').nextElementSibling.innerHTML = ''
        }
        globalVars.inputsArray = [];
        globalVars.amountFiles = 0;
        globalVars.counter = 0;
    }

    sendInfo(url) {
        let data = new FormData(this.form);
        this.form.querySelector('input[type="submit"]').setAttribute('disabled', '');
        this.onLoadStart();
        fetch(url, {
                method: 'post',
                body: data,
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.onSuccess();
                this.cleanForm();
                this.form.querySelector('input[type="submit"]').removeAttribute('disabled');
            })
            .catch(error => {
                this.onError();
                console.log(error);
            });
    }
}
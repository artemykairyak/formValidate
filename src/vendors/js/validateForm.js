function formValidate(options) {
    let vf = new validateForm(options)

}

let globalVars = {
    // fileInputStyle = {

    // }
}


// function setValuesFromStorage(form) {
// 	let inputs = form.querySelectorAll('input');
// 	sessionStorage.setItem('phone', 1)

// 	for (key in inputs) {
// 		if(inputs[key] instanceof HTMLElement && inputs[key].getAttribute('data-role') !== '') {
// 			console.log(inputs[key])
// 			//console.log(inputs[key].getAttribute('data-role'))

// 			// let attrArr = inputs[key].getAttribute('data-role').split(' ');
// 			// attrArr.forEach(item => {
// 			// 	if(item !== 'required' && item !== '') {
// 			// 		form.querySelector('input[data-role="' + item + '"]').addClass('sdsdsd')
// 			// 	} 
// 			// })
// 			//console.log(attrArr);
// 			// console.log(sessionStorage.getItem('phone'))
// 			// console.log(inputs[key].getAttribute('data-role'))
// 			// if(inputs[key].getAttribute('data-role').includes(sessionStorage.getItem(inputs[key].)))
// 			// 
// 		}

// 	}
// }

function filesCounter() {
    let counter = form.querySelectorAll('input[type="file"]').length;
    return counter;
}

function reloadFiles(form) {
    let fileInputs = form.querySelectorAll('input[type="file"]');
    let requiredFile = false;
    let labelText = '';
    let nextSibling = false;
    let label = document.createElement('label');
    if (fileInputs[0].getAttribute('data-role').includes('required')) {
        requiredFile = true;
    }
    let lastFileInput = fileInputs[fileInputs.length - 1];

    if (fileInputs[0].nextElementSibling && fileInputs[0].nextElementSibling.tagName === 'LABEL') {
        label = fileInputs[0].nextElementSibling.cloneNode(false);
        labelText = fileInputs[0].nextElementSibling.innerHTML;
        nextSibling = true;
    } else if (fileInputs[0].previousElementSibling && fileInputs[0].previousElementSibling.tagName === 'LABEL') {
        label = fileInputs[0].previousElementSibling.cloneNode(false);

        labelText = fileInputs[0].previousElementSibling.innerHTML;
    } else {
        console.log('net')
    }

    label.innerHTML = labelText;
    let newInput = this.form.querySelector('input[type="file"]').cloneNode(false);
    let inputName = newInput.getAttribute('name');
    let newInputName = this.filesCounter() + inputName;
    let inputID = newInput.getAttribute('id');
    let newInputID = this.filesCounter() + inputID;
    newInput.setAttribute('ID', newInputID);
    newInput.setAttribute('name', newInputName);
    // newInput.setAttribute('data-role', 'file');
    lastFileInput.after(newInput);
    label.setAttribute('for', newInputID);
    if (nextSibling) {

        newInput.after(label)
    } else {
        newInput.before(label)
    }

    fileInputs.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            delete item.files[0];
            item.remove();

            if (fileInputs.length === 1 && requiredFile) {
                form.querySelectorAll('input[type="file"]')[0].setAttribute('data-role', 'file required')
            }
        })
    });
    // [].forEach.call(files, (item => {

    // fileInputs.addEventListener('click', (e) => {
    // 	e.target.remove();
    // })

    // [].forEach.call(files, (item => {
    //     filesArr.push(item);
    //     // fileInput.files[files.length + 1] = item; 

    //     if (!form.querySelector('.formValidate__files-containter')) {
    //         console.log('if')
    //         elem = document.createElement("div");
    //         elem.classList.add('formValidate__files-containter');
    //         fileInput.insertAdjacentElement('afterend', elem);
    //         //elem.innerHTML = '';
    //         let input = document.createElement("input");
    //             input.setAttribute('type', 'file');
    //             input.files[0] = item;
    //             console.log(input.files)
    //             elem.appendChild(input)
    //     } else {
    //         //elem.innerHTML = '';
    //         console.log('else');

    //         let input = document.createElement("input");
    //             input.setAttribute('type', 'file');
    //             input.files[0] = item;
    //             elem.appendChild(input)

    //     }

    // }));





    // filesArr.push(...files)
    //console.log(filesArr);









}

class validateForm {
    constructor(options) {
        this.form = options.form;
        this.length = options.form.children.length;
        this.errors = [];
        this.passwordRegExp = options.passwordRegEx || /^.{6,}$/;
        this.emailRegExp = options.emailRegExp || /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
        this.phoneRegExp = options.phoneRegExp || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/;
        this.url = options.url;
        this.onLoadStart = options.onLoadStart;
        this.onSuccess = options.onSuccess;
        this.onError = options.onError;
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
                this.phoneValidation(inputs[i])
            } else if (inputs[i].getAttribute('data-role').includes('email')) {
                this.emailValidation(inputs[i])
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
            this.sendInfo(this.url);
        }
    }

    phoneValidation = input => {
        if (input.value.match(this.phoneRegExp)) {
            this.errors.pop(input);
            input.classList.remove(this.errorClass);

            return true;
        }

        this.errors.push(input);
        return false;
    }

    emailValidation = input => {
        if (input.value.match(this.emailRegExp)) {
            this.errors.pop(input);
            input.classList.remove(this.errorClass);
            return true;
        }

        this.errors.push(input);
        return false;
    }

    passwordValidation = input => {
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
        let prevElem = null;
        if (firstElem.previousElementSibling) {
            prevElem = firstElem.previousElementSibling;
        } else {
            prevElem = firstElem.parentNode;
        }

        for (let i = 0; i < fileInputs.length; i++) {
            fileInputs[i].remove();
        }
        if (firstElem.previousElementSibling) {
            prevElem.after(cloneFirstElem)
        } else {
            prevElem.appendChild(cloneFirstElem);
        }
    }

    sendInfo = async (url) => {
        let data = new FormData(this.form);

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
                console.log(data);
            })
            .catch(error => {
                this.onError();
                console.log(error);
            });
    }
}
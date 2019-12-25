function formValidate(options) {
    console.log('sss')
    let vf = new validateForm(options)
    let reload = () => {
        console.log('reload')
    }
}
 let elem = null;
 let filesArr = [];

function reloadFiles(form) {
    let fileInput = form.querySelector('input[type="file"]');
    let files = fileInput.files;
    // [].forEach.call(files, (item => {
    // 		filesArr.push(item);          
    // 		fileInput.files[files.length + 1] = item; 
    //     }));
    
    
    
    // filesArr.push(...files)
    // console.log(filesArr);
   
   
    if (!form.querySelector('.formValidate__files-containter')) {
        console.log('if')
        elem = document.createElement("div");
        elem.classList.add('formValidate__files-containter');
        fileInput.insertAdjacentElement('afterend', elem);
        //elem.innerHTML = '';
        [].forEach.call(files, ((item, i) => {
            let input = document.createElement("input");
            input.setAttribute('type', 'file');
            input.files[i] = item;
            console.log(input.files)
            elem.appendChild(input)
        }))
    } else {
    	elem.innerHTML = '';
        console.log('else');
        filesArr.forEach(item => {
            console.log(item);
            
            let span = document.createElement("span");
            span.innerHTML = item.name;
            elem.appendChild(span);
        })
    }






}

class validateForm {
    constructor(options) {
        console.log('kek')
        this.form = options.form;
        this.length = options.form.children.length;
        this.errors = [];
        this.passwordRegExp = options.passwordRegEx || /^.{6,}$/;
        this.emailRegExp = options.emailRegExp || /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
        this.phoneRegExp = options.phoneRegExp || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
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
            if (inputs[i].type === 'button' || inputs[i].type === 'submit' || inputs[i].type === 'file') {
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
                this.passwordValidation(inputs[i])
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

    sendInfo = async (url) => {
    	let data = new FormData(this.form);
    	// filesArr.forEach(item => {
    	// 	console.log(111)
    	// 	console.log(item)
    	// 	data.append('file', item, item.name);
    	// })
    	
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
                console.log(data);
            })
            .catch(error => {
                this.onError();
                console.log(error);
            });
    }
}
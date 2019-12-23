class validateForm {
    constructor(options) {
        this.form = options.form;
        this.length = options.form.children.length;
        this.errors = [];
        this.emailRexExp = options.emailRegExp || /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
        this.phoneRegExp = options.phoneRegExp || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        this.url = options.url;
        this.data = {};
        this.onLoadStart = options.onLoadStart;
        this.onSuccess = options.onSuccess;
        this.onError = options.onError;
        this.success = false;
        this.validation();
    }

    validation() {
        this.errors = [];

        let inputs = [];
        for (let i = 0; i < this.length; i++) {
            if (form.children[i].type && form.children[i].type !== 'submit') {
                inputs.push(form.children[i]);
            }
        }

        for (let i = 0; i < inputs.length; i++) {
            let required = inputs[i].getAttribute('data-role').includes('required');

            if ((required && inputs[i].value === '') ||
                (required && inputs[i].getAttribute('data-role').includes('checkbox') && !inputs[i].checked)) {
                console.log('if');
                this.errors.push(inputs[i]);
                console.log(inputs[i].value);
            } else if (inputs[i].getAttribute('data-role').includes('phone')) {
                console.log('phone')
                this.phoneValidation(inputs[i])
            } else if (inputs[i].getAttribute('data-role').includes('email')) {
                console.log('email')
                this.emailValidation(inputs[i])
            } else {
                let key = inputs[i].getAttribute('name');
                console.log(key)
                this.data[key] = inputs[i].value;
                console.log(this.data)
                //this.errors.pop(inputs[i]);
                inputs[i].classList.remove('error');
            }
        }

        if (this.errors.length) {
            this.errors.forEach(item => {
                console.log(item)

                item.classList.add('error');
                return false;
            });
        } else {
        	this.success = true;
            this.sendInfo(this.data, this.url);
            console.log('success')
        }


        return true;
    }

    phoneValidation = input => {
        if (input.value.match(this.phoneRegExp)) {
            this.errors.pop(input);
            input.classList.remove('error');
            let key = input.getAttribute('name');
            this.data[key] = input.value;
            return true;
        }

        this.errors.push(input);
        return false;
    }

    emailValidation = input => {
        if (input.value.match(this.emailRegExp)) {
            this.errors.pop(input);
            input.classList.remove('error');
            let key = input.getAttribute('name');
            this.data[key] = input.value;
            return true;
        }

        this.errors.push(input);
        return false;
    }

    sendInfo = (data, url) => {
        console.log(data)
        let request = new XMLHttpRequest();
        console.log(request)
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        request.onloadstart = function() {
        	console.log('load start')
        }

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                this.onSuccess();

           
            } else {
                // We reached our target server, but it returned an error

            }
        };

        request.onerror = this.onError();

    

        request.send(data);
    }

    debug() {
        console.log(this.form);
    }

}
let form = document.querySelector('.form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    formValidate({
        form: form,
        customFields: [
        {
        	dataRole: 'series', 
        	regExp: /^([0-9]{4})?$/
        },
        {
        	dataRole: 'number', 
        	regExp: /^([0-9]{6})?$/
        },
        {
        	dataRole: 'code', 
        	regExp: /^([0-9]{3}[-]{1}[0-9]{3})?$/
        },
        ],
        url: 'http://cors-anywhere.herokuapp.com/http://test.asap-lp.ru/mail/index.php',
        onLoadStart: function() {
            console.log('load start');
        },
        onSuccess: function() {
        	console.log(this.data);
        },
        onError: function() {
        	console.log(this.error);
        }
    });
})
let form = document.querySelector('.form');

form.addEventListener('change', (e) => {
	if(e.target.getAttribute('type') === 'file') {
		reloadFiles({
			form: form, 
			target: e.target,
			addText: 'Upload more',
			limit: 3
		});
	}
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    formValidate({
        form: form,
        phoneRegExp: null,
        emailRegExp: null,
        passwordRexExp: null,
        errorClass: null,
        url: 'http://cors-anywhere.herokuapp.com/http://shop.bitrix24.asap-lp.ru/form_test/index.php',
        onLoadStart: () => {
            console.log('load start');
        },
        onSuccess: () => {
            console.log('success');
        },
        onError: () => {
            console.log('error')
        }
    });
})
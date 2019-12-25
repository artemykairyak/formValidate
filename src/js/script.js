let form = document.querySelector('.form');

document.querySelector('.form .file').addEventListener('change', () => {
	reloadFiles(form);
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
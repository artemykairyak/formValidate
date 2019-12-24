let form = document.querySelector('.form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    formValidate({
        form: form,
        phoneRegExp: null,
        emailRegExp: null,
        url: 'http://cors-anywhere.herokuapp.com/http://shop.bitrix24.asap-lp.ru/form_test/index.php',
        onLoadStart: () => {
            console.log('load start');
        },
        onSuccess: () => {
            console.log('success');
            alert(1)
        },
        onError: () => {
            console.log('error')
        }
    });
})
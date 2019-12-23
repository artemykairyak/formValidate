var form = document.querySelector('.form');

form.addEventListener('submit', function(e) {
	e.preventDefault()
    let a = new validateForm({
        form: form,
        phoneRegExp: null,
        emailRexExp: null,
        url: 'http://cors-anywhere.herokuapp.com/http://shop.bitrix24.asap-lp.ru/form_test/index.php',
        onSuccess: (e) => {
        	console.log(e);
        	e.preventDefault();
        } ,
        onError: (e) => {
        	console.log('eeeeeeeeeee')
        	console.log(e);
        	e.preventDefault();
        }
    });

    
    	
    

    console.log(a.success)

   

})
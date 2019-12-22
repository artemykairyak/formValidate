class validateForm {
	constructor(options) {
		this.form = options.form;
		this.length = options.form.children.length;
		this.errors = [];
		console.log('ekeke')
		this.validation();

		
	}

	validation() {
		this.errors = [];
		
		let inputs = [];
		for(let i = 0; i < this.length; i++) {
			if(form.children[i].type && form.children[i].type !== 'submit') {
				inputs.push(form.children[i]);
			} 
		}

		for(let i = 0; i < inputs.length; i++) {
			let required = inputs[i].getAttribute('data-role').includes('required');
			if(required && (inputs[i].value == '' || !inputs[i].checked)) {
				console.log(inputs[i])
					this.errors.push(inputs[i]);
					
			} else {
				inputs[i].classList.remove('error');
			}
		}		
		
		if(this.errors.length) {
			console.log(111)
			this.errors.forEach(item => {
				console.log(item)
				item.classList.add('error');
			});
			return false;
		}



		inputs.forEach(item => {
			
				item.classList.remove('error');
			});

		return true;
	}

	debug() {
		console.log(this.form);
	}
	
}
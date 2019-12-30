# FormValidate 
Small library for validating and submitting forms.

**Sample form:**

    <form action="" method="POST" name='form' class="form" enctype="multipart/form-data">
   		<label for="phone">Phone</label>
   		<input type="text" id="phone" name='phone' data-role='phone required'>
   		<label for="email">Email</label>
   		<input type="text" id="email" name='email' data-role='email required'>
   		<label for="password">Password</label>
   		<input type="password" id="password" name='password' data-role='password required'>
   		<div class="checkbox-container">
   			<input type="checkbox" id="checkbox" name='checkbox' data-role='checkbox'>
	   		<label for="checkbox">Agree</label>
   		</div>
   		<label for="comment">Comment</label>
   		<input type="text" id="comment" name='comment' data-role>
   		<div class="file-container">
   			<input name="file" type="file" id="file" class='file' data-role="file required">
   			<label class="label" for="file">Upload file</label>
   		</div>
   		<input type="submit" id='submit' name='submit' value='Submit'>
   	</form>

The form can have any structure, however, inputs with type "file" and their labels ***must have a general container***. For example:

    <div class="file-container">
	    <input name="file" type="file" id="file" class='file' data-role="file required">
        <label class="label" for="file">Upload file</label>
    </div>

## Usage example:

**In your HTML-file:**   

    <script src="formValidate.min.js type="text/javascript"></script>
    <script src="scripts.js" type="text/javascript"></script>

  **In your JS-file:**

    let form = document.querySelector('.form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formValidate({
            form: form,
            url: 'YOUR URL',
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
    
	//LIVE RELOAD INPUTS WITH TYPE "FILE"
    document.querySelector('.form').addEventListener('change', (e) => {
    	if(e.target.getAttribute('type') === 'file') {
    		reloadFiles({
    			form: form, 
    			target: e.target,
    			addText: 'Upload more',
    			limit: 3
    		});
    	}
    });
**Inputs attributes:**
`data-role`: all parameters related to validationForm are indicated here. 

**Possible values:**
`email`. To validate as an email.
`phone`. To validate as an phone.
`password`. To validate as an password.
`file`. To validate as an file. 
`checkbox`.  To validate as an checkbox. 
`required`. To indicate that this field is required.

**Example:**

    <input type="text" id="phone" name='phone' data-role='phone required'>
    
 ## Methods
 ### formValidate

    formValidate({form, url, [phoneRegExp], [emailRegExp], [passwordRexExp],  [errorClass], [onLoadStart], [onSuccess], [onError]})

 *Validation and submission of form data to the server.*
#### Params:
**`form`**. Your form. **Required.**

**`url`**. The URL-address to which to send the form. **Required.**

**`phoneRegExp`**. Regular expression for phone number validation. Not required. 
Default `/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/`.

**`emailRegExp`**. Regular expression for email validation. Not required. 
Default `/^[-._a-zA-Z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/`.

**`passwordRexExp`**. Regular expression for password validation. Not required. 
Default `/^.{6,}$/`.

**`errorClass`**. The CSS-class that will be assigned to the inputs in case of a validation error. Not required. 
Default `error`.


**`onLoadStart`**. The callback that will be called upon successful validation and the start of submitting the form to the server. Not required. 

**`onSuccess`**. The callback that will be called upon successful validation and successful sending of data to the server. Not required. 

**`onError`**. The callback that will be called upon successful validation and an unsuccessful attempt to send data to the server. Not required. 

### reloadFiles

    reloadFiles({form, target, addText, limit})

*Live reload inputs with type "file".*
#### Params:
**`form`**. Your form. **Required.**

**`target`**. Event object (e.target). **Required.**

**`addText`**. Text displayed if it is possible to upload another file.  **Required.**

**`limit`**. Maximum number of uploaded files. **Required.**



"use strict";var form=document.querySelector(".form");document.querySelector(".form").addEventListener("change",function(e){"file"===e.target.getAttribute("type")&&reloadFiles({form:form,target:e.target,addText:"Upload more",limit:3})}),form.addEventListener("submit",function(e){e.preventDefault(),formValidate({form:form,phoneRegExp:null,emailRegExp:null,passwordRexExp:null,errorClass:null,url:"http://cors-anywhere.herokuapp.com/http://shop.bitrix24.asap-lp.ru/form_test/index.php",onLoadStart:function(){console.log("load start")},onSuccess:function(){console.log("success")},onError:function(){console.log("error")}})});
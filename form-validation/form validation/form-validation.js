/*
 * Form Validation **javascript and jquery**
 * Author: Ranjith VK
 * 
 * Description
 * 
 * This form validation has inbuild ajax form submition for form without file attachments.
 * This form validation allows you to have separate error messages for each input field.
 * This plugin returns an object with the form and/or input element id along with the messages
 * after validation on form submit, input blur and input value change.
 * User can use these objects to trigger their own modal or alert box to show the message.
 *
 */

(function($){
	'use strict';
	jQuery.noConflict();
	
	$.fn.formValidation = function(options){
		// initiate essential variables
		var defaults = {
			ajaxFunc: false,
			border: true,
			backgroundColor: false,
			inline: false,
			errorSign: '*',
			errorMsg: { /* all the default error messages */
				required: 'This field is required',
				alpha: 'This field accepts only alphabets',
				number: 'This field accepts only numbers',
				alphanum: 'This field accepts only numbers',
				email: 'Not a valid email',
				url: 'Not a valid url',
				phone: 'Not a valid phone number.<br/>eg; +91',
				min: 'Minimum charater length is %d',
				max: 'Maximum charater length is %d',
			},
			emailPattern: /^[a-z]+([\._-]?[a-z0-9])*@+[a-z0-9]+([\.-]?[a-z0-9])*(\.([a-z]{2,}))*(\.([a-z]{2,})$)/im,
			phonePattern: /(^\+[0-9]{2,}[\s-][0-9]{3}[\s-][0-9]{3}[\s-][0-9]{4}$)|(^[0-9]{3}[\s-][0-9]{3}[\s-][0-9]{4}$)|(^0[0-9]{3}[\s-][0-9]{3}[\s-][0-9]{4}$)/m,
			numberPattern: /^[\d\.\n]*$/,
			alphaPattern: /^[a-z\s\.\-\n]*$/i,
			alphanumPattern: /^[\w\s\.\-,\n]*$/i,
			urlPattern: /^(http[s]?:\/\/)?([a-z0-9]{2,}\.)?([a-z0-9-\.]{2,})*([\.][a-z]{2,})(\/[a-z]{2,})*([\w\?\&\=\%\#\+-])*(\.[a-z]{2,}|\/|[a-z0-9]*)$/igm,
			onChnage: true, /* whether or not validate on value change */
			onFailure: function(){},/* triggered on validation error */
			onProgress: function(){},/* triggered on ajax call */
			onSuccess: function(){},/* triggered on ajax call success */
			onError: function(){}/* triggered on ajax call error */
		}
		var options = $.extend(true, defaults, options);
		var ajaxFunc = options.ajaxFunc;
		var border = options.border;
		var backgroundColor = options.backgroundColor;
		var inline = options.inline;
		var errorSign = options.errorSign;
		var errorMsg = options.errorMsg;
		var onChnage = options.onChnage;
		var onProgress = options.onProgress;
		var onSuccess = options.onSuccess;
		var onFailure = options.onFailure;
		var onError = options.onError;
		var emailPattern = options.emailPattern;
		var phonePattern = options.phonePattern;
		var numberPattern = options.numberPattern;
		var alphaPattern = options.alphaPattern;
		var urlPattern = options.urlPattern;
		var validationMsg = {};
		var msg = '';
		var self = $(this);
		
		if(ajaxFunc==true){
			var mailURL = self.attr("action");
			var submitMethod = (self.attr("method")!=="")?self.attr("method"):"Get";
			var encryptType = (self.attr("enctype")!=="")?self.attr("enctype"):"application/x-www-form-urlencoded";
		}
		
		var targetFieldError = false;
	
		// styling the error contents //
		function applyStyle(style, targetField){
			var targetFieldID = $(targetField).attr('id');
			var errorSignContainer = "errorSignContainer_"+self.attr('id')+targetFieldID;
			var top = '10%';
			if(style==false){
				$('#'+self.attr('id')+' #'+targetFieldID).removeClass('validation-errorColor');
				$('#'+self.attr('id')+' #'+targetFieldID).removeClass('validation-errorBG');
				$('#'+self.attr('id')+' #'+targetFieldID).removeClass('validation-errorBorder');
				$('#' + errorSignContainer).remove();
				if($('#wrapper_'+self.attr('id')+'_'+targetFieldID).length == 1) {
					$('#'+self.attr('id')+' #'+targetFieldID).unwrap();
				}
			}else if(style==true){
				$('#'+self.attr('id')+' #'+targetFieldID).addClass('validation-errorColor');
				if(backgroundColor===true) $('#'+self.attr('id')+' #'+targetFieldID).addClass('validation-errorBG');
				if(border===true) $('#'+self.attr('id')+' #'+targetFieldID).addClass('validation-errorBorder');
				// apply error inline with star sign
				if(inline===true){
					if($('#' + errorSignContainer).length==0){
						$('#'+self.attr('id')+' #'+targetFieldID).wrap('<div style="position:relative;display:inline" id="wrapper_'+self.attr('id')+'_'+targetFieldID+'"></div>').parent().append("<div id='errorSignContainer_"+self.attr('id')+targetFieldID+"' style='position: absolute; right: 10px;'>"+errorSign+"</div>");
						$('#' + errorSignContainer).addClass('validation-errorSignContainer');
						top = (100-(($('#' + errorSignContainer).height()/$('#wrapper_'+self.attr('id')+'_'+targetFieldID).height())*100))+'%';
						$('#' + errorSignContainer).css('top',top);
						if (/^select/.test(targetField.type)) {// set left position if the filed is SELECT type
							$('#' + errorSignContainer).css({"left":$(targetField).offset().left+($(targetField).width()-25)});
						}
					}
				}
			}
		}
		function checkElements(targetField){
			var targetFieldID = $(targetField).attr('id');
			var classes = $('#'+self.attr('id')+' #'+targetFieldID).attr('class').split(" ");
			var classCount = classes.length;
			if (classes.indexOf('validate-required') > -1 && $('#'+self.attr('id')+' #'+targetFieldID).val()=="") {
				targetFieldError=true;
				msg = $('#'+self.attr('id')+' #'+targetFieldID).siblings('.required').text();
				validationMsg['#'+self.attr('id')+' #'+targetFieldID] = msg != '' ? {message: msg, status: 'error'} : {message: errorMsg.required, status: 'error'};
			}
			for(var i=0; i<classCount; i++) {
				msg = '';
				if (/^validate/.test(classes[i])) {
					if($('#'+self.attr('id')+' #'+targetFieldID).val()!=""){
						if (/alpha/.test(classes[i])) {
							if(!alphaPattern.test($('#'+self.attr('id')+' #'+targetFieldID).val())){
								targetFieldError=true;
								msg = $('#'+self.attr('id')+' #'+targetFieldID).siblings('.alpha').text();
								validationMsg['#'+self.attr('id')+' #'+targetFieldID] = msg != '' ? {message: msg, status: 'error'} : {message: errorMsg.alpha, status: 'error'};
							}
						}
						if (/number/.test(classes[i])) {
							if(!numberPattern.test($('#'+self.attr('id')+' #'+targetFieldID).val())){
								targetFieldError=true;
								msg = $('#'+self.attr('id')+' #'+targetFieldID).siblings('.number').text();
								validationMsg['#'+self.attr('id')+' #'+targetFieldID] = msg != '' ? {message: msg, status: 'error'} : {message: errorMsg.number, status: 'error'};
							}
						}
						if (/alphanum/.test(classes[i])) {
							if(!alphanumPattern.test($('#'+self.attr('id')+' #'+targetFieldID).val())){
								targetFieldError=true;
								msg = $('#'+self.attr('id')+' #'+targetFieldID).siblings('.alphanum').text();
								validationMsg['#'+self.attr('id')+' #'+targetFieldID] = msg != '' ? {message: msg, status: 'error'} : {message: errorMsg.alphanum, status: 'error'};
							}
						}
						if (/email/.test(classes[i])) {
							if(!emailPattern.test($('#'+self.attr('id')+' #'+targetFieldID).val())){
								targetFieldError=true;
								msg = $('#'+self.attr('id')+' #'+targetFieldID).siblings('.email').text();
								validationMsg['#'+self.attr('id')+' #'+targetFieldID] = msg != '' ? {message: msg, status: 'error'} : {message: errorMsg.email, status: 'error'};
							}
						}
						if (/phone/.test(classes[i])) {
							if(!phonePattern.test($('#'+self.attr('id')+' #'+targetFieldID).val())){
								targetFieldError=true;
								msg = $('#'+self.attr('id')+' #'+targetFieldID).siblings('.phone').text();
								validationMsg['#'+self.attr('id')+' #'+targetFieldID] = msg != '' ? {message: msg, status: 'error'} : {message: errorMsg.phone, status: 'error'};
							}
						}
						if (/url/.test(classes[i])) {
							if(!urlPattern.test($('#'+self.attr('id')+' #'+targetFieldID).val())){
								targetFieldError=true;
								msg = $('#'+self.attr('id')+' #'+targetFieldID).siblings('.url').text();
								validationMsg['#'+self.attr('id')+' #'+targetFieldID] = msg != '' ? {message: msg, status: 'error'} : {message: errorMsg.url, status: 'error'};
							}
						}
						if (/min[0-9]+/.test(classes[i])) {
							var minLen = classes[i].match(/min([0-9]*)/);
							if($('#'+self.attr('id')+' #'+targetFieldID).val().length < minLen[1]){
								targetFieldError=true;
								msg = $('#'+self.attr('id')+' #'+targetFieldID).siblings('.min').text();
								validationMsg['#'+self.attr('id')+' #'+targetFieldID] = msg != '' ? {message: msg, status: 'error'} : {message: errorMsg.min.replace('%d', minLen[1]), status: 'error'};
							}
						}
						if (/max[0-9]+/.test(classes[i])) {
							var maxLen = classes[i].match(/max([0-9]*)/);
							if($('#'+self.attr('id')+' #'+targetFieldID).val().length > maxLen[1]){
								targetFieldError=true;
								msg = $('#'+self.attr('id')+' #'+targetFieldID).siblings('.max').text();
								validationMsg['#'+self.attr('id')+' #'+targetFieldID] = msg != '' ? {message: msg, status: 'error'} : {message: errorMsg.max.replace('%d', maxLen[1]), status: 'error'};
							}
						}
					}
					if(targetFieldError==true){
						break;
					}
				}
			}
			if(targetFieldError==false){
				applyStyle(false, targetField);
				return;
			}else if(targetFieldError==true){
				applyStyle(true, targetField);
				return false;
			}
		}
					
		//  validating on blur  //
		function targetValidationStart(targetField){
			validationMsg = {};
			targetFieldError = false;
			//if($(targetField).val() !== '') {
			if(onChnage == true) {
				var validationResult = checkElements(targetField);
				if(validationResult == false) 
					onFailure(validationMsg);
			}
		}
		$(document).on('blur', '#'+self.attr('id')+' *[class*="validate"]', function(){
			var classes = this.className.split(" ");
			if (classes.indexOf('validate-required') > -1 && $(this).val()=="") {
				targetValidationStart(this);
			}
		})
		$(document).on('change', '#'+self.attr('id')+' *[class*="validate"]', function(){
			var classes = this.className.split(" ");
			if (classes.indexOf('validate-required') < 0 || $(this).val() !="") {
				for (var i = 0, len = classes.length; i < len; i++) {
					if (/^validate/.test(classes[i])) {
						targetValidationStart(this);
						break;
					}
				}
			}
		})
	
		//  validating on submit  //
		function formValidationStart(){
			validationMsg = {};
			var result = true;
			self.find('*[class*="validate"]').each(function(index, element) {
			  	var classes = this.className.split(" ");
			  	for (var i = 0, len = classes.length; i < len; i++) {
					if (/^validate/.test(classes[i])) {
						targetFieldError = false;
						if(checkElements(this)==false){
							result = false;
						}
						break;
					}
				}
			});
			return result;
		}
		$(document).on('submit', '#'+self.attr('id'), function(event) {
			var validationResult = formValidationStart();
			var form = this;
			if(ajaxFunc==true){
				if (validationResult!=false) {
					event.preventDefault();
					var formdata = self.serialize();
					$.ajax({
						type: submitMethod,
						url: mailURL,
						data: formdata,
						dataType:"json",
						beforeSend: function(jqXHR, settings) {
							jqXHR.url = settings.url;
							onProgress({message: "Sending...", status: "progress"});
						}
					}).done(function(data){
							if(data.status == 'success') {
								form.reset();
							}
							onSuccess(data);
					}).fail(function() {
						onError({message: "Oops! Something went wrong...", status: "error"});
					});
				}else{
					onFailure(validationMsg);
					return validationResult;
				}
			}else{
				onFailure(validationMsg);
				return validationResult;
			}
		});
	}
})(jQuery);
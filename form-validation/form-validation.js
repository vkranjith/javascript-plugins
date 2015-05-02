/*
 * Form Validation **javascript and jquery**
 * Author: Ranjith VK
 * 
 * Description
 * 
 * This form validation has inbuild ajax form submission for forms without file attachments.
 * This form validation allows you to have separate error messages for each input field.
 * This plugin returns an object with the form and/or input element id along with the messages
 * after validation on form submit, input blur and input value change.
 * User can use these objects to trigger their own modal or alert box to show the message.
 *
 */

(function($) {
	'use strict';
	
	$.fn.formValidation = function(options) {
		// initiate essential variables
		var defaults = {
			ajaxFunc: false, /* if true will trigger ajax form submission for forms. Note: it does not support attachments. */
			border: true, /* if true will change the border color on validation failure */
			backgroundColor: false, /* if true will change the background color on validation failure */
			inline: false, /* if true it will show the errorSign inside the field */
			inlineMsg: false, /* if true it will show the error message right below the field apart from returning the error validation object */
			errorSign: '*', /* sign to be shown inside the field on validation error only if inline parameter is set to true */
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
				match: 'Field values are not matching',
			},
			emailPattern: /^[a-z]+([\._-]?[a-z0-9])*@+[a-z0-9]+([\.-]?[a-z0-9])*(\.([a-z]{2,}))*(\.([a-z]{2,})$)/im,
			phonePattern: /(^\+[0-9]{2,}[\s-][0-9]{3}[\s-][0-9]{3}[\s-][0-9]{4}$)|(^[0-9]{3}[\s-][0-9]{3}[\s-][0-9]{4}$)|(^0[0-9]{3}[\s-][0-9]{3}[\s-][0-9]{4}$)/m,
			numberPattern: /^[\d\.\n]*$/,
			alphaPattern: /^[a-z\s\.\-\n]*$/i,
			alphanumPattern: /^[\w\s\.\-,\n]*$/i,
			urlPattern: /^(http[s]?:\/\/)?([a-z0-9]{2,}\.)?([a-z0-9-\.]{2,})*([\.][a-z]{2,})(\/[a-z]{2,})*([\w\?\&\=\%\#\+-])*(\.[a-z]{2,}|\/|[a-z0-9]*)$/igm,
			realtime: true, /* whether or not to show error message on validation error */
			onChnage: true, /* whether or not validate on value change */
			onFailure: function() {},/* triggered on validation error */
			onProgress: function() {},/* triggered on ajax call */
			onSuccess: function() {},/* triggered on ajax call success */
			onError: function() {}/* triggered on ajax call error */
		}
		var options = $.extend(true, defaults, options);
		var validationMsg = {};
		var matches = {};
		var msg = '';
		var $self = $(this);
		var self = this[0];
		
		if(options.ajaxFunc==true) {
			var mailURL = self.action;
			var submitMethod = (self.method !== '') ? self.method : 'Get';
			var encryptType = (self.enctype !== '') ? self.enctype : 'application/x-www-form-urlencoded';
		}
		
		var targetFieldError = false;
	
		/* styling the error contents */
		function applyStyle(style, targetField) {
			console.log(validationMsg);
			var errorSignContainer = 'errorSignContainer_'+self.id+targetField.id;
			var errorMsgContainer = 'errorMsgContainer_'+self.id+targetField.id;
			var wrapper = '';
			var top = '10%';
			if(style==false) {
				$('#'+self.id+' #'+targetField.id).removeClass('validation-errorColor validation-errorBG validation-errorBorder');
				$('#' + errorSignContainer).remove();
				$('#' + errorMsgContainer).remove();
				if($('#wrapper_'+self.id+'_'+targetField.id).length == 1) {
					$('#'+self.id+' #'+targetField.id).unwrap();
				}
			}else if(style==true) {
				$('#'+self.id+' #'+targetField.id).addClass('validation-errorColor');
				if(options.backgroundColor===true) $('#'+self.id+' #'+targetField.id).addClass('validation-errorBG');
				if(options.border===true) $('#'+self.id+' #'+targetField.id).addClass('validation-errorBorder');
				/* apply error options.inline with star sign */
				if(options.inline===true) {
					if($('#wrapper_'+self.id+'_'+targetField.id).length==0) {
						wrapper = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden').andSelf().wrapAll('<div style="position:relative;" id="wrapper_'+self.id+'_'+targetField.id+'"></div>').parent();
						wrapper.width($('#'+self.id+' #'+targetField.id).innerWidth());
						wrapper.height($('#'+self.id+' #'+targetField.id).innerHeight());
						wrapper.css('display', 'inline-block');
					} else {
						wrapper = $('#wrapper_'+self.id+'_'+targetField.id);
					}
					if($('#' + errorSignContainer).length==0) {
						wrapper.append('<div id="errorSignContainer_'+self.id+targetField.id+'"" style="position: absolute; right: 10px;">'+options.errorSign+'</div>');
						$('#' + errorSignContainer).addClass('validation-errorSignContainer');
						top = (100-(($('#' + errorSignContainer).height()/$('#wrapper_'+self.id+'_'+targetField.id).height())*100))+'%';
						$('#' + errorSignContainer).css('top',top);
					}
				}
				/* apply error options.inlineMsg */
				if(options.inlineMsg===true) {
					if($('#wrapper_'+self.id+'_'+targetField.id).length==0) {
						wrapper = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden').andSelf().wrapAll('<div style="position:relative;" id="wrapper_'+self.id+'_'+targetField.id+'"></div>').parent();
						wrapper.width($('#'+self.id+' #'+targetField.id).innerWidth());
						wrapper.height($('#'+self.id+' #'+targetField.id).innerHeight());
						wrapper.css('display', 'inline-block');
					} else {
						wrapper = $('#wrapper_'+self.id+'_'+targetField.id);
					}
					if($('#' + errorMsgContainer).length==0) {
						wrapper.append('<div id="errorMsgContainer_'+self.id+targetField.id+'">'+validationMsg['#'+self.id+' #'+targetField.id].message+'</div>');
						$('#' + errorMsgContainer).addClass('validation-errorMsgContainer');
					} else {
						wrapper.find('#errorMsgContainer_'+self.id+targetField.id).text(validationMsg['#'+self.id+' #'+targetField.id].message);
					}
				}
			}
		}
		function checkElements(targetField) {
			var classes = $('#'+self.id+' #'+targetField.id).attr('class').split(" ");
			var classCount = classes.length;
			if (classes.indexOf('validate-required') > -1 && $('#'+self.id+' #'+targetField.id).val()=="") {
				targetFieldError=true;
				msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.required').text();
				validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.required, status: 'error'};
			}
			for(var i=0; i<classCount; i++) {
				msg = '';
				if (/^validate/.test(classes[i])) {
					if($('#'+self.id+' #'+targetField.id).val()!='') {
						if (/alpha/.test(classes[i])) {
							if(!options.alphaPattern.test($('#'+self.id+' #'+targetField.id).val())) {
								targetFieldError=true;
								msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.alpha').text();
								validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.alpha, status: 'error'};
							}
						}
						if (/number/.test(classes[i])) {
							if(!options.numberPattern.test($('#'+self.id+' #'+targetField.id).val())) {
								targetFieldError=true;
								msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.number').text();
								validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.number, status: 'error'};
							}
						}
						if (/alphanum/.test(classes[i])) {
							if(!options.alphanumPattern.test($('#'+self.id+' #'+targetField.id).val())) {
								targetFieldError=true;
								msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.alphanum').text();
								validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.alphanum, status: 'error'};
							}
						}
						if (/email/.test(classes[i])) {
							if(!options.emailPattern.test($('#'+self.id+' #'+targetField.id).val())) {
								targetFieldError=true;
								msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.email').text();
								validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.email, status: 'error'};
							}
						}
						if (/phone/.test(classes[i])) {
							if(!options.phonePattern.test($('#'+self.id+' #'+targetField.id).val())) {
								targetFieldError=true;
								msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.phone').text();
								validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.phone, status: 'error'};
							}
						}
						if (/url/.test(classes[i])) {
							if(!options.urlPattern.test($('#'+self.id+' #'+targetField.id).val())) {
								targetFieldError=true;
								msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.url').text();
								validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.url, status: 'error'};
							}
						}
						if (/min[0-9]+/.test(classes[i])) {
							var minLen = classes[i].match(/min([0-9]*)/);
							if($('#'+self.id+' #'+targetField.id).val().length < minLen[1]) {
								targetFieldError=true;
								msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.min').text();
								validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.min.replace('%d', minLen[1]), status: 'error'};
							}
						}
						if (/max[0-9]+/.test(classes[i])) {
							var maxLen = classes[i].match(/max([0-9]*)/);
							if($('#'+self.id+' #'+targetField.id).val().length > maxLen[1]) {
								targetFieldError=true;
								msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.max').text();
								validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.max.replace('%d', maxLen[1]), status: 'error'};
							}
						}
					}

					if (/match[0-9]+/.test(classes[i])) {
						matches[classes[i]] = $('#'+self.id+' .'+classes[i]).val();
						if(typeof matches[classes[i]] != 'undefined') {
							if($('#'+self.id+' #'+targetField.id).val() !== matches[classes[i]]) {
								targetFieldError=true;
								msg = $('#'+self.id+' #'+targetField.id).siblings('.validation-message-hidden.match').text();
								validationMsg['#'+self.id+' #'+targetField.id] = msg != '' ? {message: msg, status: 'error'} : {message: options.errorMsg.match, status: 'error'};
							}
						}
					}
					if(targetFieldError==true) {
						break;
					}
				}
			}
			if(targetFieldError==false) {
				applyStyle(false, targetField);
				return;
			}else if(targetFieldError==true) {
				applyStyle(true, targetField);
				return false;
			}
		}
					
		/*  validating on blur or change */
		function fieldValidationStart(targetField) {
			validationMsg = {};
			targetFieldError = false;
			if(options.onChnage === true) {
				var validationResult = checkElements(targetField);
				if(validationResult === false && options.realtime === true) 
					options.onFailure(validationMsg);
			}
		}
		$(document).on('blur', '#'+self.id+' *[class*="validate"]', function() {
			var classes = this.className.split(' ');
			if (classes.indexOf('validate-required') > -1 && this.value=="") {
				fieldValidationStart(this);
			}
		})
		$(document).on('change', '#'+self.id+' *[class*="validate"]', function() {
			var classes = this.className.split(' ');
			if (classes.indexOf('validate-required') < 0 || this.value !="") {
				for (var i = 0, len = classes.length; i < len; i++) {
					if (/^validate/.test(classes[i])) {
						fieldValidationStart(this);
						break;
					}
				}
			}
		})
	
		/*  validating on submit  */
		function formValidationStart() {
			validationMsg = {};
			var result = true;
			$self.find('*[class*="validate"]').each(function(index, element) {
			  	var classes = this.className.split(" ");
			  	for (var i = 0, len = classes.length; i < len; i++) {
					if (/^validate/.test(classes[i])) {
						targetFieldError = false;
						if(checkElements(this)==false) {
							result = false;
						}
						break;
					}
				}
			});
			return result;
		}
		$(document).on('submit', '#'+self.id, function(event) {
			var validationResult = formValidationStart();
			var form = this;
			if(options.ajaxFunc==true) {
				if (validationResult!=false) {
					event.preventDefault();
					var formdata = $self.serialize();
					$.ajax({
						type: submitMethod,
						url: mailURL,
						data: formdata,
						dataType:"json",
						beforeSend: function(jqXHR, settings) {
							jqXHR.url = settings.url;
							options.onProgress({message: "Sending...", status: "progress"});
						}
					}).done(function(data) {
							if(data.status == 'success') {
								form.reset();
							}
							options.onSuccess(data);
					}).fail(function() {
						options.onError({message: "Oops! Something went wrong...", status: "error"});
					});
				}else{
					options.onFailure(validationMsg);
					return validationResult;
				}
			}else{
				options.onFailure(validationMsg);
				return validationResult;
			}
		});
	}
})(jQuery);
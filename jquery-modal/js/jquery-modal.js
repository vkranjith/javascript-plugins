// jquery modal
(function ($){
	'use strict';
	
	var jquery_modal_tempContent = '';
	$.fn.extend({
		jquery_modal: function(options){
			var defaults = {
				msg: false,
				status: '', 
				shape: 'rounded',
				cover: false,
				animateIn: 'slideFade',
				animateOut: 'slideFade'
			}
			var modal = true;
			var default_animateOut = options.animateOut;
			options = $.extend(defaults, options);
			var msg = options.msg;
			var status = options.status;
			var shape = options.shape;
			var cover = options.cover;
			var animateIn = options.animateIn;
			var animateOut = (typeof(default_animateOut)=='undefined')?options.animateIn:options.animateOut;
			var roundSize = '';
			var marginLeft = 0;
			var marginTop = 0;
			var modalID = false;
			var coverDoc = cover===true?'cover':'';
			// determining shape
			if(shape=='round'){
				shape_round();
				$(window).resize(function(){shape_round()})
			}
			function shape_round(){
				if(cover==true){
					var size = ($(window).height()>$(window).width())?$(window).height():$(window).width();
					size = (size*145)/100;
					marginLeft = (size-$(window).width())/2;
					marginTop = (size-$(window).height())/2;
					roundSize = 'width:'+size+'px; height:'+size+'px; max-width:none; max-height:none; margin-top:-'+marginTop+'px; margin-left:-'+marginLeft+'px; -webkit-border-radius:50%; -moz-border-radius:50%; border-radius:50%; padding:0 !important;-ms-behavior: url(pie/PIE.htc); behavior: url(pie/PIE.htc);';
					if($('div.jquery-modal-box.round.cover').length>0){
						$('div.jquery-modal-box.round.cover').css({width:size+'px',height:size+'px', maxWidth:'none', maxHeight:'none', 'margin-top':-marginTop+'px', 'margin-left':-marginLeft+'px', padding:0});
						//$('div.jquery-modal-box.round.cover div.content').css({'margin-top':marginTop+20});
					}
				}else{
					var size = ($(window).height()<$(window).width())?$(window).height():$(window).width();
					size = (size*80)/100;
					roundSize = 'width:'+size+'px; height:'+size+'px; -webkit-border-radius:50%; border-radius:50%;';
					if($('div.jquery-modal-box.round').length>0){
						$('div.jquery-modal-box.round').css({width:size+'px',height:size+'px'});
					}
				}
			}
			// creating popup box
			if(msg!==false){
				// inserting the modal content //
				var putContent = function(){
					$("div.jquery-modal-container div.jquery-modal-content").html(msg);
					$("div.jquery-modal-container div.jquery-modal-box").css({marginLeft:($(window).width()-$("div.jquery-modal-container div.jquery-modal-box").width())/2});
					$(document).jquery_modal_show(status,animateIn, animateOut);
				}
				if($("div.jquery-modal-container").length>0){
					var modalID = $('div.jquery-modal-container').attr('id')
					$('div.jquery-modal-container').attr('id','none')
					if(modalID!==false) {
						$("div.modal-"+modalID).html($("div.jquery-modal-box div.jquery-modal-content").html());
					}
					if(animateIn=='slideFade'){
						$("div.jquery-modal-box").stop().animate({marginTop:"0",opacity:0},"fast",function(){
							$(this).remove();
							// create modal box //
							$("div.jquery-modal-container").append('<div class="jquery-modal-box '+shape+' '+coverDoc+'" style="'+roundSize+' opacity:0;filter:alpha(opacity=0)"><!--div class="jquery-modal-close"></div--><div class="jquery-modal-content"></div></div>');
							putContent();
						})
					}else if(animateIn=='pop'){
						$("div.jquery-modal-box").stop().animate({opacity:0},"fast",function(){
							$(this).remove();
							// create modal box //
							$("div.jquery-modal-container").append('<div class="jquery-modal-box '+shape+' '+coverDoc+'" style="'+roundSize+' opacity:0;filter:alpha(opacity=0)"><!--div class="jquery-modal-close"></div--><div class="jquery-modal-content"></div></div>');
							putContent();
						})
					}
				}else{
					// create modal box //
					$("body").append('<div class="jquery-modal-container"><div class="jquery-modal-bg" id="jquery-modal-bg"></div><div class="jquery-modal-box '+shape+' '+coverDoc+'" style="'+roundSize+'"><!--div class="jquery-modal-close"></div--><div class="jquery-modal-content"></div></div></div>');
					putContent();
					//$(document).jquery_modal_show(status,animateIn, animateOut);
				}
			}else{
				///////////////////////////////////////////////////////////////
				$("a[rel=modal]").filter(function(index) {
				   $(this).click(function(){
						var classes=this.className.split(" ");
						for(i=0; i<classes.length; i++){
							if(/(modal)/i.test(classes[i])){
								modalID = classes[i].substr(classes[i].indexOf("-")+1);
								// create modal box //
								$("body").append('<div class="jquery-modal-container"><div class="jquery-modal-bg" id="jquery-modal-bg"></div><div class="jquery-modal-box '+shape+' '+coverDoc+'" style="'+roundSize+'"><div class="jquery-modal-close"></div><div class="jquery-modal-content"></div></div></div>');
								// inserting the modal content //
								jquery_modal_tempContent = $('div.modal-'+modalID).html();
								$('div.jquery-modal-container div.jquery-modal-box div.jquery-modal-content').html(jquery_modal_tempContent);
								$('div.jquery-modal-container').attr({'id':modalID});
								$("div.modal-"+modalID).html('');
								// wrap the content inside another div if cover is true
								if(cover===true){
									var content = $('div.jquery-modal-container div.jquery-modal-box').html();
									$('div.jquery-modal-container div.jquery-modal-box').html('<div class="content" style="width:'+$(window).width()+'px;height:'+$(window).height()+'px;">'+content+'</div>');
								}
								break;
							}
						}
						$(document).jquery_modal_show('',animateIn, animateOut,true);
				   })
				});
			}
			// calling for jquery_modal_close() to initialize
			$(document).jquery_modal_close(animateOut);
		},
		jquery_modal_show: function(status,animateIn, animateOut,cover){
		/////////////////////////////////////////////
			if(status=="progress"){
				$("div.jquery-modal-container div.jquery-modal-content").append('<div class="jquery-modal-progress"></div>');
				$("div.jquery-modal-container div.jquery-modal-close").remove();
				$("div.jquery-modal-container div.jquery-modal-bg").prop("onclick",null);
			}else{
				$("div.jquery-modal-container div.jquery-modal-box").addClass(status);
			}
			
			// animate the modal
			if(animateIn=='slideFade'){
				checkBrowser();
				$("div.jquery-modal-container").fadeIn(300);
				$("div.jquery-modal-container div.jquery-modal-box div.jquery-modal-content").animate({opacity:1}, 300);
				$("div.jquery-modal-container div.jquery-modal-box").animate({marginTop:"50px",opacity:1},"fast");
			}else if(animateIn=='pop'){
				var size = $("div.jquery-modal-container div.jquery-modal-box").width();
				var marginTop = $("div.jquery-modal-container div.jquery-modal-box").css('margin-top');
				var marginLeft = $("div.jquery-modal-container div.jquery-modal-box").css('margin-left');
				$("div.jquery-modal-container div.jquery-modal-box").css('margin-top',$(window).height()/3);
				$("div.jquery-modal-container div.jquery-modal-box").css('margin-left',$(window).width()/6);
				$("div.jquery-modal-container div.jquery-modal-box").width(0);
				$("div.jquery-modal-container div.jquery-modal-box").height(0);
				$("div.jquery-modal-container").fadeIn(100);
				$("div.jquery-modal-box").animate({width:size/3.5, height:size/3.5, marginTop:($(window).height()-(size/5))/2, marginLeft:($(window).width()-(size/5))/6}, 150);
				$("div.jquery-modal-container div.jquery-modal-box").animate({width:size/5, height:size/5, marginTop:($(window).height()-(size/5))/2, marginLeft:($(window).width()-(size/5))/6}, 250);
				$("div.jquery-modal-container div.jquery-modal-box").animate({width:size, height:size, marginTop:marginTop, marginLeft:marginLeft}, 300, function(){
					checkBrowser();
					$("div.jquery-modal-container div.jquery-modal-box div.jquery-modal-content").animate({opacity:1}, 300);
				});
			}else if(animateIn=='random-pop'){
				var size = $("div.jquery-modal-container div.jquery-modal-box").width();
				var marginTop = $("div.jquery-modal-container div.jquery-modal-box").css('margin-top');
				var marginLeft = $("div.jquery-modal-container div.jquery-modal-box").css('margin-left');
				$("div.jquery-modal-container div.jquery-modal-box").css('margin-top',$(window).height()/3);
				$("div.jquery-modal-container div.jquery-modal-box").css('margin-left',$(window).width()/6);
				$("div.jquery-modal-container div.jquery-modal-box").width(0);
				$("div.jquery-modal-container div.jquery-modal-box").height(0);
				$("div.jquery-modal-container").fadeIn(100);
				// random popout
				var randVal = (Math.random()*200)-100;
				$("div.jquery-modal-container div.jquery-modal-box").animate({width:size/4, height:size/4, marginTop:($(window).height()*randVal)/100, marginLeft:($(window).width()*randVal)/100}, 200);
				var randVal = (Math.random()*200)-100;
				$("div.jquery-modal-container div.jquery-modal-box").animate({width:size/2, height:size/2, marginTop:($(window).height()*randVal)/100, marginLeft:($(window).width()*randVal)/100}, 250);
				$("div.jquery-modal-container div.jquery-modal-box").animate({width:size, height:size, marginTop:marginTop, marginLeft:marginLeft}, 300, function(){
					checkBrowser();
					$("div.jquery-modal-container div.jquery-modal-box div.jquery-modal-content").animate({opacity:1}, 300);
				});
			}
			function checkBrowser(){
				// Detecting IE
				if ((window.navigator.appName == 'Microsoft Internet Explorer') || (!/firefox/i.test(window.navigator.userAgent) && !/chrome/i.test(window.navigator.userAgent))) {
					$('div.jquery-modal-container div.jquery-modal-box div.content').css('position','absolute');
				}
			}
		},
		jquery_modal_close: function(animateOut){
			$(document).keydown(function(e){
				var escapeKey = e.which?e.which:e.keyCode;
				if(escapeKey == 27){
					close()
				}
			})
			// clear any instances of click to avoid multiple click events
			$(document).off('click', 'div.jquery-modal-container div.jquery-modal-close, div.jquery-modal-container div.jquery-modal-bg');
			// activate close for modal on click
			$(document).on('click', 'div.jquery-modal-container div.jquery-modal-close, div.jquery-modal-container div.jquery-modal-bg', function(){
				close();
			})
			function close(){
				var modalID = $('div.jquery-modal-container').attr('id')
				$('div.jquery-modal-container').attr('id','none')
				if(modalID!==false) {
					$("div.modal-"+modalID).html(jquery_modal_tempContent);
					jquery_modal_tempContent = '';
				}
				// removing the modal container
				if(animateOut=='slideFade'){
					$('div.jquery-modal-container div.jquery-modal-box').animate({marginTop:"0"},"fast");
					$('div.jquery-modal-container').fadeOut("fast",function(){
						$(this).remove();
					});
				}else if(animateOut=='pop'){
					var size = $("div.jquery-modal-container div.jquery-modal-box").width();
					$('div.jquery-modal-container div.jquery-modal-box div.jquery-modal-content, div.jquery-modal-container div.jquery-modal-box div.content').animate({opacity:0},'fast');
					$('div.jquery-modal-container div.jquery-modal-box').animate({width:size/5, height:size/5, marginTop:($(window).height()-(size/5))/2, marginLeft:($(window).width()-(size/5))/6}, 250);
					$('div.jquery-modal-container div.jquery-modal-box').animate({width:size/3.5, height:size/3.5, marginTop:($(window).height()-(size/5))/2, marginLeft:($(window).width()-(size/5))/6}, 150, function(){
						$("div.jquery-modal-container").fadeOut(200,function(){
							$(this).remove();
						});
					});
					$('div.jquery-modal-container div.jquery-modal-box').animate({width:0, height:0, marginTop:$(window).height()/3, marginLeft:$(window).width()/6}, 300);
				}else if(animateOut=='random-pop'){
					var size = $('div.jquery-modal-container div.jquery-modal-box').width();
					$('div.jquery-modal-container div.jquery-modal-box div.jquery-modal-content, div.jquery-modal-container div.jquery-modal-box div.content').animate({opacity:0},'fast');
					// random popout
					var randVal = (Math.random()*200)-100;
					$('div.jquery-modal-container div.jquery-modal-box').animate({width:size/4, height:size/4, marginTop:($(window).height()*randVal)/100, marginLeft:($(window).width()*randVal)/100}, 200);
					var randVal = (Math.random()*200)-100;
					$('div.jquery-modal-container div.jquery-modal-box').animate({width:size/2, height:size/2, marginTop:($(window).height()*randVal)/100, marginLeft:($(window).width()*randVal)/100}, 250, function(){
						$("div.jquery-modal-container").fadeOut(200,function(){
							$(this).remove();
						});
					});
					$('div.jquery-modal-container div.jquery-modal-box').animate({width:0, height:0, marginTop:$(window).height()/3, marginLeft:$(window).width()/6, opacity:0}, 300);
				}
			}
		}
	})
})(jQuery)
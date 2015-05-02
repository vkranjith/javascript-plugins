<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Custom Plugin Demo and Test</title>
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" type="text/css" media="screen" />
<link rel="stylesheet" href="jquery-modal/css/jquery-modal-style.css" type="text/css" media="screen" />
<link rel="stylesheet" href="form-validation/form-validation.css" type="text/css" media="screen" />
</head>

<body>
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<h1>JQuery Form Validation - <a href="http://vkranjith.com" title="vkranjith.com">VK Ranjith</a></h1>
			</div>
		</div>
		<br/>
		<br/>
		<br/>
		<div class="row">
			<div class="col-lg-12">
		  		<form name="test-form1" id="test-form1">
		  			<fieldset>
		  				<legend>Regular Style</legend>
		  				<div>
				  			<label for="no-validate">No Validate</label>
				  			<input type="text" name="no-validate" id="no-validate" placeholder="test" class="validate-match3" value="" />
				  		</div>
		  				<div>
				  			<label for="username">Email / Phone</label>
				  			<input type="text" name="username" id="username" placeholder="Your username..." class="validate-match1 validate-required" value="" />
				  		</div>
		  				<div>
				  			<label for="password">Password <span class="important">*</span></label>
				  			<input type="password" name="password" id="password" placeholder="Password" class="validate-required validate-min6 validate-match2" value="" />
				  		</div>
		  				<div>
				  			<label for="re-password">Confirm Password <span class="important">*</span></label>
				  			<input type="password" name="re-password" id="re-password" placeholder="Confirm Password" class="validate-match2" value="" />
				  		</div>
		  				<div class="form-group">
				  			<label for="cyear">Year <span class="important">*</span></label>
							<select name="cyear" id="cyear" class="validate-required">
							<option value="">Year</option>
							<script type="text/javascript">
							var currentYear = new Date().getFullYear();
							for(var i=currentYear; i>(currentYear-100); i--) {
								document.write('<option value="'+i+'">'+i+'</option>');
							}
							</script>
							</select>
				  		</div>
		  				<div>
		  					<button type="submit">Sign In</button>
		  				</div>
		  			</fieldset>
				</form>
			</div>
		</div>
		<br/>
		<br/>
		<br/>
		<div class="row">
			<div class="col-lg-12">
		  		<form action="#" name="test-form2" id="test-form2">
		  			<fieldset>
		  				<legend>Framework Style</legend>
		  				<div class="form-group">
				  			<label for="no-validate" class="control-label">No Validate</label>
				  			<input type="text" name="no-validate" id="no-validate" placeholder="test" class="form-control validate-match3" value="" />
				  		</div>
		  				<div class="form-group">
				  			<label for="alpha2" class="control-label">Text Only</label>
				  			<input type="text" name="alpha2" id="alpha2" placeholder="test" class="form-control validate-required validate-alpha" value="" />
				  			<span class="validation-message-hidden alpha">I accept only alpha.</span>
				  			<span class="validation-message-hidden required">This field is mandatory.</span>
				  		</div>
		  				<div class="form-group">
				  			<label for="number2" class="control-label">Number Only</label>
				  			<input type="text" name="number2" id="number2" placeholder="test" class="form-control validate-number validate-min3 validate-max6" value="" />
				  		</div>
		  				<div class="form-group">
				  			<label for="username" class="control-label">Email / Phone</label>
				  			<input type="text" name="username" id="username" placeholder="Your username..." class="form-control validate-match1" value="" />
				  		</div>
		  				<div class="form-group">
				  			<label for="password" class="control-label">Password <span class="important">*</span></label>
				  			<input type="password" name="password" id="password" placeholder="Password" class="form-control validate-required validate-min6 validate-match2" value="" />
				  			<span class="validation-message-hidden required">Password required.</span>
				  		</div>
		  				<div class="form-group">
				  			<label for="re-password" class="control-label">Confirm Password <span class="important">*</span></label>
				  			<input type="password" name="re-password" id="re-password" placeholder="Confirm Password" class="form-control validate-match2" value="" />
				  		</div>
		  				<div class="form-group">
				  			<label for="cyear" class="control-label"> Year <span class="important">*</span></label>
							<select name="cyear" id="cyear" class="form-control validate-required">
							<option value="">Year</option>
							<script type="text/javascript">
							var currentYear = new Date().getFullYear();
							for(var i=currentYear; i>(currentYear-100); i--) {
								document.write('<option value="'+i+'">'+i+'</option>');
							}
							</script>
							</select>
				  		</div>
		  				<div class="form-group">
		  					<button type="submit" class="btn btn-primary">Sign In</button>
		  					<button type="button" id="addField" class="btn">Add Field</button>
		  				</div>
		  			</fieldset>
				</form>
			</div>
		</div>
		<br/>
		<br/>
		<br/>
		<div class="row">
			<div class="col-lg-12">
				<p>Developer: VK Ranjith | Website: <a href="http://vkranjith.com" title="vkranjith.com">vkranjith.com</a></p>
			</div>
		</div>
	</div>
<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="jquery-modal/js/jquery-modal.js"></script>
<script src="form-validation/form-validation.js" type="text/javascript"></script>
	<script type="text/javascript">
	$(document).ready(function(){
		var field = 0;
		$('#addField').on('click', function(){
			field++;
			$('<div class="form-group"> \
				  			<label for="field'+field+'" class="control-label">Dynamic Field <span class="important">*</span></label> \
				  			<input type="text" name="field'+field+'" id="field'+field+'" placeholder="Dynamic Field" class="form-control validate-required" value="" /> \
				  		</div>').insertBefore($(this).parent());
		})
		$("#test-form1").formValidation({
			ajaxFunc: false,
			border: true,
			inline: true,
			inlineMsg: false,
			errorMsg: {
				minLen: 'Minimum charater length is %d',
				maxLen: 'Maximum charater length is %d',
			},
			backgroundColor: true
		});
		$("#test-form2").formValidation({
			ajaxFunc: true,
			border: true,
			inline: true,
			backgroundColor: true,
			realtime: false,
			inlineMsg: true,
			onFailure: function(data) {
				//on validation failure
				console.log(data);
				for(var i in data) {
					$(document).jquery_modal({
						msg: data[i].message,
						status: data[i].status
					});
				}
			},
			onProgress: function(data) {
				//on ajax call
				console.log(data);
				$(document).jquery_modal({
					msg: data.message,
					status: data.status
				});
			},
			onSuccess: function(data) {
				//on ajax success
				console.log(data);
				$(document).jquery_modal({
					msg: data.message,
					status: data.status
				});
			},
			onError: function(data) {
				//on ajax error
				console.log(data);
				$(document).jquery_modal({
					msg: data.message,
					status: data.status
				});
			}
		});
	})
	</script>
</body>
</html>

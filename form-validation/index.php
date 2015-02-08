<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Custom Plugin Demo and Test</title>
<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
<!-- jquery modal -->
<link rel="stylesheet" href="jquery-modal/css/jquery-modal-style.css" type="text/css" media="screen" />
<script type="text/javascript" src="jquery-modal/js/jquery-modal.js"></script>
<!-- end of modal -->
<!-- form validation -->
<link rel="stylesheet" href="form validation/form-validation.css" type="text/css" media="screen" />
<script src="form validation/form-validation.js" type="text/javascript"></script>
<!-- end of form validation -->
<script type="text/javascript">
jQuery(document).ready(function(){
	jQuery("#test-form1").formValidation({
		ajaxFunc: false,
		border: true,
		inline: true,
		errorMsg: {
			minLen: 'Minimum charater length is %d',
			maxLen: 'Maximum charater length is %d',
		},
		backgroundColor: true
	});
	jQuery("#test-form2").formValidation({
		ajaxFunc: true,
		border: true,
		inline: false,
		backgroundColor: true,
		onFailure: function(data) {
			//on validation failure
			console.log(data);
			for(var i in data) {
				jQuery(document).jquery_modal({
					msg: data[i].message,
					status: data[i].status
				});
			}
		},
		onProgress: function(data) {
			//on ajax call
			console.log(data);
			jQuery(document).jquery_modal({
				msg: data.message,
				status: data.status
			});
		},
		onSuccess: function(data) {
			//on ajax success
			console.log(data);
			jQuery(document).jquery_modal({
				msg: data.message,
				status: data.status
			});
		},
		onError: function(data) {
			//on ajax error
			console.log(data);
			jQuery(document).jquery_modal({
				msg: data.message,
				status: data.status
			});
		}
	});
	jQuery("#test-form3").formValidation({
		ajaxFunc: false,
		border: true,
		inline: true,
		errorSign: 'Error',
		errorMsg: {
			minLen: 'Minimum charater length is %d',
			maxLen: 'Maximum charater length is %d',
		},
		backgroundColor: true
	});
})
</script>
</head>

<body>
  		<form action="" enctype="application/x-www-form-urlencoded" method="post" name="test-form1" id="test-form1" class="" role="registration form">
  			<fieldset>
  				<legend>Sign Up / Register<br/><small>Register with us to avail our services.</small></legend>
  				<div class="form-group">
		  			<label for="no-validate" class="control-label">No Validate</label>
		  			<input type="text" name="no-validate" id="no-validate" placeholder="test" class="validate-match3" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="username" class="control-label">Email / Phone</label>
		  			<input type="text" name="username" id="username" placeholder="Your username..." class="form-control validate-match1 validate-required" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="password" class="control-label">Password <span class="important">*</span></label>
		  			<input type="password" name="password" id="password" placeholder="Password" class="form-control validate-required validate-min6 validate-match2" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="re-password" class="control-label">Confirm Password <span class="important">*</span></label>
		  			<input type="password" name="re-password" id="re-password" placeholder="Confirm Password" class="form-control validate-match2" value="" />
		  		</div>
  				<div class="form-group">
  					<button type="submit" class="btn btn-primary">Sign In</button>
  				</div>
  			</fieldset>
		</form>
  		<form action="" enctype="application/x-www-form-urlencoded" method="post" name="test-form2" id="test-form2" class="" role="registration form">
  			<fieldset>
  				<legend>Sign Up / Register<br/><small>Register with us to avail our services.</small></legend>
  				<div class="form-group">
		  			<label for="no-validate" class="control-label">No Validate</label>
		  			<input type="text" name="no-validate" id="no-validate" placeholder="test" class="validate-match3" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="alpha2" class="control-label">Text Only</label>
		  			<input type="text" name="alpha2" id="alpha2" placeholder="test" class="validate-required validate-alpha" value="" />
		  			<span class="validation-message-hidden alpha">I accept only alpha.</span>
		  			<span class="validation-message-hidden required">I am mandatory.</span>
		  		</div>
  				<div class="form-group">
		  			<label for="number2" class="control-label">Number Only</label>
		  			<input type="text" name="number2" id="number2" placeholder="test" class="validate-number validate-min3 validate-max6" value="" />
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
  					<button type="submit" class="btn btn-primary">Sign In</button>
  				</div>
  			</fieldset>
		</form>
  		<form action="" enctype="application/x-www-form-urlencoded" method="post" name="test-form3" id="test-form3" class="" role="registration form">
  			<fieldset>
  				<legend>Sign Up / Register<br/><small>Register with us to avail our services.</small></legend>
  				<div class="form-group">
		  			<label for="no-validate" class="control-label">No Validate</label>
		  			<input type="text" name="no-validate" id="no-validate" placeholder="test" class="validate-match3" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="username" class="control-label">Email / Phone <span class="important">*</span></label>
		  			<input type="text" name="username" id="username" placeholder="Your username..." class="form-control validate-required" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="password" class="control-label">Password <span class="important">*</span></label>
		  			<input type="password" name="password" id="password" placeholder="Password" class="form-control validate-required validate-min6" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="re-password" class="control-label">Confirm Password <span class="important">*</span></label>
		  			<input type="password" name="re-password" id="re-password" placeholder="Confirm Password" class="form-control validate-required" value="" />
		  		</div>
  			</fieldset>
  			<fieldset>
  				<legend>College Details</legend>
  				<div class="form-group">
		  			<label for="cname" class="control-label">Name of the College <span class="important">*</span></label>
		  			<input type="text" name="cname" id="cname" placeholder="College Name..." class="form-control validate-required validate-max10" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="branch" class="control-label">Branch <span class="important">*</span></label>
		  			<input type="text" name="branch" id="branch" placeholder="Branch..." class="form-control validate-required" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="cyear" class="control-label">Academic Year <span class="important">*</span></label>
					<select name="cyear" id="cyear" class="form-control validate-required">
					<option value="">Academic Year</option>
					<script type="text/javascript">
					var currentYear = new Date().getFullYear();
					for(var i=currentYear; i>(currentYear-100); i--) {
						document.write('<option value="'+i+'">'+i+'</option>');
					}
					</script>
					</select>
		  		</div>
  			</fieldset>
  			<fieldset>
  				<legend>Personal Details</legend>
  				<div class="form-group">
		  			<label for="fullname" class="control-label">Full Name <span class="important">*</span></label>
		  			<input type="text" name="name" id="name" placeholder="Your full Name..." class="form-control validate-required" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="dateofbirth" class="control-label">Date of Birth <span class="important">*</span></label>
					<span class="input-group date" id='dob'>
					  <input name="dateofbirth" type="text" class="form-control validate-required" id="dateofbirth" placeholder="dd-mm-yyyy" data-viewformat="dd-mm-yyyy" >
					</span>
		  		</div>
  				<div class="form-group">
		  			<label for="email" class="control-label">Email <span class="important">*</span></label>
		  			<input type="text" name="email" id="email" placeholder="Your Email..." class="form-control validate-required validate-email" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="phone" class="control-label">Phone Number <span class="important">*</span></label>
		  			<input type="text" name="phone" id="phone" placeholder="Your Phone..." class="form-control validate-required validate-phone" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="address" class="control-label">Address</label>
		  			<input type="text" name="address" id="address" placeholder="Your Address..." class="form-control" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="street" class="control-label">Street Name</label>
		  			<input type="text" name="street" id="street" placeholder="Your street..." class="form-control" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="district" class="control-label">District <span class="important">*</span></label>
		  			<input type="text" name="district" id="district" placeholder="Your district..." class="form-control validate-required" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="state" class="control-label">State <span class="important">*</span></label>
		  			<input type="text" name="state" id="state" placeholder="Your state..." class="form-control validate-required" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="country" class="control-label">Country <span class="important">*</span></label>
		  			<input type="text" name="country" id="country" placeholder="Your country..." class="form-control validate-required" value="" />
		  		</div>
  				<div class="form-group">
		  			<label for="pinzip" class="control-label">PIN / ZIP <span class="important">*</span></label>
		  			<input type="text" name="pin" id="pin" placeholder="Your PIN / ZIP..." class="form-control validate-required" value="" />
		  		</div>
  				<div class="checkbox">
		  			<label>
            	<input type="checkbox" name="newsletter" id="newsletter" /> Would you like to receive email newsletters?
            </label>
  				</div>
  				<div class="form-group">
  					<button type="submit" class="btn btn-primary">Sign In</button>
  					<button type="reset" class="btn btn-default">Reset</button>
  				</div>
  			</fieldset>
  		</form>
</body>
</html>

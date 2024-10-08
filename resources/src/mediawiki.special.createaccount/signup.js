/*!
 * JavaScript for signup form.
 */
const HtmlformChecker = require( './HtmlformChecker.js' );

// When sending password by email, hide the password input fields.
$( () => {
	// Always required if checked, otherwise it depends, so we use the original
	let $emailLabel = $( 'label[for="wpEmail"] .cdx-label__label__text' ),
		originalText = $emailLabel.text(),
		requiredText = mw.msg( 'createacct-emailrequired' ),
		$createByMailCheckbox = $( '#wpCreateaccountMail' ),
		$beforePwds = $( '.mw-row-password' ).first().prev(),
		$pwds;

	function updateForCheckbox() {
		const checked = $createByMailCheckbox.prop( 'checked' );
		if ( checked ) {
			$pwds = $( '.mw-row-password' ).detach();
			// TODO when this uses the optional flag, show/hide that instead of changing the text
			$emailLabel.text( requiredText );
		} else {
			if ( $pwds ) {
				$beforePwds.after( $pwds );
				$pwds = null;
			}
			$emailLabel.text( originalText );
		}
	}

	$createByMailCheckbox.on( 'change', updateForCheckbox );
	updateForCheckbox();
} );

// Check if the username is invalid or already taken; show username normalisation warning
mw.hook( 'htmlform.enhance' ).add( ( $root ) => {
	let $usernameInput = $root.find( '#wpName2' ),
		$passwordInput = $root.find( '#wpPassword2' ),
		$emailInput = $root.find( '#wpEmail' ),
		$realNameInput = $root.find( '#wpRealName' ),
		api = new mw.Api(),
		usernameChecker, passwordChecker;

	function checkUsername( username ) {
		// We could just use .then() if we didn't have to pass on .abort()…
		let d, apiPromise;

		// Leading/trailing/multiple whitespace characters are always stripped in usernames,
		// this should not require a warning. We do warn about underscores.
		username = username.replace( / +/g, ' ' ).trim();

		d = $.Deferred();
		apiPromise = api.get( {
			action: 'query',
			list: 'users',
			ususers: username,
			usprop: 'cancreate',
			formatversion: 2,
			errorformat: 'html',
			errorsuselocal: true,
			uselang: mw.config.get( 'wgUserLanguage' )
		} )
			.done( ( resp ) => {
				const userinfo = resp.query.users[ 0 ];

				if ( resp.query.users.length !== 1 || userinfo.invalid ) {
					d.resolve( { valid: false, messages: [ mw.message( 'noname' ).parseDom() ] } );
				} else if ( userinfo.userid !== undefined ) {
					d.resolve( { valid: false, messages: [ mw.message( 'userexists' ).parseDom() ] } );
				} else if ( !userinfo.cancreate ) {
					d.resolve( {
						valid: false,
						messages: userinfo.cancreateerror ? userinfo.cancreateerror.map( ( m ) => m.html ) : []
					} );
				} else if ( userinfo.name !== username ) {
					d.resolve( { valid: true, messages: [
						mw.message( 'createacct-normalization', username, userinfo.name ).parseDom()
					] } );
				} else {
					d.resolve( { valid: true, messages: [] } );
				}
			} )
			.fail( d.reject );

		return d.promise( { abort: apiPromise.abort } );
	}

	function checkPassword() {
		// We could just use .then() if we didn't have to pass on .abort()…
		let apiPromise,
			d = $.Deferred();

		if ( $usernameInput.val().trim() === '' ) {
			d.resolve( { valid: true, messages: [] } );
			return d.promise();
		}

		apiPromise = api.post( {
			action: 'validatepassword',
			user: $usernameInput.val(),
			password: $passwordInput.val(),
			email: $emailInput.val() || '',
			realname: $realNameInput.val() || '',
			formatversion: 2,
			errorformat: 'html',
			errorsuselocal: true,
			uselang: mw.config.get( 'wgUserLanguage' )
		} )
			.done( ( resp ) => {
				const pwinfo = resp.validatepassword || {};

				d.resolve( {
					valid: pwinfo.validity === 'Good',
					messages: pwinfo.validitymessages ? pwinfo.validitymessages.map( ( m ) => m.html ) : []
				} );
			} )
			.fail( d.reject );

		return d.promise( { abort: apiPromise.abort } );
	}

	usernameChecker = new HtmlformChecker( $usernameInput, checkUsername );
	usernameChecker.attach();

	passwordChecker = new HtmlformChecker( $passwordInput, checkPassword );
	passwordChecker.attach( $usernameInput.add( $emailInput ).add( $realNameInput ) );
} );

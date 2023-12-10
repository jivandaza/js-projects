/*     ******************************     IMPORTS     ******************************     */
import {  showMessageForm, showMessage } from "./messages.js";

/*     ******************************     FUNCTIONS     ******************************     */
export function validateFormPatient( data ) {
    if ( data.names === "" ) {
        showMessageForm( "Name & last name is required", "alert-danger" );
        return false;
    }
    if ( !onlyText( data.names ) ) {
        showMessageForm( "Name & last name does not allow numbers", "alert-danger" );
        return false;
    }
    if ( data.dni === "" ) {
        showMessageForm( "DNI is required", "alert-danger" );
        return false;
    }
    console.log(data.dni);
    if ( !onlyNumber( data.dni ) ) {
        showMessageForm( "DNI does not allow characters", "alert-danger" );
        return false;
    }
    if ( data.phone === "" ) {
        showMessageForm( "Phone is required", "alert-danger" );
        return false;
    }
    if ( !onlyNumber( data.phone ) ) {
        showMessageForm( "Phone does not allow characters", "alert-danger" );
        return false;
    }
    if ( data.address === "" ) {
        showMessageForm( "Address is required", "alert-danger" );
        return false;
    }
    /*if ( validateAddress( data.address ) ) {
        showMessageForm( "Invalid Address city, state 11111-#2222", "alert-danger" );
        return false;
    }*/
    return true;
}

export function validateFormUpdatePatient( data ) {
    if ( data.names === "" ) {
        showMessageForm( "Name & last name is required", "alert-danger" );
        return false;
    }
    if ( !onlyText( data.names ) ) {
        showMessageForm( "Name & last name does not allow numbers", "alert-danger" );
        return false;
    }
    if ( data.phone === "" ) {
        showMessageForm( "Phone is required", "alert-danger" );
        return false;
    }
    if ( !onlyNumber( data.phone ) ) {
        showMessageForm( "Phone does not allow characters", "alert-danger" );
        return false;
    }
    if ( data.address === "" ) {
        showMessageForm( "Address is required", "alert-danger" );
        return false;
    }
    if ( !validateAddress( data.address ) ) {
        showMessageForm( "Invalid Address city, state 11111-#2222", "alert-danger" );
        return false;
    }
    return true;
}

export function validateFormLogin( data ) {
    let result = false;
    if ( data.email === "" ) {
        showMessage("emailHelp", "Email is empty.", "text-danger");
    } else if (!validateEmail(data.email)) {
        showMessage("emailHelp", "Email is incorrect.", "text-danger");
    } else if (data.type === -1) {
        showMessage("emailHelp", "Email does not exist.", "text-danger");
    } else if (data.password.length === 0) {
        showMessage("emailHelp", "The user is your email.", "form-text");
        showMessage("passwordHelp", "Password is empty.", "text-danger");
    } else if (data.password.length < 8) {
        showMessage("emailHelp", "The user is your email.", "form-text");
        showMessage("passwordHelp", "Password must contain 8 or more characters.", "text-danger");
    } else if (!validatePass(data.password)) {
        showMessage("emailHelp", "The user is your email.", "form-text");
        showMessage("passwordHelp", "Password must contain uppercase letters, lowercase letters and numbers.", "text-danger");
    } else {
        showMessage("passwordHelp", "It must contain an uppercase, lowercase and numbers.", "text-danger");
        result = true;
    }
    return result;
}

export function validateFormRegisterUser( data ) {
    let result = false;
    if ( data.email === "" ) {
        showMessage("emailHelpRegister", "Email is empty.", "text-danger");
    } else if (!validateEmail(data.email)) {
        showMessage("emailHelpRegister", "Email is incorrect.", "text-danger");
    } else if (data.type !== 1 && data.type !== 2) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "Select user type.", "text-danger");
    } else if(data.names === "") {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "Name & Last Name is empty.", "text-danger");
    } else if ( !onlyText( data.names ) ) {
        console.log(data.names)
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "Name & last name does not allow numbers.", "text-danger");
    } else if ( data.dni === "" ) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "This is your full name.", "form-text");
        showMessage("dniHelpRegister", "Dni is empty.", "text-danger");
    } else if ( !onlyNumber( data.dni ) ) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "This is your full name.", "form-text");
        showMessage("dniHelpRegister", "DNI does not allow characters.", "text-danger");
    } else if (data.password.length === 0) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "This is your full name.", "form-text");
        showMessage("dniHelpRegister", "This is your dni.", "form-text");
        showMessage("passwordHelpRegister", "Password is empty.", "text-danger");
    } else if (data.password.length < 8) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "This is your full name.", "form-text");
        showMessage("dniHelpRegister", "This is your dni.", "form-text");
        showMessage("passwordHelpRegister", "Password must contain 8 or more characters.", "text-danger");
    } else if (!validatePass(data.password)) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "This is your full name.", "form-text");
        showMessage("dniHelpRegister", "This is your dni.", "form-text");
        showMessage("passwordHelpRegister", "Password must contain uppercase letters, lowercase letters and numbers.", "text-danger");
    } else if (data.passwordConfirm.length === 0) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "This is your full name.", "form-text");
        showMessage("dniHelpRegister", "This is your dni.", "form-text");
        showMessage("passwordHelpRegister", "It must contain an uppercase, lowercase and numbers.", "form-text");
        showMessage("passwordConfirmHelp", "Confirm password is empty.", "text-danger");
    } else if (data.passwordConfirm.length < 8) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "This is your full name.", "form-text");
        showMessage("dniHelpRegister", "This is your dni.", "form-text");
        showMessage("passwordHelpRegister", "It must contain an uppercase, lowercase and numbers.", "form-text");
        showMessage("passwordConfirmHelp", "Confirm password must contain 8 or more characters.", "text-danger");
    } else if (!validatePass(data.passwordConfirm)) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "This is your full name.", "form-text");
        showMessage("dniHelpRegister", "This is your dni.", "form-text");
        showMessage("passwordHelpRegister", "It must contain an uppercase, lowercase and numbers.", "form-text");
        showMessage("passwordConfirmHelp", "Confirm password must contain uppercase letters, lowercase letters and numbers.", "text-danger");
    } else if (data.password !== data.passwordConfirm) {
        showMessage("emailHelpRegister", "The user is your email.", "form-text");
        showMessage("typeHelpRegister", "", "form-text");
        showMessage("nameHelpRegister", "This is your full name.", "form-text");
        showMessage("dniHelpRegister", "This is your dni.", "form-text");
        showMessage("passwordHelpRegister", "It must contain an uppercase, lowercase and numbers.", "form-text");
        showMessage("passwordConfirmHelp", "Passwords must be the same.", "text-danger");
    } else {
        showMessage("passwordConfirmHelp", "It must contain an uppercase, lowercase and numbers.", "form-text");
        result = true   ;
    }
    return result;
}

// Function to validate that it is only text
function onlyText( text ) {
    let state = true;
    text.split( '' ).forEach( element => {
        for (let i = 0; i <= 9; i++) {
            if ( element === i.toString() )  {
                state = false;
            }
        }
    });
    return state;
}

// Function to validate that it is only text
function onlyNumber( text ) {
    let state = true;
    text.toString().split( '' ).forEach( element => {
        switch ( element ){
            case "0": break;
            case "1": break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
            case "8": break;
            case "9": break;
            default: state = false;
        }
    });
    return state;
}

const validateEmail = (email) => {
    let regExp = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    return regExp.test(email);
}

const validatePass = (pass) => {
    let regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
    return pass.match(regExp);
}

const validateAddress = (address) => {
    let regExp = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    return regExp.test(address);
}
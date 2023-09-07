/*     ******************************     VALIDATES     ******************************     */

// validate form inputs before submitting data
export function validateForm( data ) {
    var messageForm = document.getElementById("messageForm");
    if ( data.name === "" ) {
        messageErrorForm( "Name is required" );
        return false;
    }
    if ( !onlyText( data.name ) ) {
        messageErrorForm( "The name does not allow numbers" );
        return false;
    }
    if ( data.age.toString() === "" ) {
        messageErrorForm( "Age is required" );
        return false;
    }
    if ( data.age < 1 ) {
        messageErrorForm( "Age must not be zero or less than zero" );
        return false;
    }
    if ( isDecimal( data.age.toString() ) ) {
        messageErrorForm( "Age does not allow decimal numbers" );
        return false;
    }
    if ( data.address === "" ) {
        messageErrorForm( "Address is required" );
        return false;
    }
    if ( validateAddress( data.address ) ) {
        messageErrorForm( "Invalid Address city, state 11111-#2222" );
        return false;
    }
    if ( data.email === "" ) {
        messageErrorForm( "Email is required" );
        return false;
    }
    if ( !data.email.includes("@") || !data.email.includes(".") ) {
        messageErrorForm( "Invalid email address" );
        return false;
    }
    return true;
}

/*     *******************************************************************************     */

/*     ******************************     MESSAGES     ******************************     */

// Function that displays an error message on the form
export function messageErrorForm( message ) {
    var messageForm = document.getElementById("messageForm");
    messageForm.style.display = "block";
    messageForm.setAttribute( "class", "alert alert-danger mt-3" );
    messageForm.setAttribute( "role", "alert" );
    messageForm.textContent = `${message}`;
    setTimeout(() => {
        messageForm.style.display = "none";
    }, 2000);
}

/*     ******************************************************************************     */

// Function to validate that it is only text
function onlyText( text ) {
    var state = true;
    text.split( '' ).forEach( element => {
        for (let i = 0; i <= 9; i++) {
            if ( element === i.toString() )  {
                state = false;
            }
        }
    });
    return state;
}

// Function to validate that a text contains decimals
function isDecimal( text ) {
    if ( text.includes(".") || text.includes(",") ) {
        return true;
    }
    return false;
}

// Function to validate that a text is an email
function validateAddress( text ) {
    let regExp = /^(?![ -.&,_'":?!/])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!/]{2})[a-zA-Z0-9- .#@&,_'":.?!/]+$/;
    return regExp.test(text);
}


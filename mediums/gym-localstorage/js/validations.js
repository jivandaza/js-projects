/*     ******************************     VALIDATES     ******************************     */

// Validate form inputs before submitting data
export function validateForm( data ) {
    if ( data.task === "" ) {
        messageErrorForm( "Task is required" );
        return false;
    }
    if ( !containsTextLength( data.task, 5 ) ) {
        messageErrorForm( "Task must contain 5 or more characters" );
        return false;
    }
    if ( data.description === "" ) {
        messageErrorForm( "Description is required" );
        return false;
    }
    if ( !containsTextLength( data.description, 8 ) ) {
        messageErrorForm( "Description must contain 8 or more characters" );
        return false;
    }
    return true;
}

/*     *******************************************************************************     */

/*     ******************************     MESSAGES     ******************************     */

// Function that displays an error message on the form
function messageErrorForm( message ) {
    const messageForm = document.getElementById("messageForm");
    messageForm.style.display = "block";
    messageForm.setAttribute( "class", "alert alert-danger mt-3" );
    messageForm.setAttribute( "role", "alert" );
    messageForm.textContent = `${message}`;
    setTimeout(() => {
        messageForm.style.display = "none";
    }, 2000);
}

/*     *******************************************************************************     */

// Function that checks if a text contains x size or more characters
function containsTextLength( text, length ) {
    return (text.length >= length);
}
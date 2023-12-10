let messageForm = document.querySelectorAll(".messageForm");
let messageUI = document.getElementById("messageUI");

/*     ******************************     FUNCTIONS     ******************************     */
export function showMessageForm( message, type ) {
    messageForm.forEach( ( element ) => {
        element.style.display = "block";
        element.setAttribute( "class", `alert ${type} text-center` );
        element.setAttribute( "role", "alert" );
        element.textContent = `${message}`;
        setTimeout(() => {
            element.style.display = "none";
        }, 2000);
    });
}

export function showMessageUI( message, type ) {
    messageUI.style.display = "block";
    messageUI.setAttribute( "class", `alert ${type} text-center` );
    messageUI.setAttribute( "role", "alert" );
    messageUI.textContent = `${message}`;
    setTimeout(() => {
        messageUI.style.display = "none";
    }, 2000);
}

export function showMessageEmailFormLogin ( message, type ) {
    const $messageEmailFailed = document.getElementById("emailHelp");
    if (type === "text-danger") {
        $messageEmailFailed.classList.add("text-danger");
    } else {
        $messageEmailFailed.classList.replace("text-danger", "form-text");
    }
    $messageEmailFailed.textContent = message;
}

export function showMessagePasswordFormLogin ( message, type ) {
    const $messagePasswordFailed = document.getElementById("passwordHelp");
    if (type === "text-danger") {
        $messagePasswordFailed.classList.add("text-danger");
    } else {
        $messagePasswordFailed.classList.replace("text-danger", "form-text");
    }
    $messagePasswordFailed.textContent = message;
}

export function showMessage(input, message, type) {
    const $messageInput = document.getElementById(input);
    if (type === "text-danger") {
        $messageInput.classList.add("text-danger");
    } else {
        $messageInput.classList.replace("text-danger", "form-text");
    }
    $messageInput.textContent = message;
}

/*     ******************************************************************************     */
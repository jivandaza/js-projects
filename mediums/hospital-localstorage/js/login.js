import User from './user.js';

let user = new User();

export function loadLogin() {
    const $btnLogin = document.getElementById("btnLogin");

    $btnLogin.addEventListener("click", () => {
        if (user.loginUser(getDataLogin(), showLoader)) {
            clearInputsLogin();
        }
    });
}

export const getDataLogin = () => {
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const id = user.getIdUser(email);
    const type = user.getTypeUser(email);

    return {
        id,
        type,
        email,
        password
    }
}

const clearInputsLogin = () => {
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPassword").value = "";
}

const showLoader = () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = "block";
    }, 2000);
}
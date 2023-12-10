import User from './user.js';
import {loadLogin} from './login.js';

const $btnRegister = document.getElementById("btnRegister");
let user = new User();

document.addEventListener("DOMContentLoaded", () => {
    loadLogin(user);
});

$btnRegister.addEventListener("click", () => {
    if (user.registerUser(getUser())) {
        clearInputRegister();
    }
});

const getUser = () => {
    const id = user.getUserListLocalStorage().length;
    const email = document.getElementById("inputEmailRegister").value;
    const type = parseInt(document.getElementById("inputSelectType").value);
    const names = document.getElementById("inputName&Last").value;
    const dni = document.getElementById("inputDni").value;
    const password = document.getElementById("inputPasswordRegister").value;
    const passwordConfirm = document.getElementById("inputPasswordConfirm").value;

    return {
        id,
        type,
        email,
        names,
        dni,
        password,
        passwordConfirm
    }
}

const clearInputRegister = () => {
    document.getElementById("inputEmailRegister").value = "";
    document.getElementById("inputSelectType").value = "Open this select menu";
    document.getElementById("inputName&Last").value = "";
    document.getElementById("inputDni").value = "";
    document.getElementById("inputPasswordRegister").value = "";
    document.getElementById("inputPasswordConfirm").value = "";
}


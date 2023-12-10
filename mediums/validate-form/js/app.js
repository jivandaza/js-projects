// evento al cargar la pagina
window.addEventListener("load", () => {
    // Referencia de los elementos del formulario
    const $form = document.querySelector('#form-validation');
    const $userName = document.getElementById('userName');
    const $userEmail = document.getElementById('userEmail');
    const $userPass = document.getElementById('userPass');
    const $userPassConfirm = document.getElementById('userPassConfirm');

    // evento submit del formulario
    $form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (validateInputs()) {
            alert('Save Data');
        }
    });

    // metodo para validar los campos del formulario
    const validateInputs = () => {
        const userName = $userName.value.trim().toLowerCase();
        const userEmail = $userEmail.value.trim().toLowerCase();
        const userPass = $userPass.value.trim();
        const userPassConfirm = $userPassConfirm.value.trim();
        let result = true;

        // Validando campo UserName
        if (!userName) {
            validateFail($userName, 'User Name empty');
            result = false;
        } else if (!validateName(userName)) {
            validateFail($userName, 'User Name does not allow white space or');
            result = false;
        } else {
            validateOk($userName);
        }

        // validando campo UserEmail
        if (!userEmail) {
            validateFail($userEmail, 'User Email empty');
            result = false;
        } else if (!validateEmail(userEmail)) {
            validateFail($userEmail, 'User Email no valid');
            result = false;
        } else {
            validateOk($userEmail);
        }

        // validando campo UserPass
        if (!userPass) {
            validateFail($userPass, 'User Password empty');
            result = false;
        } else if (userPass.length < 8) {
            validateFail($userPass, 'Must contain at least 8 characters');
            result = false;
        } else if (!validatePass(userPass)) {
            validateFail($userPass, 'Must contain at least one letter may, min and a number');
            result = false;
        } else {
            validateOk($userPass);
        }

        // validando campo UserPassConfirm
        if (!userPassConfirm) {
            validateFail($userPassConfirm, 'User Confirm Password empty');
            result = false;
        }else if (userPass !== userPassConfirm) {
            validateFail($userPassConfirm, 'Passwords do not match');
            result = false;
        } else {
            validateOk($userPassConfirm);
        }

        return result;
    }

    // Metodo para cambiar la clase a fallido de un input del formulario y mostrar un mensaje
    const validateFail = ($input,message) => {
        const $formControl = $input.parentElement;
        const $messageWarning = $formControl.querySelector('p');
        $messageWarning.innerText = message;

        $formControl.className = "form-control fail";
    }

    // metodo que valida si los campos son llenados correctamente
    const validateOk = ($input) => {
        const $formControl = $input.parentElement;

        $formControl.className = "form-control ok";
    }

    // funcion que retorna true si el email del usuario es valido
    const validateEmail = (email) => {
        let regExp = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
        return regExp.test(email);
    }

    // funcion que retorna true si el nombre de usuario es valido
    const validateName = (name) => {
        const regExp = /^[a-zA-Z0-9]+$/;
        return regExp.test(name);
    }

    // funcion que valida si el password minimo contiene una letra mayuscula, minuscula y un numero
    const validatePass = (pass) => {
        let regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
        return pass.match(regExp);
    }
});
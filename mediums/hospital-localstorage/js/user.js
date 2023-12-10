import {validateFormLogin, validateFormRegisterUser} from './validations.js';
import {showMessage} from './messages.js'

export default class User {
    constructor() {
        if (this.getUserListLocalStorage() === null) {
            let user = {
                id: 0,
                type: 0,
                email: "admin@gmail.com",
                password: "Admin123"
            };
            this.setUserListLocalStorage(user);
        }
        this.id = null;
        this.type = null;
        this.names = null;
        this.dni = null;
        this.phone = null;
        this.address = null;
        this.state = null;
        this.email = null;
        this.password = null;
    }

    getUserListLocalStorage() {
        let users = JSON.parse( localStorage.getItem("userList") );
        if (users === null) {
            return null;
        } else {
            return users;
        }
    }

    setUserListLocalStorage(user) {
        let users = this.getUserListLocalStorage();
        if (users === null) {
            users = [];
            users.push( user );
            localStorage.setItem( "userList", JSON.stringify(users) );
        } else {
            users.push( user );
            localStorage.setItem( "userList", JSON.stringify(users) );
        }
    }

    getUserLocalStorage() {
        return JSON.parse( localStorage.getItem("user") );
    }

    setUserLocalStorage(user) {
        let data = {
            id: user.id,
            type: user.type,
            email: user.email,
            names: user.names,
            state: user.state
        }
        localStorage.setItem( "user", JSON.stringify(data) );
    }

    getUserTypeLocalStorage(type) {
        let data = [];
        switch (type) {
            case 1:
                data = JSON.parse( localStorage.getItem("doctorList") );
                break;
            case 2:
                data = JSON.parse( localStorage.getItem("patientList") );
                break;
        }
        if ( data === null ) {
            data = [];
        }
        return data;
    }

    setUserTypeLocalStorage(user) {
        const data = {
            id: this.getUserTypeLocalStorage(user.type).length,
            email: user.email,
            names: user.names,
            dni: user.dni,
            phone: "",
            address: "",
            state: true
        }
        switch (user.type) {
            case 1:
                let doctorList = this.getUserTypeLocalStorage(user.type);
                doctorList.push( data );
                localStorage.setItem( "doctorList", JSON.stringify(doctorList) );
                break;
            case 2:
                let patientList = this.getUserTypeLocalStorage(user.type);
                patientList.push( data );
                localStorage.setItem( "patientList", JSON.stringify(patientList) );
                break;
        }
    }

    signOff() {
        localStorage.setItem( "user", null );
        window.location.href = "./../../index.html";
    }

    getTypeUser(email) {
        let result = -1;
        this.getUserListLocalStorage().forEach((item) => {
           if (item.email === email) {
               result = item.type;
           }
        });
        return result;
    }

    getIdUser(email) {
        let result = -1;
        this.getUserListLocalStorage().forEach((item) => {
            if (item.email === email) {
                result = item.id;
            }
        });
        return result;
    }

    getIndexForEmail(email) {
        let userList = this.getUserListLocalStorage();
        let i = 0;
        userList.forEach( ( element, index ) => {
            if ( element.email === email ) {
                i = index;
            }
        });
        return i;
    }

    validateUserLogin(user) {
        let result = false
        this.getUserListLocalStorage().forEach((item) => {
            if (item.email === user.email && item.password === user.password) {
                result = true;
            }
        });
        return result;
    }

    loginUser(user, showLoader) {
        if (validateFormLogin(user)) {
            if (this.validateUserLogin(user)) {
                showMessage("passwordHelp", "It must contain an uppercase, lowercase and numbers.", "form-text");
                showLoader();
                this.setUserLocalStorage(user);
                this.redirectionPageAccess(user.type);
                return true;
            } else {
                showMessage("passwordHelp", "Password is incorrect.", "text-danger");
            }
        }
        return false;
    }

    registerUser(user) {
        let result = false;
        if (validateFormRegisterUser(user)) {
            if (this.getTypeUser(user.email) === -1) {
                this.setUserListLocalStorage(user);
                this.setUserTypeLocalStorage(user);
                this.setUserLocalStorage(user);
                showMessage("passwordConfirmHelp", "It must contain an uppercase, lowercase and numbers.", "form-text");
                this.redirectionPageAccess(user.type);
                result = true;
            } else {
                showMessage("emailHelpRegister", "The user is your email.", "form-text");
                showMessage("typeHelpRegister", "", "form-text");
                showMessage("passwordHelpRegister", "It must contain an uppercase, lowercase and numbers.", "form-text");
                showMessage("passwordConfirmHelp", "It must contain an uppercase, lowercase and numbers.", "form-text");
                showMessage("emailHelpRegister", "Email is exist.", "text-danger");
            }
        }
        return result;
    }

    updateUserLocalStorage(user) {
        const userList = this.getUserListLocalStorage();
        let index = this.getIndexForEmail( user.email );
        userList[index].names = user.names;
        userList[index].phone = user.phone;
        userList[index].address = user.address;
        userList[index].state = user.state;
    }

    redirectionPageAccess(type) {
        setTimeout(() => {
            switch (type) {
                case 0: window.location.href = "./recourses/views/admin.html";
                    break;
                case 1: window.location.href = "./recourses/views/doctor.html";
                    break;
                case 2: window.location.href = "./recourses/views/patient.html";
                    break;
            }
        }, 4000);
    }

    redirectionPage(type) {
        setTimeout(() => {
            switch (type) {
                case 0: window.location.href = "./admin.html";
                    break;
                case 1: window.location.href = "./doctor.html";
                    break;
                case 2: window.location.href = "./patient.html";
                    break;
            }
        }, 4000);
    }
}
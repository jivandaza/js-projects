// Function to check if a person exists
export function existPatient( dni, patientList ) {
    let state = false;
    patientList.forEach( element => {
        if ( element.dni === dni ) {
            state = true;
        }
    });
    return state;
}

export function existUser(email, userList) {
    let state = false;
    userList.forEach( element => {
        if ( element.email === email ) {
            state = true;
        }
    });
    return state;
}
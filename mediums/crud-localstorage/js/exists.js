// Function to check if a person exists
export function existPeople( email, listPeople ) {
    var state = false;
    listPeople.forEach( element => {
       if ( element.email === email ) {
           state = true;
       }
    });
    return state;
}
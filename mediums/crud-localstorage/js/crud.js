/*     ******************************     IMPORTS     ******************************     */

import { validateForm, messageErrorForm } from "./validations.js";
import { existPeople } from "./exists.js";

/*     *****************************************************************************     */

/*     ******************************     GLOBAL VARIABLES     ******************************     */

const addBtnForm = document.getElementById("Submit");
const updateBtnForm = document.getElementById("Update");

/*     **************************************************************************************     */

/*     ******************************     EVENTS     ******************************     */

// Click event of the submit button of the form
addBtnForm.addEventListener("click", ( ) => {
    console.log( getPeopleForm() );
    savePeople( getPeopleForm() );
});

// Click event of the update button of the form
updateBtnForm.addEventListener("click", ( ) => {
    updatePeople( getPeopleForm() );
});

/*     *****************************************************************************     */

/*     ******************************     GET METHODS     ******************************     */

// Function to get form data
function getPeopleForm() {
    const name = firstCapitalLetterOfText(document.getElementById("name").value);
    const age = document.getElementById("age").value;
    const address = firstCapitalLetterOfText(document.getElementById("address").value);
    const email = document.getElementById("email").value;

    return {
        name,
        age,
        address,
        email
    }
}

// function to get a list of people data from the form
const getPeopleList = () => {
    let peopleList;
    if ( localStorage.getItem("peopleList") === null ) {
        peopleList = [];
    } else {
        peopleList = JSON.parse( localStorage.getItem("peopleList") );
    }
    return peopleList;
}

// Function to get index of list of data using mail
const getDataListIndex = ( email ) => {
    let i = 0;
    let peopleList = getPeopleList();
    peopleList.forEach( ( element, index ) => {
        if ( element.email === email ){
            i = index;
        }
    });
    return i;
}

// Function to get email from data list using index
const getEmail = ( i ) => {
    let email = "";
    let peopleList = getPeopleList();
    peopleList.forEach( ( element, index ) => {
        if ( i === index ){
            email = element.email;
        }
    });
    return email;
}

/*     *********************************************************************************     */

/*     ******************************     CRUD PEOPLE     ******************************     */

// function to save people
function savePeople( data ) {
    // if form is validate
    if ( validateForm( data ) ) {
        if ( existPeople( data.email, getPeopleList() ) ) {
            messageErrorForm( `The ${data.email} already exists` );
        } else {
            let peopleList = getPeopleList();
            peopleList.push( data );
            saveDataLocalStorage( peopleList, data.email );
            showTablePeopleUI();
            clearFormFields();
        }
    }
}

// function to update people
function updatePeople( data ) {
    // if form is validate
    if ( validateForm( data ) ) {
        document.getElementById("titleForm").textContent = "Add People";
        updateDataLocalStorage( getPeopleList(), data.email );
        showTablePeopleUI();
        clearFormFields();
        document.getElementById("Update").style.display = "none";
        document.getElementById("Submit").style.display = "inline-block";
        document.getElementById("email").disabled = false;
    }
}

// function to delete people
function deletePeople( index ) {
    let peopleList = getPeopleList();
    peopleList.splice( index, 1 );
    deleteDataLocalStorage( peopleList, getEmail(index) );
    showTablePeopleUI();
}

/*     *********************************************************************************     */

/*     ******************************     LOCAL STORAGE     ******************************     */

// function to save data from local storage
function saveDataLocalStorage( peopleList, email ) {
    localStorage.setItem( "peopleList", JSON.stringify(peopleList) );
    messageSuccessForm( `${email} save in local storage` );
}

// function to update data from local storage
function updateDataLocalStorage( peopleList, email ) {
    let index = getDataListIndex(email);
    peopleList[index].name = document.getElementById("name").value;
    peopleList[index].age = document.getElementById("age").value;
    peopleList[index].address = document.getElementById("address").value;
    peopleList[index].email = document.getElementById("email").value;
    localStorage.setItem( "peopleList", JSON.stringify(peopleList) );
    messageInfoForm( `${email} update in local storage` );
}

// function to delete data from local storage
function deleteDataLocalStorage( peopleList, email ) {
    localStorage.setItem( "peopleList", JSON.stringify(peopleList) );
    messageInfoForm( `${email} delete in local storage` );
}

/*     ***********************************************************************************     */

/*     ******************************     TABLE PEOPLE UI     ******************************     */

// Function to create a row of data in the tables
const createRowTable = () => {
    let rowTable = "";
    getPeopleList().forEach((element, index) => {
        rowTable += "<tr>";
        rowTable += "<td>" + element.name + "</td>";
        rowTable += "<td>" + element.age + "</td>";
        rowTable += "<td>" + element.address + "</td>";
        rowTable += "<td>" + element.email + "</td>";
        rowTable += `
            <td>
                <div class="container">
                    <div class="row">
                        <div class="d-flex justify-content-center align-items-center">
                            <button id="${index}" class="btn btn-danger me-2 ms-2 deleteBtn">Delete</button>
                            <button id="${index}" class="btn btn-warning updateBtn">Edit</button>
                        </div>
                    </div>
                </div>
            </td>
        `;
        rowTable += "<tr>";
    });
    return rowTable;
}

// function to show data in table form
export function showTablePeopleUI() {
    let tableUI = document.getElementById("crudTable");
    let tbodyUI = document.querySelector("#crudTable tbody");
    if ( getPeopleList().length === 0 ) {
        tbodyUI.innerHTML = "";
        tableUI.parentElement.innerHTML += "<p class='text-center'>There are no people to show in the table...</p>";
    } else {
        tableUI.parentElement.children[1].innerHTML = ""
        tbodyUI.innerHTML = createRowTable();
        let deleteBtn = document.querySelectorAll( ".deleteBtn" );
        let updateBtn = document.querySelectorAll( ".updateBtn" );
        deleteBtn.forEach( (element, index) => {
            element.addEventListener( "click", () => {
                deletePeople( index );
            });
        });
        updateBtn.forEach( (element, index) => {
            element.addEventListener( "click", () => {
                document.getElementById("titleForm").textContent = "Update People";
                document.getElementById("email").disabled = true;
                showUpdateBtn( index );
                loadDataForm( getPeopleList(), index );
            });
        });
    }
}

/*     *************************************************************************************     */

/*     ******************************     FORM METHODS     ******************************     */

// function to load data into the form
function loadDataForm( peopleList, index ) {
    document.getElementById( "name" ).value = peopleList[index].name;
    document.getElementById( "age" ).value = peopleList[index].age;
    document.getElementById( "address" ).value = peopleList[index].address;
    document.getElementById( "email" ).value = peopleList[index].email;
}

// function to clear form fields
function clearFormFields() {
    document.getElementById( "name" ).value = "";
    document.getElementById( "age" ).value = "";
    document.getElementById( "address" ).value = "";
    document.getElementById( "email" ).value = "";
}

// function to show update button
function showUpdateBtn( index ) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "inline-block";
}

/*     **********************************************************************************     */

/*     ******************************     MESSAGES     ******************************     */

// Function that displays an information message in the form
function messageInfoForm( message ) {
    let messageForm = document.getElementById("messageForm");
    messageForm.style.display = "block";
    messageForm.setAttribute( "class", "alert alert-primary mt-3" );
    messageForm.setAttribute( "role", "alert" );
    messageForm.textContent = `${message}`;
    setTimeout(() => {
        messageForm.style.display = "none";
    }, 2000);
}

// Function that displays a success message on the form.
function messageSuccessForm( message ) {
    let messageForm = document.getElementById("messageForm");
    messageForm.style.display = "block";
    messageForm.setAttribute( "class", "alert alert-success mt-3" );
    messageForm.setAttribute( "role", "alert" );
    messageForm.textContent = `${message}`;
    setTimeout(() => {
        messageForm.style.display = "none";
    }, 2000);
}

/*     ******************************************************************************     */

/*     ******************************     OTHERS METHODS     ******************************     */

// Function to convert the first letter of a text to uppercase
function firstCapitalLetterOfText( text ) {
    let result = "";
    for ( let i = 0; i < text.length; i++ ) {
        if ( i === 0 ) {
            result += text[i].toUpperCase();
        } else {
            result += text[i];
        }
    }
    return result;
}

/*     ************************************************************************************     */
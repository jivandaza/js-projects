/*     ******************************     IMPORTS     ******************************     */

import {validateFormPatient, validateFormUpdatePatient} from "./validations.js";
import { showMessageForm, showMessageUI } from "./messages.js";
import {existPatient, existUser} from "./exists.js";
import User from './../js/user.js';

const user = new User();

/*     *****************************************************************************     */

/*     ******************************     GLOBAL VARIABLES     ******************************     */

const patientBodyTableUI  = document.querySelector("#patientTable tbody");
const savePatientBtn = document.getElementById("savePatientBtn");
const saveChangesBtn = document.getElementById("saveChangesBtn");
const updateChangesBtn  = document.getElementById("updateChangesBtn");

/*     **************************************************************************************     */

/*     ******************************     EVENTS     ******************************     */

// Click event of the submit button of the form
savePatientBtn.addEventListener("click", ( ) => {
    document.getElementById("inputID").value = getPatientIndex();
});

saveChangesBtn.addEventListener("click",  ( ) => {
    savePatient( getPatient() );
});

updateChangesBtn.addEventListener("click",  ( ) => {
    updatePatient( getUpdatePatient() );
});

document.addEventListener("DOMContentLoaded", () => {
    showTablePatientUI();
});

/*     *****************************************************************************     */

/*     ******************************     GET METHODS     ******************************     */

// Function to get form data
function getPatient() {
    const id = getPatientIndex();
    const email = document.getElementById("inputEmail").value;
    const names = firstCapitalLetterOfText(document.getElementById("inputNames").value);
    const dni = document.getElementById("inputDNI").value;
    const phone = document.getElementById("inputPhone").value;
    const address = firstCapitalLetterOfText(document.getElementById("inputAddress").value);
    const state = document.getElementById("selectState").value === "1";

    return {
        id,
        email,
        names,
        dni,
        phone,
        address,
        state
    }
}

function getUpdatePatient() {
    const names = firstCapitalLetterOfText(document.getElementById("inputUpdateNames").value);
    const phone = document.getElementById("inputUpdatePhone").value;
    const address = firstCapitalLetterOfText(document.getElementById("inputUpdateAddress").value);
    const state = document.getElementById("selectUpdateState").value === "1";

    return {
        names,
        phone,
        address,
        state
    }
}

function getUser(patient) {
    const id = user.getUserListLocalStorage().length;
    const type = 2;
    const email = patient.email;
    const names = patient.names;
    const dni = patient.dni;
    const phone = patient.phone;
    const address = patient.address;
    const state = patient.state;
    const password = "";

    return {
        id,
        type,
        email,
        names,
        dni,
        phone,
        address,
        state,
        password
    }
}

const getPatientListLocalStorage = () => {
    let patientList = [];
    if ( localStorage.getItem("patientList") !== null ) {
        patientList = JSON.parse( localStorage.getItem("patientList") );
    }
    return patientList;
}

function getPatientIndex( dni = undefined ) {
    let patientList = getPatientListLocalStorage();
    if ( patientList.length === 0 ) {
        return 0;
    } else {
        return patientList.length;
    }
}

function getPatientIndexDNI( dni ) {
    let patientList = getPatientListLocalStorage();
    let i = 0;
    patientList.forEach( ( element, index ) => {
        if ( element.dni === dni ) {
            i = index;
        }
    });
    return i;
}

// Function to get email from data list using index
function getNames( i ) {
    let names = "";
    let patientList = getPatientListLocalStorage();
    patientList.forEach( ( element, index ) => {
        if ( i === index ){
            names = element.names;
        }
    });
    return names;
}

function getStateName( state ) {
    return state ? "Active" : "Inactive";
}

/*     *********************************************************************************     */

/*     ******************************     CRUD PATIENT     ******************************     */

// function to save patient
function savePatient( patient ) {
    // if form is validate
    if ( validateFormPatient( patient ) ) {
        if ( existPatient( patient.dni, getPatientListLocalStorage() ) ) {
            showMessageForm( `The DNI ${patient.dni} already exists`, "alert-danger" );
        } else if (existUser(patient.email, user.getUserListLocalStorage())) {
            showMessageForm( `The USER ${patient.email} already exists`, "alert-danger" );
        } else {
            savePatientLocalStorage( patient );
            user.setUserListLocalStorage(getUser(patient));
            showTablePatientUI();
            clearFormFields();
        }
    }
}
// function to update patient
function updatePatient( patient ) {
    // if form is validate
    if ( validateFormUpdatePatient( patient ) ) {
        updatePatientLocalStorage( patient );
        user.updateUserLocalStorage( patient );
        showTablePatientUI();
        clearFormFields();
    }
}

// function to delete people
function deletePatient( index ) {
    let patientList = getPatientListLocalStorage();
    patientList.splice( index, 1 );
    deleteDataLocalStorage( patientList, getNames(index) );
    showTablePatientUI();
}

/*     *********************************************************************************     */

/*     ******************************     LOCAL STORAGE     ******************************     */

// function to save data from local storage
function savePatientLocalStorage( patient ) {
    let patientList = getPatientListLocalStorage();
    patientList.push( patient );
    localStorage.setItem( "patientList", JSON.stringify(patientList) );
    showMessageForm( `${patient.name} save in local storage`, "alert-success" );
}

// function to delete data from local storage
function deleteDataLocalStorage( patientList, names ) {
    localStorage.setItem( "patientList", JSON.stringify(patientList) );
    showMessageUI( `${names} delete in local storage`, "alert-danger" );
}

// function to update data from local storage
function updatePatientLocalStorage( patient ) {
    const patientList = getPatientListLocalStorage();
    let index = getPatientIndexDNI( patient.dni );
    patientList[index].names = document.getElementById("inputUpdateNames").value;
    patientList[index].phone = document.getElementById("inputUpdatePhone").value;
    patientList[index].address = document.getElementById("inputUpdateAddress").value;
    patientList[index].state = document.getElementById("selectUpdateState").value === "1";
    localStorage.setItem( "patientList", JSON.stringify(patientList) );
    showMessageForm( `${patientList[index].names} update in local storage`, "alert-primary" );
}

/*     ***********************************************************************************     */

/*     ******************************     TABLE PEOPLE UI     ******************************     */

// function to show data in table patient
export function showTablePatientUI() {
    if ( getPatientListLocalStorage().length === 0 ) {
        patientBodyTableUI.innerHTML = "";
        document.getElementById("resultFound").style.display = "block";
        /*const newMessage = document.createElement("p");
        const newContent = document.createTextNode("There are no patient to show...");
        newMessage.setAttribute("class", "text-center");
        newMessage.setAttribute("id", "messageTable");
        newMessage.appendChild(newContent);
        patientTableUI.parentElement.insertBefore(newMessage, patientTableUI.nextSibling);*/
    } else {
        document.getElementById("resultFound").style.display = "none";
        patientBodyTableUI.innerHTML = createRowTable();
        let deleteBtn = document.querySelectorAll( ".deleteBtn" );
        let updateBtn = document.querySelectorAll( ".updateBtn" );
        deleteBtn.forEach( (element, index) => {
            element.addEventListener( "click", () => {
                deletePatient( index );
            });
        });
        updateBtn.forEach( (element, index) => {
            element.addEventListener( "click", () => {
                loadDataForm( getPatientListLocalStorage(), index );
            });
        });
    }
}

// Function to create a row of data in the tables
const createRowTable = () => {
    let rowTable = "";
    const patientList = getPatientListLocalStorage();
    patientList.forEach((element) => {
        rowTable += "<tr class='text-center'>";
        rowTable += "<td>" + element.id + "</td>";
        rowTable += "<td>" + element.email + "</td>";
        rowTable += "<td>" + element.names + "</td>";
        rowTable += "<td>" + element.dni + "</td>";
        rowTable += "<td>" + element.phone + "</td>";
        rowTable += "<td>" + element.address + "</td>";
        rowTable += "<td>" + getStateName( element.state ) + "</td>";
        rowTable += `
            <td>
                <div class="container">
                    <div class="row">
                        <div class="d-flex justify-content-center align-items-center">
                            <button type="button" id="${element.id}" class="btn btn-danger me-2 ms-2 deleteBtn">Delete</button>
                            <button id="${element.id}" class="btn btn-warning updateBtn" data-bs-toggle="modal" data-bs-target="#updateModal">Edit</button>
                        </div>
                    </div>
                </div>
            </td>
        `;
        rowTable += "<tr>";
    });
    return rowTable;
}

/*     *************************************************************************************     */

/*     ******************************     FORM METHODS     ******************************     */

// function to load data into the form
function loadDataForm( patientList, index ) {
    document.getElementById( "inputUpdateID" ).value = index.toString();
    document.getElementById( "inputUpdateEmail" ).value = patientList[index].email;
    document.getElementById( "inputUpdateNames" ).value = patientList[index].names;
    document.getElementById( "inputUpdateDNI" ).value = patientList[index].dni;
    document.getElementById( "inputUpdatePhone" ).value = patientList[index].phone;
    document.getElementById( "inputUpdateAddress" ).value = patientList[index].address;
    if ( patientList[index].state ) {
        document.getElementById( "selectUpdateState" ).innerHTML = `
            <option value="1" selected>Active</option>
            <option value="0">Inactive</option>
        `;
    } else {
        document.getElementById( "selectUpdateState" ).innerHTML = `
            <option value="1">Active</option>
            <option value="0" selected>Inactive</option>
        `;
    }
    //document.getElementById( "selectUpdateState" ).value = getStateName(patientList[index].state);
}

// function to clear form fields
function clearFormFields() {
    document.getElementById( "inputID" ).value = getPatientIndex().toString();
    document.getElementById( "inputNames" ).value = "";
    document.getElementById( "inputDNI" ).value = "";
    document.getElementById( "inputPhone" ).value = "";
    document.getElementById( "inputAddress" ).value = "";
    document.getElementById( "selectState" ).innerHTML = `
        <option value="1" selected>Active</option>
        <option value="0">Inactive</option>
    `;
}

// function to show update button
/*function showUpdateBtn( index ) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "inline-block";
}*/

/*     **********************************************************************************     */

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
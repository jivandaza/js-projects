/*     ******************************     IMPORTS     ******************************     */

import User from './../js/user.js';
import {showTablePatientUI} from './patient.js';

const user = new User();

/*     *****************************************************************************     */

if (user.getUserLocalStorage() == null) {
    user.signOff();
} else if (user.getUserLocalStorage().type !== 0) {
    user.redirectionPage(user.getUserLocalStorage().type)
}

/*     ******************************     GLOBAL VARIABLES     ******************************     */

const links = document.querySelectorAll("#navbarNav .nav-link");
const btnSignOff  = document.getElementById("sign-off");
const contentMain = document.getElementById("content-main");

/*     **************************************************************************************     */

/*     ******************************     EVENTS     ******************************     */

document.addEventListener("DOMContentLoaded", () => {
    showTablePatientUI();
})

// Click event of the submit button of the form
btnSignOff.addEventListener("click", () => {
    console.log("click")
    user.signOff();
});

links.forEach((link, index) => {
   link.addEventListener("click", (e) => {
       e.preventDefault();
       switch (index) {
           case 0: printPatient();
               break;
           case 1: printDoctor();
               break;
           case 2: console.log("Medicine");
               break;
       }
   });
});

function printDoctor() {
    contentMain.innerHTML = `
        <h1 class="text-center text-primary">Show Doctors</h1>
        <div class="row mt-4" id="formButtons">
            <button
                class="btn btn-success m-2 d-flex align-items-center justify-content-center"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#saveDoctorModal"
                id="saveDoctorBtn"
            >
                <span class="material-symbols-outlined">
                    add
                </span>
            </button>
            <button 
                class="btn btn-primary m-2 d-flex align-items-center justify-content-center"
                type="button" 
            >
                <span class="material-symbols-outlined">
                    search
                </span>
            </button>
        </div>
        <div class="my-3">
            <div id="messageUI"></div>
        </div>
        <div class="row mt-4">
            <table class="table table-bordered table-primary" id="doctorTable">
                <thead class="text-center">
                    <tr class="text-primary">
                        <td class="text-secondary">Id Dcotor</td>
                        <td class="text-secondary">Email</td>
                        <td class="text-secondary">Name & Last Name</td>
                        <td class="text-secondary">DNI</td>
                        <td class="text-secondary">Phone</td>
                        <td class="text-secondary">Address</td>
                        <td class="text-secondary">State</td>
                        <td class="text-secondary">Actions</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <p id="resultFound" class="text-center">There are no patient to show...</p>
        </div>
    `;
}

function printPatient() {
    contentMain.innerHTML = `
        <h1 class="text-center text-primary">Show Patients</h1>
        <div class="row mt-4" id="formButtons">
            <button
                class="btn btn-success m-2 d-flex align-items-center justify-content-center"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#saveModal"
                id="savePatientBtn"
            >
                <span class="material-symbols-outlined">
                    add
                </span>
            </button>
            <button 
                class="btn btn-primary m-2 d-flex align-items-center justify-content-center"
                type="button" 
            >
                <span class="material-symbols-outlined">
                    search
                </span>
            </button>
        </div>
        <div class="my-3">
            <div id="messageUI"></div>
        </div>
        <div class="row mt-4">
            <table class="table table-bordered table-primary" id="patientTable">
                <thead class="text-center">
                    <tr class="text-primary">
                        <td class="text-secondary">Id Patient</td>
                        <td class="text-secondary">Email</td>
                        <td class="text-secondary">Name & Last Name</td>
                        <td class="text-secondary">DNI</td>
                        <td class="text-secondary">Phone</td>
                        <td class="text-secondary">Address</td>
                        <td class="text-secondary">State</td>
                        <td class="text-secondary">Actions</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <p id="resultFound" class="text-center">There are no patient to show...</p>
        </div>
    `;
}

/*     *****************************************************************************     */
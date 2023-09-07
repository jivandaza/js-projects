/*     ******************************     IMPORTS     ******************************     */

import { validateForm } from "./validations.js";

/*     *****************************************************************************     */

/*     ******************************     GLOBAL VARIABLES     ******************************     */

const formUI = document.getElementById("formGym");
const listTaskUI = document.getElementById("listTask");
const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");

/*     **************************************************************************************     */

/*     ******************************     EVENTS     ******************************     */

// Click event of the save button of the form
saveBtn.addEventListener( "click", (e) => {
    e.preventDefault();
    saveTask( getTaskForm() );
});

// Click event of the update button of the form
updateBtn.addEventListener( "click", (e) => {
    e.preventDefault();
    let index = updateBtn.getAttribute("data-id");
    updateTask( getTaskForm(), parseInt(index) );
});

/*     *****************************************************************************     */

/*     ******************************     GET METHODS     ******************************     */

// Function to get form data
function getTaskForm() {
    let task = firstCapitalLetterOfText(document.getElementById("task").value);
    let description = firstCapitalLetterOfText(document.getElementById("description").value);
    let state = false;

    return {
        task,
        description,
        state
    };
}

// Function to get a list of people data from the form
const getTaskList = () => {
    let taskList;
    if ( localStorage.getItem("taskList") === null ) {
        taskList = [];
    } else {
        taskList = JSON.parse( localStorage.getItem("taskList") );
    }
    return taskList;
}

// Function to get the status name of a task
const getState = ( state ) => {
    return state ? "Done" : "Pending";
}

/*     *********************************************************************************     */

/*     ******************************     CRUD TASK     ******************************     */

// Function to save task
function saveTask( data ) {
    // if form is validate
    if ( validateForm( data ) ) {
        let taskList = getTaskList();
        taskList.push( data );
        saveDataLocalStorage( taskList );
        showTaskListUI();
        clearFormFields();
    }
}

// Function to update task
function updateTask( data, index ) {
    // if form is validate
    if ( validateForm( data ) ) {
        updateDataLocalStorage( getTaskList(), index );
        showTaskListUI();
        clearFormFields();
        updateBtn.style.display = "none";
        saveBtn.style.display = "block";
    }
}

// Function to delete task
function deleteTask( index ) {
    let taskList = getTaskList();
    taskList.splice( index, 1 );
    deleteDataLocalStorage( taskList );
    showTaskListUI();
}

// Function to update state task
function updateStateTask( index ) {
    let taskList = getTaskList();
    if ( taskList[index].state ) {
        taskList[index].state = false
    } else {
        taskList[index].state = true;
    }
    localStorage.setItem( "taskList", JSON.stringify(taskList) );
    showTaskListUI();
}

/*     *******************************************************************************     */

/*     ******************************     LOCAL STORAGE     ******************************     */

// Function to save data from local storage
function saveDataLocalStorage( taskList ) {
    localStorage.setItem( "taskList", JSON.stringify(taskList) );
    messageSuccessForm( "Data save in local storage" );
}

// function to update data from local storage
function updateDataLocalStorage( taskList, index ) {
    taskList[index].task = document.getElementById("task").value;
    taskList[index].description = document.getElementById("description").value;
    localStorage.setItem( "taskList", JSON.stringify(taskList) );
    messageInfoForm( "Data update in local storage" );
}

// Function to delete data from local storage
function deleteDataLocalStorage( taskList ) {
    localStorage.setItem( "taskList", JSON.stringify(taskList) );
    messageInfoForm( "Data delete in local storage" );
}

/*     ***********************************************************************************     */

/*     ******************************     LIST TASK UI     ******************************     */

// Function to create a task view
const createTaskUI = ( data, index ) => {
    let colorAlert = (data.state) ? "info" : "warning";
    return `
        <div class="alert alert-${colorAlert} row mb-3" role="alert">
            <div class="col-md-1 d-flex align-items-center justify-content-center">
                <span class="material-symbols-outlined ">
                    accessibility
                </span>
            </div>
            <div class="col-md-9" id="taskData">
                <b>Task: </b><p>${data.task}</p>
                <br>
                <b>Description: </b><p>${data.description}</p>
                <br>
                <b>State: </b><p>${getState(data.state)}</p>
            </div>
            <div class="col-md-2 d-flex align-items-center justify-content-center">
                <span class="material-symbols-outlined stateBtn" id="${index}">
                    done
                </span>
                <span class="material-symbols-outlined editBtn" id="${index}">
                    cached
                </span>
                <span class="material-symbols-outlined deleteBtn" id="${index}">
                    delete
                </span>
            </div>
        </div>
    `;
};

// Function to show a view of task list
export function showTaskListUI() {
    if ( getTaskList().length === 0 ) {
        listTaskUI.innerHTML = `<p class="text-center">There are no tasks to show...</p>`;
    } else {
        var taskUI = "";
        getTaskList().forEach((element, index) => {
            taskUI += createTaskUI(element, index);
        });
        listTaskUI.innerHTML = taskUI;
        let deleteBtn = document.querySelectorAll( ".deleteBtn" );
        let editBtn = document.querySelectorAll( ".editBtn" );
        let stateBtn = document.querySelectorAll( ".stateBtn" );
        deleteBtn.forEach( (element, index) => {
            element.addEventListener( "click", () => {
                deleteTask( index );
            });
        });
        editBtn.forEach( (element, index) => {
            element.addEventListener( "click", () => {
                showUpdateBtn( index );
                loadDataForm( getTaskList(), index );
                updateBtn.setAttribute("data-id", index.toString());
            });
        });
        stateBtn.forEach( (element, index) => {
            element.addEventListener( "click", () => {
                updateStateTask( index );
            });
        });
    }
}

/*     *****************************************************************************     */

/*     ******************************     FORM METHODS     ******************************     */

// function to load data into the form
function loadDataForm( taskList, index ) {
    document.getElementById( "task" ).value = taskList[index].task;
    document.getElementById( "description" ).value = taskList[index].description;
}

// function to clear form fields
function clearFormFields() {
    formUI.reset();
    //document.getElementById( "task" ).value = "";
    //document.getElementById( "description" ).value = "";
}

// function to show update button
function showUpdateBtn( index ) {
    document.getElementById("saveBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "block";
}

/*     *********************************************************************************     */

/*     ******************************     MESSAGES     ******************************     */

// Function that displays an information message in the form
function messageInfoForm( message ) {
    const messageForm = document.getElementById("messageForm");
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
    const messageForm = document.getElementById("messageForm");
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
    var result = "";
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
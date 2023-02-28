// ****** SELECT ITEMS **********
const $alert = document.querySelector(".alert"),
    $form = document.querySelector(".grocery-form"),
    $groceryText = document.getElementById("grocery"),
    $submitBtn = document.querySelector(".submit-btn"),
    $container = document.querySelector(".grocery-container"),
    $list = document.querySelector(".grocery-list"),
    $clearBtn = document.querySelector(".clear-btn");

// edit options
let editElement,
    editFlag = false,
    editId = "";

// ****** SETUP ITEMS **********

// create list items
const createListItem = (id, value) => {
    const $element = document.createElement("article");
    $element.classList.add("grocery-item");

    const attr = document.createAttribute("data-id");
    attr.value = id;
    $element.setAttributeNode(attr);

    $element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    const $deleteBtn = $element.querySelector(".delete-btn"),
        $editBtn = $element.querySelector(".edit-btn");
        
    $deleteBtn.addEventListener("click", deleteItem);
    $editBtn.addEventListener("click", editItem);
    
    $list.appendChild($element);
}

// setup items
const setupItems = () => {
    let items = getLocaleStorage();

    if (items.length > 0) {
        items.forEach((item) => {
            createListItem(item.id, item.value);
        });
        $container.classList.add("show-container");
    }
}

// ****** FUNCTIONS **********

// set back to default
const setBackToDefault = () => {
    $groceryText.value = '';
    editFlag = false;
    editId = "";
    $submitBtn.textContent = "submit";
}

// display alert
const displayAlert = (text, action) => {
    $alert.textContent = text;
    $alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(() => {
        $alert.textContent = '';
        $alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// clear items
const clearItems = () => {
    const $items = document.querySelectorAll(".grocery-item");

    if ($items.length > 0)
        $items.forEach((item) => {
            $list.removeChild(item);
        });
    
    $container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
}

// delete item
const deleteItem = (e) => {
    const $element = e.currentTarget.parentElement.parentElement,
        id = $element.dataset.id;

    $list.removeChild($element);

    if ($list.children.length === 0)
        $container.classList.remove("show-container");
    
    displayAlert("item removed", "danger");

    setBackToDefault();

    // remove from local storage
    removeFromLocaleStorage(id);
}

// edit item
const editItem = (e) => {
    const $element = e.currentTarget.parentElement.parentElement;
        
    editElement = e.currentTarget.parentElement.previousElementSibling;

    // set edit item
    $groceryText.value = editElement.innerHTML;

    editFlag = true;
    editId = $element.dataset.id;
    $submitBtn.textContent = 'edit';
}

// add item
const addItem = (e) => {
    e.preventDefault();
    
    const value = $groceryText.value,
        id = new Date().getTime().toString();
    
    if (value && !editFlag) {
        createListItem(id, value);
        displayAlert("item added to the list", "success");
        $container.classList.add("show-container");
        addToLocalStorage(id, value);
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        editLocaleStorage(editId, value);
        setBackToDefault();
    } else {
        displayAlert("please enter value", "danger");
    }
}

// ****** EVENT LISTENERS **********
// submit form
$form.addEventListener("submit", addItem);

$clearBtn.addEventListener("click", clearItems);

window.addEventListener(("DOMContentLoaded"), setupItems);

// ****** LOCAL STORAGE **********

const getLocaleStorage = () => {
    return localStorage.getItem('list')
        ? JSON.parse(localStorage.getItem('list'))
        : [];
}

const addToLocalStorage = (id, value) => {
    const grocery = { id, value };
    let items = getLocaleStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

const removeFromLocaleStorage = (id) => {
    let items = getLocaleStorage();

    items = items.filter((item) => {
        if (item.id !== id)
            return item;
    });

    localStorage.setItem('list', JSON.stringify(items));
}

const editLocaleStorage = (id, value) => {
    let items = getLocaleStorage();

    items = items.map((item) => {
        if (item.id === id)
            item.value = value;
        return item;
    });

    localStorage.setItem('list', JSON.stringify(items));
}
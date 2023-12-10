/*     ******************************     IMPORTS     ******************************     */

import { api } from "./api.js";

/*     *****************************************************************************     */

/*     ******************************     GLOBAL VARIABLES     ******************************     */

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

/*     **************************************************************************************     */

/*     ******************************     EVENTS     ******************************     */

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if ( query !== "" ) {
        fetchRecipes(query);
    } else {
        resultsContainer.innerHTML = "";
        messageErrorForm( "The search field is empty" );
    }
});

/*     ****************************************************************************     */

/*     ******************************     FETCH     ******************************     */

function fetchRecipes( query ) {
    fetch( api().getUrl(query) )
        .then( ( response ) => response.json() )
        .then( (data) => {
            if (data.results.length === 0) {
                resultsContainer.innerHTML = "";
                messageErrorForm( "No results found...");
            } else {
                displayRecipes( data.results );
            }
        })
        .catch( ( error ) => {
            messageErrorForm( "Error fetching data: " + error );
        });
}

function fecthRecipeDetails( recipeId ) {
    fetch( api().getUrlRecipeDetails( recipeId ) )
        .then( ( response ) => response.json() )
        .then( (data) => {
            console.log(data);
            displayRecipeDetails( data );
        })
        .catch( ( error ) => {
            messageErrorForm( "Error fetching recipe details: " + error );
        });
}

function displayRecipes( recipes ) {
    let output = "";
    recipes.forEach( (element) => {
        output += recipeCard( element );
    });
    resultsContainer.innerHTML = output;

    const viewRecipeBtns = document.querySelectorAll(".view-recipe-btn");
    viewRecipeBtns.forEach( (button) => {
        button.addEventListener( "click", () => {
            const recipeId = button.dataset.id;
            fecthRecipeDetails( recipeId );
        })
    });
}

function displayRecipeDetails( recipe ) {
    const recipeModalBody = document.getElementById("recipeModalBody");
    const recipeDetails = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="Recipe image detail" class="img-fluid mb-3">
        <h5>Ingredients:</h5>
        <ul>
            ${recipe.extendedIngredients.map( (ingredient) => `<li>${ingredient.original}</li>`).join("")}
        </ul>
        <h5>Instructions:</h5>
        <p>${recipe.instructions || "Instructions not available,"}</p>
    `;
    recipeModalBody.innerHTML = recipeDetails;
}

const recipeCard = ( recipe ) => {
    return `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img src="${recipe.image}" alt="Recipe image" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <button 
                        class="btn btn-primary view-recipe-btn" 
                        data-id="${recipe.id}"
                        data-bs-toggle="modal"
                        data-bs-target="#recipeModal"
                    >
                        View recipe    
                    </button>
                </div>
            </div>
        </div>
    `;
}

/*     ***************************************************************************     */

/*     ******************************     MESSAGES     ******************************     */

// Function that displays an error message on the form
function messageErrorForm( message ) {
    const messageForm = document.getElementById("messageForm");
    messageForm.style.display = "block";
    messageForm.setAttribute( "class", "alert alert-danger mt-3" );
    messageForm.setAttribute( "role", "alert" );
    messageForm.textContent = `${message}`;
    setTimeout(() => {
        messageForm.style.display = "none";
    }, 2000);
}

/*     *******************************************************************************     */
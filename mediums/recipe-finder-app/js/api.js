export const api = () => {
    return {
        key: "7d231e8ffd2e4a6bb7e1c212e62cdf07",
        getUrl: function (query){
            return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.key}&query=${query}&number=12`
        },
        getUrlRecipeDetails: function (id) {
            return `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.key}`;
        }
    };
};
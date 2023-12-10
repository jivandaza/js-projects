/*     ******************************     IMPORTS     ******************************     */
import { loadLogin } from './login.js';
import User from './user.js';

/*     ******************************     VARIABLES     ******************************     */
let user = new User();

if (user.getUserLocalStorage() == null) {
    loadLogin();
} else {
    user.redirectionPageAccess(user.getUserLocalStorage().type)
}

export default user;
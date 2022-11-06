import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { showLogin, showSignup, showMenu } from "./controller.js";
export const auth = getAuth();
async function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
        return true;
        })
        .catch((error) => {
        return error.code;
        });
}

async function formSubmit (e) {
    e.preventDefault();
    const email = document.querySelector('#userEmail').value;
    const password = document.querySelector('#password').value;
    const confPassword = document.querySelector('#confirmPassword').value;
    console.log(password, confPassword);
    if (password != confPassword)
    {
        alert('Password does not match!');
        return;
    }

    const isSuccess = await signup(email, password);
    console.log(isSuccess);
    if (isSuccess == true)
        alert('Account created successfully!');
    else if (isSuccess == false)
        alert('Failed to create new account');
    else 
        alert(isSuccess);

    hideSignUpLogInShowLogOutBtn(true);
    showMenu(true);
    showLogin(false);
    showSignup(false);
}

export function hideSignUpLogInShowLogOutBtn(isShown) {
    const loginButton = document.querySelector('#Log-In');
    const signupButton = document.querySelector('#Sign-Up');
    const logOutButton = document.querySelector('#Log-Out');
    if (isShown) {
        loginButton.setAttribute('hidden', 'true');
        signupButton.setAttribute('hidden', 'true');
        logOutButton.removeAttribute('hidden');
    }
    else {
        loginButton.removeAttribute('hidden');
        signupButton.removeAttribute('hidden');
        logOutButton.setAttribute('hidden', 'true');
    }
}

function logOut() {
    auth.signOut();
    hideSignUpLogInShowLogOutBtn(false);
}

export function signUpInit() {
    document.querySelector('.SignUpForm').addEventListener('submit', formSubmit);
    document.querySelector('#Log-Out').addEventListener('click', logOut)
}

export function checkUser() {
    if (auth.currentUser != null) 
        hideSignUpLogInShowLogOutBtn(true);
}

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { showLogin, showSignup, showMenu } from "./controller.js";
export const auth = getAuth();

// Sign Up for new users
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
    else  {
        alert(isSuccess);
        return;
    }

    hideSignUpLogInShowLogOutBtn(true);
    showMenu(true);
    showLogin(false);
    showSignup(false);
}

// login for existing  users
async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return error.code;
    });
}

async function logIn(e) {
    e.preventDefault();
    const email = document.querySelector('#userEmailLogin').value;
    const password = document.querySelector('#passwordLogin').value;
    const isSuccess = await login(email, password);
    if (isSuccess == true)
        alert('Logged In successfully!');
    else 
    {
        alert(isSuccess);
        return;
    }
        

    hideSignUpLogInShowLogOutBtn(true);
    showMenu(true);
    showLogin(false);
    showSignup(false);
}

// Reset Password for existing users

  async function ResetPass(email) {
    return sendPasswordResetEmail (auth, email)
    .then(() => {
        return true;
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        return error.code;
      });
  }

  async function resetPass(e) {
    e.preventDefault ();
    const email = document.querySelector('#userResetPassEmail').value;
    const isSuccess = await ResetPass(email);
    if(isSuccess == true)
        alert('Password-reset email is sent!');
    else {
        alert(isSuccess);
        return;
    }
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
    document.querySelector('.LogInForm').addEventListener('submit', logIn);
    document.querySelector('#Log-Out').addEventListener('click', logOut);
    document.querySelector('.ResetPassForm').addEventListener('submit', resetPass);
}

export function checkUser() {
    if (auth.currentUser != null) 
        hideSignUpLogInShowLogOutBtn(true);
}
// control interface

const loginButton = document.querySelector('#Log-In');
const signupButton = document.querySelector('#Sign-Up');

// Show Sign up when sign up button is clicked and hide other components (login and menu)
function showLogin(isShown) {
    if (!isShown)
        document.querySelector('#LoginSection').setAttribute('hidden', '');
    else
        document.querySelector('#LoginSection').removeAttribute('hidden', '');
}

function showSignup(isShown) {
    if (!isShown)
        document.querySelector('#SignupSection').setAttribute('hidden', '');
    else
        document.querySelector('#SignupSection').removeAttribute('hidden', '');
}

function showMenu(isShown) {
    if (!isShown)
        document.querySelector('#Main-Menu').setAttribute('hidden', '');
    else
    document.querySelector('#Main-Menu').removeAttribute('hidden', '');
}

function controlInit() {
    loginButton.addEventListener('click', () => {
        showLogin(true);
        showMenu(false);
        showSignup(false);
    })
    signupButton.addEventListener('click', () => {
        showLogin(false);
        showMenu(false);
        showSignup(true);
    })
}

export {
    controlInit,
    showLogin,
    showMenu,
    showSignup
}
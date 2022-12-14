import { renderCart, updateTotalPrice, CheckCart } from "./cart.js";

// control interface

const loginButton  = document.querySelector('#Log-In');
const loginLink  = document.querySelector('#loginLink');
const signupButton = document.querySelector('#Sign-Up');
const signupLink = document.querySelector('#signupLink');
const ResetPassLink = document.querySelector('#ResetPassLink');
const cartButton   = document.querySelector('#cartBtn');
const aboutLink    = document.querySelector('#aboutLink');
const checkoutBtn  = document.querySelector('#checkoutBtn');
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

function showResetPass(isShown) {
    if (!isShown)
        document.querySelector('#ResetPassSection').setAttribute('hidden', '');
    else
        document.querySelector('#ResetPassSection').removeAttribute('hidden', '');
}

function showMenu(isShown) {
    if (!isShown)
        document.querySelector('#Main-Menu').setAttribute('hidden', '');
    else
    document.querySelector('#Main-Menu').removeAttribute('hidden', '');
}

function showCart(isShown) {
    if (!isShown)
        document.querySelector('#CartSection').setAttribute('hidden', '');
    else
        document.querySelector('#CartSection').removeAttribute('hidden', '');
}

function showAbout(isShown) {
    if (!isShown)
        document.querySelector('#AboutSection').setAttribute('hidden', '');
    else
        document.querySelector('#AboutSection').removeAttribute('hidden', '');
}

function showCheckOut(isShown) {
    if (!isShown) 
        document.querySelector('#checkoutForm').setAttribute('hidden', '');
    else
        document.querySelector('#checkoutForm').removeAttribute('hidden', '');
}


function controlInit() {
    loginButton.addEventListener('click', () => {
        showLogin(true);
        showMenu(false);
        showSignup(false);
        showCart(false);
        showAbout(false);
        showCheckOut(false);
        showResetPass(false);
    })

    loginLink.addEventListener('click', () => {
        showLogin(true);
        showMenu(false);
        showSignup(false);
        showCart(false);
        showAbout(false);
        showCheckOut(false);
        showResetPass(false);
    })


    signupButton.addEventListener('click', () => {
        showLogin(false);
        showMenu(false);
        showSignup(true);
        showCart(false);
        showAbout(false);
        showCheckOut(false);
        showResetPass(false);
    })
    signupLink.addEventListener('click', () => {
        showLogin(false);
        showMenu(false);
        showSignup(true);
        showCart(false);
        showAbout(false);
        showCheckOut(false);
        showResetPass(false);
    })

    ResetPassLink.addEventListener('click', () => {
        showLogin(false);
        showMenu(false);
        showSignup(false);
        showResetPass(true);
        showCart(false);
        showAbout(false);
        showCheckOut(false)
    })

    cartButton.addEventListener('click', () => {
        showLogin(false);
        showMenu(false);
        showSignup(false);
        showCart(true);
        showAbout(false);
        renderCart();
        updateTotalPrice();
        showCheckOut(false);
        showResetPass(false);
    })

    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin(false);
        showMenu(false);
        showSignup(false);
        showCart(false);
        showAbout(true);
        showCheckOut(false);
        showResetPass(false);
    })

    checkoutBtn.addEventListener('click', () => {
        if (CheckCart()) return;
        showLogin(false);
        showMenu(false);
        showSignup(false);
        showCart(false);
        showAbout(false);
        showCheckOut(true);
        showResetPass(false);
    })

}

export {
    controlInit,
    showLogin,
    showMenu,
    showSignup,
    showAbout,
    showCart,
    showResetPass,
}
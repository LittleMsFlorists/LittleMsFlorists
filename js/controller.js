import { renderCart, updateTotalPrice } from "./cart.js";

// control interface

const loginButton  = document.querySelector('#Log-In');
const signupButton = document.querySelector('#Sign-Up');
const cartButton   = document.querySelector('#cartBtn');
const aboutLink  = document.querySelector('#aboutLink');

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

function controlInit() {
    loginButton.addEventListener('click', () => {
        showLogin(true);
        showMenu(false);
        showSignup(false);
        showCart(false);
        showAbout(false);
    })
    signupButton.addEventListener('click', () => {
        showLogin(false);
        showMenu(false);
        showSignup(true);
        showCart(false);
        showAbout(false);
    })
    cartButton.addEventListener('click', () => {
        showLogin(false);
        showMenu(false);
        showSignup(false);
        showCart(true);
        showAbout(false);
        renderCart();
        updateTotalPrice()
    })

    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin(false);
        showMenu(false);
        showSignup(false);
        showCart(false);
        showAbout(true);
    })

}

export {
    controlInit,
    showLogin,
    showMenu,
    showSignup,
    showAbout,
    showCart
}
import { submitOrder } from "./firebase.js";
import { auth } from "./UserAuth.js";

/**
 * Form Submission handler 
 * */
async function formSubmitHandler(event) {
    event.preventDefault();
    const targets = Array.from(event.target);
    const userInfo = {};
    let cart = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    targets.forEach(target => {
        if (target.id != "")
            userInfo[target.id] = target.value
    })

    checkUser(userInfo);
    cart = cleanUpCart(cart); // remove items where the quantity = 0
    const orderId = await placeOrder(userInfo, cart);

    if (orderId) {
        alert("Your order has been placed\n Your order number is: " + orderId);
        cleanCart();
        window.location.href="/";
    } else {
        alert("Cannot place your order, please try again later");
    }
}

function checkUser(userInfo) {
    if (auth.currentUser) {
        userInfo.userID = auth.currentUser.uid;
    }
}

function cleanUpCart(cart) {
    return cart.filter(item => item.quantity != 0);
}

function cleanCart() {
    localStorage.removeItem('cart');
}

async function placeOrder(userInfo, cart) {
    const orderID = await submitOrder(userInfo, cart);
    if (!orderID)
        return false
    return orderID;
}

/**
 * Module initilizer
 */
export function checkoutFormInit() {
    document.querySelector("#form-CheckOut").addEventListener('submit', formSubmitHandler);
}
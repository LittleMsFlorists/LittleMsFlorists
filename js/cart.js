import { MENU_DATA } from "./index.js";

/**
 * Updates item counter
 * @param {Int} quantity number of items added or removed
 * @param {Boolean} isIncremented true if adding new items, false if removing items
 */
export function updateCart(quantity = 1, isIncremented = true) {
    const itemCounter = document.querySelector('#cartItem');
    let numberOfItems = parseInt(itemCounter.innerHTML);
    
    if (isIncremented)
        numberOfItems += quantity;
    else
        numberOfItems -= quantity;
    
    if (numberOfItems < 0)
        numberOfItems = 0;

    itemCounter.innerHTML = numberOfItems;
}

/**
 * Renders all the items in cart
 * @param {Object} cart
 */
export function renderCart(cart = null) {
    if (cart == null) {
        cart = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
    }
    const cartBody = document.querySelector('#cartBody');
    if (cart.length == 0)
        cartBody.innerHTML = 'Your cart is empty';
    else {
        cartBody.innerHTML = '';
        cart.forEach(item => {
            const flowerInfo = MENU_DATA[item.key];
            cartBody.innerHTML += `
            <div class="col mb-5" data-id="${item.key}">
                        <div class="card h-100">
                            <img class="card-img-top" src="${flowerInfo.ImageURL}" alt="..." />
                            
                            <div class="card-body p-4">
                                <div class="text-center">
                            
                                    <h5 class="fw-bolder">${flowerInfo.Name}</h5>
                                    
                            
                                    $${flowerInfo.Price}
                                    <br>
                                    <b>quantity: ${item.quantity}</b>
                                </div>
                            </div>
                            
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button data-removebtn data-itemID="${item.key}" data-quantity="${item.quantity}" class="btn btn-outline-colorful mt-auto">Remove</button></div>
                    </div>
                </div>
            </div>
            `
        })
    }
}

export function bindRemove() {
    const menu = document.querySelector("#cartBody");
    menu.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches('button[data-removebtn]')) 
        {   
            let CART_DATA = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
            const key = target.dataset.itemid;
            const quantity = target.dataset.quantity;

            CART_DATA = CART_DATA.filter(item => item.key != key);

            localStorage.setItem('cart', JSON.stringify(CART_DATA));
            updateCart(quantity, false);
            renderCart(CART_DATA);
        }
    })
}

/**
 * Reloads the cart when page is refreshed
 */
export function reloadCart() {
    let CART_DATA = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
    const totalItem = CART_DATA.reduce((acc, cur) => acc += cur.quantity, 0);
    updateCart(totalItem, true);
}
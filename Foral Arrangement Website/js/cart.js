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
            if (item.quantity == 0) return;
            const flowerInfo = MENU_DATA[item.key];
            cartBody.innerHTML += `
            <div class="col mb-5" data-id="${item.key}">
                        <div class="card h-100">
                            <img class="card-img-top" src="${flowerInfo.ImageURL}" alt="..." />
                            
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">${flowerInfo.Name}</h5>
                                    <span class="text-success">$${flowerInfo.Price}
                                </div>
                                <div data-quantity-control class="text-center">
                                    <button data-decrement-quantity data-key="${item.key}" class="btn btn-outline-colorful mt-auto me-2 ms-2">-</button><b>${item.quantity}</b><button data-increment-quantity data-key="${item.key}" class="btn btn-outline-colorful mt-auto me-2 ms-2">+</button>
                                </div>
                            </div>
                            
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button data-removebtn data-itemID="${item.key}" data-quantity="${item.quantity}" class="btn btn-outline-danger mt-auto">Remove</button></div>
                    </div>
                </div>
            </div>
            `
        })
    }
}

export function CheckCart() {
    const itemCounter = document.querySelector('#cartItem').innerHTML;
    if (parseInt(itemCounter, 10) == 0)
    {
        alert("Please add at least 1 item to continue");
        return true;
    }
    return false;
}
        

export function bindEventCart() {
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
            updateTotalPrice(CART_DATA);
        }
        else if (target.matches('button[data-decrement-quantity'))
        {
            let CART_DATA = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
            const key = target.dataset.key;
            
            const quantityB = target.nextSibling;
            let   quantity = parseInt(quantityB.innerHTML);
            if (quantity == 0)
                return;
        
            CART_DATA.map(item => { if (item.key == key) item.quantity--;})

            localStorage.setItem('cart', JSON.stringify(CART_DATA));
            updateCart(1, false);
            renderCart(CART_DATA);
            updateTotalPrice(CART_DATA);

        }
        else if (target.matches('button[data-increment-quantity'))
        {
            let CART_DATA = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
            const key = target.dataset.key;        
            CART_DATA.map(item => { if (item.key == key) item.quantity++;})

            localStorage.setItem('cart', JSON.stringify(CART_DATA));
            updateCart(1, true);
            renderCart(CART_DATA);
            updateTotalPrice(CART_DATA);

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
    updateTotalPrice()
}

/**
 * Updates total price and total items
 * @param {Array} data if data is null then load cart from localstorage
 */
export function updateTotalPrice (data = null) {
    if (data == null)
        data = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];

    const totalPriceSpan = document.querySelector('span[data-total-item-price]');
    if (data.length == 0)
        totalPriceSpan.innerHTML = 'Total Items: 0 - Price: $0';
    else {

        let totalItems = 0;
        let totalPrice = 0;
        data.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.quantity * MENU_DATA[item.key].Price;
        })

        totalPriceSpan.innerHTML = `Total Items: ${totalItems} - Price: $${totalPrice}`;
    }

}

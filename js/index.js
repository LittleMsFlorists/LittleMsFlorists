// Main js file

import {getData} from "./firebase.js";
import {controlInit} from "./controller.js";
import {signUpInit, auth, checkUser} from "./signUpForm.js"

let MENU_DATA = undefined

/**
 * Populate the menu
 * @param {JSON} data Flowers table
 */
// <h5 class="fw-light">${flowerInfo.ProductType == 0? 'Best Seller':'Premium'}</h5>
async function populateMenu(data) {
    const menu = document.querySelector("#Menu");
    const keys = Object.keys(data);
    keys.sort(() => Math.random() - 0.5);
    menu.innerHTML = "";
    for(let i = 0; i < keys.length; i++) {
        const flowerInfo = data[keys[i]];
        menu.innerHTML += `
        <div class="col mb-5" data-id="${keys[i]}">
                    <div class="card h-100">
                        <img class="card-img-top" src="${flowerInfo.ImageURL}" alt="..." />
                        
                        <div class="card-body p-4">
                            <div class="text-center">
                        
                                <h5 class="fw-bolder">${flowerInfo.Name}</h5>
                                
                        
                                $${flowerInfo.Price}
                            </div>
                        </div>
                        
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-colorful mt-auto" href="#">Add to cart</a></div>
                </div>
            </div>
        </div>
        `
    }
}

/**
 * Filter by occasion
 * @param {string} occasion 
 * @return data after being filtered
 */
function filterByOccasion(data ,occasion) {
    const result = {}
    for (const key in data) {
        const flowerInfo = data[key];
        flowerInfo.Occasions.toLowerCase();
        occasion.toLowerCase();
        if (flowerInfo.Occasions.includes(occasion))
            result[key] = flowerInfo
    }
    return result
}



function bindOccasionEventListener() {
    const occasionList = document.querySelectorAll("#occasions > li a");
    occasionList.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const occasion = el.innerHTML;
            const filData = filterByOccasion(MENU_DATA, occasion);
            populateMenu(filData)
        })
    })
}

/**
 * filter by product
 * @param {JSON} data 
 * @param {string} product
 * @return
 */
function filterByProduct(data, product) {
    //TODO
    if (product == 'Best Seller')
        product = 0;
    else
        product = 1;    

    const result = {}
    for (const key in data){
        const flowerInfo = data[key];
        if (flowerInfo.ProductType == product)
            result[key] = flowerInfo
    }
    return result
}

function bindProductEventListener() {
    //TODO
    const productList = document.querySelectorAll ("#products > li a");
    productList.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const product = el.innerHTML;
            const filData = filterByProduct (MENU_DATA, product);
            populateMenu(filData)
        })
    })
    
}

window.addEventListener("DOMContentLoaded", async () => {
    MENU_DATA = await  getData("Flowers");
    populateMenu(MENU_DATA);
    bindOccasionEventListener();
    bindProductEventListener();
    controlInit();
    signUpInit();
    checkUser();
    console.log(auth.currentUser);
});


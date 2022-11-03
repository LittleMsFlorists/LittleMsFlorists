// Main js file

import {getData} from "./firebase.js";


let MENU_DATA = undefined

/**
 * Populate the menu
 * @param {JSON} data Flowers table
 */
async function populateMenu(data) {
    console.log(data);
    const menu = document.querySelector("#Menu");
    const keys = Object.keys(data);
    console.log("Keys: ", keys);
    menu.innerHTML = "";
    for(let i = 0; i < keys.length; i++) {
        const flowerInfo = data[keys[i]];
        console.log(flowerInfo)
        menu.innerHTML += `
        <div class="col mb-5" data-id="${keys[i]}">
                    <div class="card h-100">
                        <img class="card-img-top" src="${flowerInfo.ImageURL}" alt="..." />
                        
                        <div class="card-body p-4">
                            <div class="text-center">
                        
                                <h5 class="fw-bolder">${flowerInfo.ProductType == 0? 'Best Seller':'Premium'}</h5>
                        
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
async function filter(data ,occasion) {
    const result = {}
    for (const key in data) {
        const flowerInfo = data[key];
        if (flowerInfo.Occasions.includes(occasion))
            result[key] = flowerInfo
    }
    return result
}



function bindOccasionEventListener() {
    const occasionList = document.querySelectorAll("#occasions > li a");
    occasionList.forEach((el) => {
        el.addEventListener("click", async (e) => {
            e.preventDefault();
            const occasion = el.innerHTML;
            const filData = await filter(MENU_DATA, occasion);
            populateMenu(filData)
        })
    })
}

/**
 * filter by product
 * @param {JSON} data 
 * @param {string} product 
 */
function filterByProduct(data, product) {
    //TODO
}

function bindMenuProducts() {
    //TODO
}

window.addEventListener("DOMContentLoaded", async () => {
    MENU_DATA = await  getData("Flowers");
    populateMenu(MENU_DATA);
    bindOccasionEventListener();
    bindMenuProducts();
});


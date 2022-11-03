// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

import {getDatabase, ref, set, child, get} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8fSQ857aEFCSphn0sV1mDQhDir2_6S0A",
  authDomain: "little-ms-florists-f7857.firebaseapp.com",
  projectId: "little-ms-florists-f7857",
  storageBucket: "little-ms-florists-f7857.appspot.com",
  messagingSenderId: "704779648998",
  appId: "1:704779648998:web:ade3e5ce567882a1066027",
    databaseURL: "https://little-ms-florists-f7857-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)


/**
 * Get whole `table`
 * @param {string} table table name you want to get
 * @returns JSON
 */
export function getData(table) {
    const dbRef = ref(db)
    return get(child(dbRef, table)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            return {}
        }
    }).catch((error) => {
        console.error(error);
    })
}


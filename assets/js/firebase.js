
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyBVggxkrDOOme528eysTI7TOuRm4wZHeEQ",
  authDomain: "corpodealunos-bec34.firebaseapp.com",
  projectId: "corpodealunos-bec34",
  storageBucket: "corpodealunos-bec34.appspot.com",
  messagingSenderId: "797128992049",
  appId: "1:797128992049:web:66feec0651ee7adff33c10",
  measurementId: "G-KV9LMZC9PH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}
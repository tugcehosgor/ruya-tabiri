// import "./styles.css";

console.log(window.location.href)

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, set } from "firebase/database";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTEDsNQ1qxcq8gzFozM19DCNBHnARYkug",
  authDomain: "ruya-tabirleri-bcfd9.firebaseapp.com",
  databaseURL: "https://ruya-tabirleri-bcfd9-default-rtdb.firebaseio.com",
  projectId: "ruya-tabirleri-bcfd9",
  storageBucket: "ruya-tabirleri-bcfd9.appspot.com",
  messagingSenderId: "587176207852",
  appId: "1:587176207852:web:c3e2e7af1edf814c078cc9",
  measurementId: "G-VW0X8WSC88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Get a reference to the database service
const database = getDatabase(app);

document.getElementById("app").innerHTML = `

<div> 
<row>
  <col></col>
  <col></col>
  <col>
    <label>Ruyada</label><br>
    <input id="mana" type="text" value=""><br><br>
    <label >ne anlama gelir?</label><br>
    <button id="submit">ara</button><br><br>
    
`;

var ruya;
var ruyaURL;
// var urlPath;
function readInputs() {
  ruya = document.getElementById("mana").value;
  return ruya;
}

function makeHtml() {
  ruyaURL = ruya
    .replace(/ /g, "-")
    .replace(/Ğ/g, "G")
    .replace(/Ç/g, "C")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/Ü/g, "U")
    .replace(/ü/g, "u")
    .replace(/Ş/g, "S")
    .replace(/ş/g, "s")
    .replace(/İ/g, "I")
    .replace(/ı/g, "i")
    .replace(/Ö/g, "O")
    .replace(/ö/g, "o");
  console.log("mana:" + ruyaURL);
  ruyaURL = "ruyada-" + ruyaURL + "-gormek-ne-manaya-gelir"; 
  return ruyaURL;
}
// function final() {
//   urlPath = "/";
//   urlPath = urlPath.concat(heteleme);
//   return urlPath;
// }

function changeUrl() {
  var myWindow = window.history.pushState({}, "", ruyaURL);
  document.getElementById("app").innerHTML = `
  <div> 
<row>
  <col></col>
  <col></col>
  <col>
    <label>Ruyada</label><br>
    <label>${ruya}</label><br>
    <label >gormeniz</label><br>
    <label >Kicinizin acik kaldigina delalet etmektedir.</label><br>
    
    
`;

  return myWindow;
}

document.getElementById("submit").addEventListener("click", function () {
  readInputs();
  makeHtml();
  // final();
  changeUrl();
  console.log(ruyaURL);
  localStorage.setItem("item:" + ruya, ruyaURL);
  console.log(localStorage.getItem("item:" + ruya));
  set(ref(database, ruyaURL), ruya);
});

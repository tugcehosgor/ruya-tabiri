


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


console.log("location.href::: " + window.location.href)

const queryString = window.location.search;
console.log("query string:::  " + queryString);
const urlParams = new URLSearchParams(queryString);
let ruyaURL = urlParams.get('ruya')
if (ruyaURL === null) {
  enterRuya()
} else { 
  checkRuya()
}
console.log("ruya URL:::  " + ruyaURL);

var input = document.getElementById("mana");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});



function enterRuya() {
document.getElementById("app").innerHTML = `
<div class="container">
  <div class="row">
    <div class="col text-center mt-md-4">
    <img src="/Tapir-fine-line-cropped.png" class="img-fluid" alt="...">
    </div>
  </div>
  <div class="row mx-md-5">
    <div class="col">
    <p class="text-center mt-md-4">Bana rüyanı söyle,<br>sana ne anlama geldiğini söyleyeyim.</p>
    </div>
  </div>
  <div class="row justify-content-center">
      
      <div class="col">
        <p class="text-center">Ruyada <input id="mana" autofocus class="text-center mt-md-2" type="text" value="" placeholder="" required /> gordum</p><br>
      </div>
  </div>
    
  <div class="row justify-content-center">
      <div class="col text-center">
      <button class="mt-3" id="submit">Tapir'e Sor</button><br>
      </div>
  </div>
    
</div>
  `;


document.getElementById("submit").addEventListener("click", function () {
  readInputs();
  makeHtml();
  changeURL();
  ruyaTabiri(ruya);
  console.log(ruyaURL);
  set(ref(database, ruyaURL), ruya);
});

}


var ruya;

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


function changeURL() {
  var myWindow = window.history.pushState({}, "", "?ruya=" + ruyaURL);
  return myWindow;
}

function ruyaTabiri(ruya) {
  document.getElementById("app").innerHTML = `
  <div class="container mt-5">
        <div class="row ">
          <div class="col text-center">
            <p class="text-center">Rüyada ${ruya} görmek</p>
            <p class="text-center">kıçının açık kaldığına delalet etmektedir.</p>
            <img src="/Sleeping-tapir-fine.png" style="width:50%" class="img-fluid" alt="...">
            </div>
        </div>


      <div>
`;

}
  




function checkRuya() { 
  const ruyaRef = ref(database, ruyaURL);
  get(ruyaRef).then((snapshot) => {
    if (snapshot.exists()) { // database'de var.
      console.log(snapshot.val());
      //indexteki gibi yazdır
      ruyaTabiri(snapshot.val());
    } else { // database'de yok
      console.log("No data available");
      // database e key url value  "yeni" olarak eklenecek
      set(ref(database, ruyaURL), "YENI");
      // medyumlar bakyıor yazdır
      document.getElementById("app").innerHTML = `
      <div class="container">
        <div class="row justify-content-center">
          <div class="col mt-5">
          <p class="text-center">Ruya Tapir'i bu konuda halen çalışmakta.</p>
          <p class="text-center">Lütfen daha sonra tekrar deneyiniz.</p>        
          </div>
        </div>


      <div> 
  
  `;
    }
  }).catch((error) => {
    console.error(error);
  });
}



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



window.onhashchange = function() { 
  console.log("change678 ");
  
}

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
    <p class="text-center mt-md-4">Bana r??yan?? s??yle, sana ne anlama geldi??ini s??yleyeyim.</p>
    </div>
  </div>
  
  <div class="row justify-content-center">
      
      <div class="col" style="padding-bottom: 15px">
        <p class="text-center">R??yada <input id="mana" autofocus class="text-center mt-md-2" type="text" value="" placeholder="" required> g??rd??m</p>
      </div>
  </div>

  
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <filter id="gooey">
                <!-- in="sourceGraphic" -->
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="highContrastGraphic" />
                <feComposite in="SourceGraphic" in2="highContrastGraphic" operator="atop" />
            </filter>
        </defs>
    </svg>
    
  <div class="row justify-content-center">
      <div class="col text-center">
      <button class="mt-3" id="submit">
      Tapir'e Sor
      <span class="bubbles">
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
        </span>
        </button>
      </div>
  </div>


    
</div>
`;


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

  window.onpopstate = function(event) {
    enterRuya()
  };


document.getElementById("submit").addEventListener("click", function () {
  debugger


  let stateObj = {
    foo: "bar",
}

history.pushState(stateObj, "page 2", ruyaURL)




  readInputs();
  if (ruya == "") {
    alert("lutfen bir ruya giriniz.");
    return false;
  }
  else{
    
    makeHtml();
    changeURL();
    ruyaTabiri(ruya);
    console.log(ruyaURL);
    set(ref(database, ruyaURL), ruya);
  }
  
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
    .replace(/??/g, "G")
    .replace(/??/g, "C")
    .replace(/??/g, "c")
    .replace(/??/g, "g")
    .replace(/??/g, "U")
    .replace(/??/g, "u")
    .replace(/??/g, "S")
    .replace(/??/g, "s")
    .replace(/??/g, "I")
    .replace(/??/g, "i")
    .replace(/??/g, "O")
    .replace(/??/g, "o");
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
            <p class="text-center">R??yada "${ruya}" g??rmek</p>
            <p class="text-center">k??????n??n a????k kald??????na delalet etmektedir.</p>
            <img src="/Sleeping-tapir-fine-1.png" class="img-fluid" alt="...">
          </div>
      </div>
  </div>

  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <filter id="gooey">
                <!-- in="sourceGraphic" -->
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="highContrastGraphic" />
                <feComposite in="SourceGraphic" in2="highContrastGraphic" operator="atop" />
            </filter>
        </defs>
    </svg>



    <div class="container mt-5">
      <div class="row ">
          <div class="col text-center">
              <a href="https://ruyatapiri.com/"><button id="new-gooey">
              yeni r??ya
              <span class="bubbles">
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
        </span>
      </button>
      </a>

          </div>

          <div class="col text-center">
    
          <a class="share-btn" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fruyatapiri.com%2F?ruya=${ruyaURL}&display=popup&ref=plugin&src=share_button" onclick="return !window.open(this.href, 'Facebook', 'width=640,height=580')">
    
          <button id="gooey-button">
        Payla??
        <span class="bubbles">
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
            <span class="bubble"></span>
        </span>
    </button>
    </a>
    </div>
          


    </div>
</div>



  
      


      

`;
  
  

}
  




function checkRuya() { 
  const ruyaRef = ref(database, ruyaURL);
  get(ruyaRef).then((snapshot) => {
    if (snapshot.exists()) { // database'de var.
      console.log(snapshot.val());
      //indexteki gibi yazd??r
      ruyaTabiri(snapshot.val());
    } else { // database'de yok
      console.log("No data available");
      // database e key url value  "yeni" olarak eklenecek
      set(ref(database, ruyaURL), "YENI");
      // medyumlar baky??or yazd??r
      document.getElementById("app").innerHTML = `
      <div class="container">
        <div class="row justify-content-center">
          <div class="col mt-5">
          <p class="text-center">R??ya Tapir'i bu konuda halen ??al????makta.</p>
          <p class="text-center">L??tfen daha sonra tekrar deneyiniz.</p>        
          </div>
        </div>


      <div> 
  
  `;
    }
  }).catch((error) => {
    console.error(error);
  });
}
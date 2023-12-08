var logoContainer = document.getElementById("logoContainer");
var displayBtn = document.getElementById("display");
var eventsList = document.getElementById("eventsList");
var eventsTextbox = document.getElementById("eventsTextbox");
var fullScreenBtn = document.getElementById("fullScreen");
var imageContainer = document.getElementById("imageContainer");
var html = document.getElementsByTagName("html")[0];
var logo = document.getElementById("logo");
var periodsTextbox = document.getElementById("periodsTextbox");
var periods = document.getElementById("periods");
var date = document.getElementById("date");
var dateandPeriod = document.getElementById("dateandperiods");
var current = 0;
var images = [];
var interval;
setInterval(()=>{
    var dateNow = new Date();
date.textContent = dateNow.toLocaleDateString()+" "+dateNow.toLocaleTimeString();
}, 1000)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"
const firebaseConfig = {
    apiKey: "AIzaSyDZpWSPSdLHvn36_s-88ALW8CKFhm2by1c",
    authDomain: "bernard-daily.firebaseapp.com",
    databaseURL: "https://bernard-daily-default-rtdb.firebaseio.com",
    projectId: "bernard-daily",
    storageBucket: "bernard-daily.appspot.com",
    messagingSenderId: "595792551128",
    appId: "1:595792551128:web:6760bee0f763d2ef6b8bad"
  };
  

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const imagesRef = ref(db, 'images');
  onValue(imagesRef, (snapshot) => {
    const data = snapshot.val();
    if(Array.isArray(data)){
    images = data;
    }
  });
  
logoContainer.style.display = "none";

function anim(){
    logoContainer.style.display = "block";

logoContainer.className = "logoContainer";
setTimeout(()=>{
    logoContainer.className = "logoLeave";
setTimeout(()=>{
    logoContainer.style.display = "none";
    bringBackEvents();
},1000);

},2000);
}
displayBtn.addEventListener("click", ()=>{
var rawText = eventsTextbox.value;
eventsList.innerHTML = "";
rawText.split("\n").forEach(event => {
    if(event.trim().length > 0)
eventsList.innerHTML += `<li>${event}</li>`;
    
});
periods.textContent = periodsTextbox.value;
});
function hideUneededElements(){
    displayBtn.style.display = "none";
    eventsTextbox.style.display = "none";
    fullScreenBtn.style.display = "none";
    periodsTextbox.style.display = "none";
}
fullScreenBtn.addEventListener("click", ()=>{
    if (html.requestFullscreen) {
        html.requestFullscreen();
      } else if (html.webkitRequestFullscreen) { /* Safari */
        html.webkitRequestFullscreen();
      } else if (html.msRequestFullscreen) { /* IE11 */
        html.msRequestFullscreen();
      }
      hideUneededElements();
      beginDisplaying();
    }
);
function fullscreenchanged(event) {
    if (!document.fullscreenElement) {
        displayBtn.style.display = "block";
        eventsTextbox.style.display = "block";
        fullScreenBtn.style.display = "block";
        logo.style.display = "block";
periodsTextbox.style.display = "block";
dateandPeriod.style.position = "relative";

        imageContainer.innerHTML = ``;

        clearTimeout();
        clearInterval(interval);
    }}
function beginDisplaying(){
   interval = setInterval(()=>{
        if(images.length +1>current + 1){
            current += 1;
    dateandPeriod.style.position = "absolute";
            
            imageContainer.innerHTML = `<img class="imageSlide" src="data:image/png;base64, ${images[current - 1]}"/>`
        document.getElementById("title").style.display = "none";
        document.getElementById("eventsList").style.display = "none";
    logo.style.display = "none";

        }
        else{
            imageContainer.innerHTML = ``;
            dateandPeriod.style.position = "relative";

            anim();
            
        }
    }, 10000)
}
function bringBackEvents(){
    current = 0;
            logo.style.display = "block";

            document.getElementById("title").style.display = "block";
            document.getElementById("eventsList").style.display = "block";
}
html.addEventListener("fullscreenchange", fullscreenchanged);

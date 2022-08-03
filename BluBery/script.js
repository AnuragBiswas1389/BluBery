`use strict`;

const clock = document.querySelector(".clock");
const date = document.querySelector(".date");
const notification = document.querySelector(".notif");

const btnSearch = document.getElementById("btnSearch");
const btnSetupAnswerSend = document.querySelector("#btnSend");
const btnSubmitSetupForm = document.querySelector("#btnSubmitForm");

const labelEngineName = document.getElementById("srcEngineName");
//app
const app = document.querySelector(".app");

// search engine window
const srchEngineWindow = document.querySelector(".search-selector");
const srchEngineSnapArea = document.querySelector(".search-engine-snap");
const srchEngineSnap = document.querySelector(".search-snap");

//userApps
const userApps = document.querySelector(".userApp");

//greetings
const greet = document.querySelector(".greetings");

// setup convo
const setupConvo = document.querySelector(".setup-convo");
const setupQuestion = document.querySelector(".setup-question");
const setupAnswer = document.querySelector(".setup-answer");

// form
const setupFrom = document.querySelector(".setup-form");

// setup modal
const setupModal = document.querySelector(".setup-modal");

const radioSetupBGdark = document.querySelector("#radio-bg-Dark");
const radioSetupBGlight = document.querySelector("#radio-bg-Light");
const radioSetupWeatherYes = document.querySelector("#radio-wther-yes");
const radioSetupWeatherNo = document.querySelector("#radio-wther-no");

const inputText = document.getElementById("inputSearch");
const inputSetupAnswer = document.querySelector("#inputAnswer");
// -------------------------------variables----------------
var notifID = 0;

// ---------- universal date ------------
const now = new Date();
const day = now.getDay();
const dt = now.getDate();
const month = now.getMonth();

//----------------------------------------App display control------------------------------------------

setInterval(function () {
  app.classList.add("fade-in", "add");
}, 1500);

setInterval(function () {
  userApps.classList.add( "visible");

}, 1500);

//----------------------------------------show clock------------------------------------------
setInterval(function () {
  clock.classList.add("fade-in", "add");
  date.classList.add("fade-in", "add");
}, 2500);

setInterval(showClock, 1000);
function showClock() {
  const d = new Date();

  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  if (sec % 2 == 0) {
    clock.textContent = `${hour > 12.0 ? hour - 12.0 : hour}:${min
      .toString()
      .padStart(2, "0")} ${hour > 12 ? "PM" : "AM"}`;
  } else {
    clock.textContent = `${hour > 12 ? hour - 12 : hour} ${min
      .toString()
      .padStart(2, "0")} ${hour > 12 ? "PM" : "AM"}`;
  }
}

//-----------------------------------------------show date...................
showDate(dt, month, day);
function showDate(dt = 17, mon = 9, day) {
  options = {
    day: "numeric",
    month: "long",
    weekday: "long",
  };
  const now = new Date();
  date.textContent = new Intl.DateTimeFormat("en-IN", options).format(now);
}

//------------------------------------------Location of the user---------------------------------------

var latitude;
var longitude;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  const LocTitle = `Your Location`;
  const LocConst = `Lat ${latitude}, Long ${longitude}`;
  showSnap(genSnap(LocTitle, LocConst));
}
getLocation();

//----------------------------- generating the Notification-snap-------------------------------------------

function genSnap(tit, cont, imgSrc = "") {
  let snap = `<div class="snap">
        <div class="icon">
          <img src="${imgSrc}" alt="" />
        </div>
        <div class="title">
          ${tit}
        </div>
        <div class="content">${cont}</div>
      </div>`;

  return snap;
}

//------------------------show Notification-snap-------------------------------------------------------
function showSnap(html) {
  notifID++;
  if (notifID >= 3) {
    removeSnap();
    notifID = 0;
  }
  notification.insertAdjacentHTML("afterbegin", html);
}
function removeSnap() {
  notification.innerHTML = "";
}
//-------------------------------------------------------Greetings----------------------------------------------
greeting();
function greeting() {
  var dur = "day";
  console.log(now.getHours());
  if (now.getHours() < 11.99) {
    dur = "Morning";
  }
  if (now.getHours() > 11.99 && now.getHours() < 17.99) {
    dur = "Afternoon";
  }
  if (now.getHours() > 17.99) {
    dur = "Evening";
  }
  greet.innerHTML = `Welcome onboard!!`;
  setTimeout(function () {
    greet.classList.add("fade-in");
    greet.innerHTML = `Good ${dur},<br> ${localStorage.getItem("userName")}`;
  }, 4500);
}

//--------------------------------------------setting the search Functionality-----------------------------------------

labelEngineName.innerText = "click to change engine";

setTimeout(function () {
  labelEngineName.innerText = localStorage.getItem("srchEngineName");
}, 4500);

// 1.when user selects search engine
// 2. Store the base search url in the local storage key -'srchEngineURL'
// 3. Stor the engine name in the local storage key - 'srchEngineName'

btnSearch.addEventListener("click", function (e) {
  const searchText = inputText.value.split(" ").join("+");
  console.log(searchText);
  const srchEngineURl = localStorage.getItem("srchEngineURL");

  if (searchText != "") {
    window.open(`${srchEngineURl}=${searchText}`);
  }
});

// --------------------------------------search engine selector window function---------------------

labelEngineName.addEventListener("click", function (e) {
  if (!srchEngineWindow.classList.contains("add")) {
    srchEngineWindow.classList.add("add", "fade-in");
  } else {
    srchEngineWindow.classList.add("fade-out");
    setTimeout(function () {
      srchEngineWindow.classList.remove("add", "fade-out");
    }, 150);
  }
});

//------------------------------------------local data storge------------------------------------------

// ------------------------------------------------------setup--------------------------------------------

function starter() {
  // startInterval();
  setupQuestion.innerHTML = `<h1>Let us know each other<br> shall we?<h1>`;
}

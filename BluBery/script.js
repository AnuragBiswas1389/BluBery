`use strict`;

const body = document.getElementById("body");

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
const btnSearchWindowClose = document.querySelector("#btn-search-close");

//userApps
const userApps = document.querySelector(".userApp");

//greetings
const greet = document.querySelector(".greetings");

//setup
const setup = document.querySelector(".setup");

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
var db = null; //indexedDB refernce variable
var convoComplete = false;

// ---------- universal date ------------
const now = new Date();
const day = now.getDay();
const dt = now.getDate();
const month = now.getMonth();

// --control calls--

startApp();

function startApp() {
  if (localStorage.getItem("userName") != null) {
    loadApp();
  } else {
    setUp();
  }
}

//---------------------------------------- setup------------------------------------------

function setUp() {
  app.classList.add("remove");

  //setting the bakground color
  body.classList.add("linearGradient");

  //making the setup visible
  setup.classList.add("add");

  //setting the conversation visible
  setupConvo.classList.add("add");

  //setting the setup questions visible
  setupQuestion.classList.add("fade-in");

  //setting up the next questions
  setTimeout(() => {
    setupQuestion.innerHTML = `<h1>Let us know eachother<br> shall we?</h1>`;
    setTimeout(() => {
      setupQuestion.classList.add("fade-out", "invisible");
    }, 500);
  }, 2500);
  setTimeout(() => {
    setupQuestion.classList.remove("fade-out", "invisible");
    setupQuestion.classList.add("fade-in");
    setupQuestion.innerHTML = `<h1>So, What is your name?</h1>`;
  }, 5600);

  //setting the answers visible
  setTimeout(() => {
    setupAnswer.classList.add("add", "fade-in");
    setupQuestion.classList.remove("fade-in");
  }, 5650);
  btnSetupAnswerSend.addEventListener("click", function () {
    localStorage.setItem("userName", `${inputSetupAnswer.value}`);
    setupAnswer.classList.add("fade-out", "invisible");

    setTimeout(() => {
      setupQuestion.classList.remove("fade-out", "invisible");
      setupQuestion.classList.add("fade-in");
      setupQuestion.innerHTML = `<h1>Nice to meet you<br> ${localStorage.getItem(
        "userName"
      )}!</h1>`;
    }, 1500);

    setTimeout(() => {
      setupQuestion.classList.remove("fade-in");
      setupQuestion.classList.add("fade-out", "invisible");
    }, 3000);

    setTimeout(() => {
      setupQuestion.classList.remove("fade-out", "invisible");
      setupQuestion.classList.add("fade-in");
      setupQuestion.innerHTML = `<h1>Now lets complete the last steps!</h1>`;
    }, 4500);

    setTimeout(() => {
      setupQuestion.classList.remove("fade-in");
      setupQuestion.classList.add("fade-out", "invisible");
      getOptions();
    }, 6000);
  });
  //setting the form visible-----
  function getOptions() {
    setupFrom.classList.add("add");
    //get the choices from the form and stor it in the local storage here
    btnSubmitSetupForm.addEventListener("click", function (e) {
      setupFrom.classList.add("fade-out", "invisible");
      setupModal.classList.add("add", "fade-in");
      setTimeout(() => {
        loadApp();
      }, 2000);
    });
  }
}

// -----------------------------------------------------App Loading------------------------

function loadApp() {
  setup.classList.remove("add");
  app.classList.remove("add");
  body.classList.remove("linearGradient");
  setInterval(function () {
    app.classList.add("fade-in-short", "add");
  }, 1500);

  setInterval(function () {
    userApps.classList.add("visible");
  }, 1500);
}
//----------------------------------------display clock------------------------------------------
setInterval(function () {
  clock.classList.add("fade-in-short", "add");
  date.classList.add("fade-in-short", "add");
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

//------------------------ Notification-snap-------------------------------------------------------
function showSnap(html) {
  notification.classList.add("add");
  notifID++;
  setTimeout(() => {
    removeSnap();
  }, 2500);
  notification.insertAdjacentHTML("afterbegin", html);
}
function removeSnap() {
  notification.classList.add("fade-out-short");
  setTimeout(() => {
    notification.innerHTML = "";
  }, 1500);
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

labelEngineName.innerText = "change engine?";

setTimeout(function () {
  labelEngineName.innerText = localStorage.getItem("srchEngineName");
}, 4500);

btnSearch.addEventListener("click", function (e) {
  const searchText = inputText.value.split(" ").join("+");
  console.log(searchText);
  const srchEngineURl = localStorage.getItem("srchEngineURL");

  if (searchText != "") {
    window.open(`${srchEngineURl}=${searchText}`);
  }
});

// --------------------------------------search engine selector window function---------------------

function handelSearchWindow(e) {
  if (!srchEngineWindow.classList.contains("add")) {
    srchEngineWindow.classList.add("add", "fade-in-short");
  } else {
    srchEngineWindow.classList.add("fade-out-short");
    setTimeout(function () {
      srchEngineWindow.classList.remove("add", "fade-out-short");
    }, 1500.1);
  }
}
labelEngineName.addEventListener("click", function (e) {
  handelSearchWindow();
});

btnSearchWindowClose.addEventListener("click", function (e) {
  handelSearchWindow();
});

//------------------------------------------ data storge------------------------------------------

initDB("firstDB", "3", "allNames", "id");

// objStore={name:"objectStoreName", keyPath: "keyPath"}
function initDB(dbname, version, objectStoreName, keypath) {
  const request = indexedDB.open(dbname, version);

  //on upgrade needed
  request.onupgradeneeded = (e) => {
    db = e.target.result;
    db.createObjectStore(objectStoreName, { keyPath: keypath });
  };

  request.onsuccess = (e) => {
    db = e.target.result;
  };
  request.onerror = (e) => {
    alert("Database Error Occured!" + e);
  };
}

//  insertData("firstDB", "newNames", (data = { id: "2", Name: "blue butter" }));

function insertData(dbname, dbObjName, data) {
  const request = indexedDB.open(dbname);
  const dbo = dbObjName;
  request.onsuccess = (e) => {
    db = e.target.result;
    const tx = db.transaction(dbo, "readwrite");
    const objStore = tx.objectStore(dbo);
    objStore.add(data);
  };
}

// ------------------------------------------------------App data loading--------------------------------------------

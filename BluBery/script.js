`use strict`;

const clock = document.querySelector(".clock");
const date = document.querySelector(".date");
const notification = document.querySelector(".notif");
const btnSearch = document.getElementById("btnSearch");
const inputText = document.getElementById("inputSearch");
const labelEngineName = document.getElementById("srcEngineName");

const d = new Date();
const day = d.getDay();
const dt = d.getDate();
const month = d.getMonth();

var notifID = 0;

function showClock() {
  const d = new Date();

  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  if (sec % 2 == 0) {
    clock.textContent = `${hour > 12.0 ? hour - 12.0 : hour}:${min} ${
      hour > 12 ? "pm" : "am"
    }`;
  } else {
    clock.textContent = `${hour > 12 ? hour - 12 : hour} ${min} ${
      hour > 12 ? "pm" : "am"
    }`;
  }
}

setInterval(showClock, 1000);
showDate(dt, month, day - 1);

//show date...................

function showDate(dt = 17, mon = 9, day) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satarday",
    "Sunday",
  ];
  date.textContent = `${dt} ${month[mon]}, ${days[day]}`;
}

//Location of the user...................

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

// generating the snap
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

//setInterval(getLocation, 1000);

//show snap
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

//setting the search Functionality.....


var select =1;
var searcher='google';

  // add search engines here.. and there search pattern..
const searchEngine ={
  const dname = ['google','duckduckgo','youtube'] 

};

  //change the searchEngine on click 
labelEngineName.addEventListener('click', function(e){
  
 labelEngineName.textContent="hello";
  
})

btnSearch.addEventListener("click", function (e) {
  const searchText = inputText.value.split(" ").join("+");
  console.log(searchText);
  if (searchText != "") {
    window.open(`https://www.google.com/search?q=${searchText}`);
  }
});

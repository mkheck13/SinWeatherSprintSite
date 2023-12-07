import { apiKey } from "./enviroment.js";


let searchBar = document.getElementById('searchBar');
let searchBtn = document.getElementById('searchBtn');
let cityName = document.getElementById('cityName');
let curDate = document.getElementById('curDate');
let curTemp = document.getElementById('curTemp');
let curHi = document.getElementById('curHi');
let curLo = document.getElementById('curLo');
let feelLike = document.getElementById('feelLike');
let curHum = document.getElementById('curHum');
let curWind = document.getElementById('curWind');
let curWeId = document.getElementById('curWeId');
let weatherDes = document.getElementById('weatherDes');

let lat;
let lon;

let citySearch = document.getElementById('citySearch');
let curDay = document.getElementById('curDay');
let favBtn = document.getElementById("favBtn");

//Current Date
const dateObject = new Date();
curDate.innerText = dateObject.toLocaleDateString("default", { weekday: "long", month: "long", day: "numeric" });

//Five Day Dates
//Day 1
// let dayOne = document.getElementById('dayOne');
// let dayOneImage = document.getElementById('dayOneImage');
// let day1Des = document.getElementById('day1Des');
// let day1Hi = document.getElementById('day1Hi');
// let day1Lo = document.getElementById('day1Lo');

//Day 2
// let dayTwo = document.getElementById('dayTwo');
// let dayTwoImage = document.getElementById('dayTwoImage');
// let day2Des = document.getElementById('day2Des');
// let day2Hi = document.getElementById('day2Hi');
// let day2Lo = document.getElementById('day2Lo');

//Day 3
// let dayThree = document.getElementById('dayThree');
// let dayThreeImage = document.getElementById('dayThreeImage');
// let day3Des = document.getElementById('day3Des');
// let day3Hi = document.getElementById('day3Hi');
// let day3Lo = document.getElementById('day3Lo');

//Day 4
// let dayFour = document.getElementById('dayFour');
// let dayFourImage = document.getElementById('dayFourImage');
// let day4Des = document.getElementById('day4Des');
// let day4Hi = document.getElementById('day4Hi');
// let day4Lo = document.getElementById('day4Lo');

//Day5
// let dayFive = document.getElementById('dayFive');
// let dayFiveImage = document.getElementById('dayFiveImage');
// let day5Des = document.getElementById('day5Des');
// let day5Hi = document.getElementById('day5Hi');
// let day5Lo = document.getElementById('day5Lo');




//User Location

navigator.geolocation.getCurrentPosition(success);

//search bar

async function success(position) {
   

    //arrays

    // let day1MaxAr = []
    // let day2MaxAr = []
    // let day3MaxAr = []
    // let day4MaxAr = []
    // let day5MaxAr = []

    // let day1MinAr = []
    // let day2MinAr = []
    // let day3MinAr = []
    // let day4MinAr = []
    // let day5MinAr = []

    // let day1StatusAr = []
    // let day2StatusAr = []
    // let day3StatusAr = []
    // let day4StatusAr = []
    // let day5StatusAr = []







    if (searchBar.value) {
        const citySearch = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&limit=1&appid=${apiKey}`);
        const cityName = await citySearch.json();
        lat = cityName[0].lat;
        lon = cityName[0].lon;
    }

    else {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
       
    

        


    }
     const now = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    const currentWeather = await now.json()
    cityName.innerText = currentWeather.name;
    curTemp.innerText = Math.round(currentWeather.main.temp) + "°";
    curHi.innerText =  "Hi:" + Math.round(currentWeather.main.temp_max) + "°";
    curLo.innerText = "Lo:" + Math.round(currentWeather.main.temp_min) + "°";
    feelLike.innerText = "Feels Like:" + Math.round(currentWeather.main.feels_like) + "°";
    curHum.innerText = "Humidity" + Math.round(currentWeather.main.humidity) + "%";
    curWind.innerText = "Wind:" + Math.round(currentWeather.wind.speed) + " mph";
    curWeId.src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
    weatherDes.innerText = currentWeather.weather[0].description;




}
searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        success(searchBar.value)
        e.preventDefault();
        return false;
    }
});

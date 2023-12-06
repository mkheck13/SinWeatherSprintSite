import {apiKey} from "./enviroment.js";

//Current Day

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

//Next Day

let dayTwo = document.getElementById('dayTwo');
let twoDes = document.getElementById('twoDes');
let twoHigh = document.getElementById('twoHigh');
let twoLow = document.getElementById('twoLow');

//Date
const dateObject = new Date();
curDate.innerText = dateObject.toLocaleDateString("default",{weekday:"long", month:"long",day:"numeric"});

//Fetch API
async function apiCall(){
    const promise = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=london&limit=1&appid=${apiKey}`);
    const data = await promise.json()
    console.log(data[0].name)
    cityName.innerText = data[0].name;
    
}
apiCall()

async function apiLat(){
    const latProm =await fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&appid=${apiKey}&units=imperial`)
    const latData = await latProm.json()
    console.log(latData.list[0].main.temp)
    curTemp.innerText = Math.round(latData.list[0].main.temp) + "°";
    curHi.innerText = Math.round(latData.list[0].main.temp_max) + "°";
    curLo.innerText = Math.round(latData.list[0].main.temp_min) + "°";
    feelLike.innerText = Math.round(latData.list[0].main.feels_like) + "°";
    curHum.innerText = Math.round(latData.list[0].main.humidity) + "%";
    curWind.innerText = Math.round(latData.list[0].wind.speed) + " mph";
    curWeId.src = `https://openweathermap.org/img/wn/${latData.list[0].weather[0].icon}@2x.png`;
    weatherDes.innerText = latData.list[0].weather[0].description;

    

    
    

}
apiLat()



//ID's
let citySearch = document.getElementById('citySearch');
let curDay = document.getElementById('curDay');
let favBtn = document.getElementById("favBtn");













//day
//icon
//high
//low









//Day 3

//day
//icon
//high
//low






//Day 4

//day
//icon
//high
//low





//Day 5

//day
//icon
//high
//low

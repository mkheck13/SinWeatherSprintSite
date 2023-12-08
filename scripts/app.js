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
let dayOne = document.getElementById('dayOne');
let dayOneImage = document.getElementById('dayOneImage');
let day1Des = document.getElementById('day1Des');
let day1Hi = document.getElementById('day1Hi');
let day1Lo = document.getElementById('day1Lo');
let day1HL = document.getElementById('day1HL');

//Day 2
let dayTwo = document.getElementById('dayTwo');
let dayTwoImage = document.getElementById('dayTwoImage');
let day2Des = document.getElementById('day2Des');
let day2Hi = document.getElementById('day2Hi');
let day2Lo = document.getElementById('day2Lo');
let day2HL = document.getElementById('day2HL');

//Day 3
let dayThree = document.getElementById('dayThree');
let dayThreeImage = document.getElementById('dayThreeImage');
let day3Des = document.getElementById('day3Des');
let day3Hi = document.getElementById('day3Hi');
let day3Lo = document.getElementById('day3Lo');
let day3HL = document.getElementById('day3HL');

//Day 4
let dayFour = document.getElementById('dayFour');
let dayFourImage = document.getElementById('dayFourImage');
let day4Des = document.getElementById('day4Des');
let day4Hi = document.getElementById('day4Hi');
let day4Lo = document.getElementById('day4Lo');
let day4HL = document.getElementById('day4HL');

//Day5
let dayFive = document.getElementById('dayFive');
let dayFiveImage = document.getElementById('dayFiveImage');
let day5Des = document.getElementById('day5Des');
let day5Hi = document.getElementById('day5Hi');
let day5Lo = document.getElementById('day5Lo');
let day5HL = document.getElementById('day5HL');

function mostFrequent(arr, n) 
{ 
	let count = new Map(); 
	for (var i = 0; i < n; i++) 
	{ 
		if(count.has(arr[i])) 
			count.set(arr[i], count.get(arr[i])+1) 
		else
			count.set(arr[i], 1) 
	} 
	let maxCount = 0, res = -1; 
	count.forEach((value,key) => { 
		
		if (maxCount < value) { 
			res = key; 
			maxCount = value; 
		} 
	}); 
	return res; 
} 








searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        success(searchBar.value)
        e.preventDefault();
        searchBar.value = '';
        return false;
    }
});


//User Location

navigator.geolocation.getCurrentPosition(success);

//search bar

async function success(position) {
   
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

    async function getCity(){
        const promise = await fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`
          );
          const data = await promise.json();
          console.log(data[0]);
          if(!data[0].state){
            cityName.innerText = `${data[0].name}, ${data[0].country}`;
          }else{
            cityName.innerText = `${data[0].name}, ${data[0].state}`;
          }
      }
      getCity();











async function fiveDayCall(){
    const fiveDayPromise = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    const fiveDayData = await fiveDayPromise.json();
    console.log(fiveDayData);

    let currentDay = new Date();

     let day1Day = new Date(currentDay.getTime() + 86400000)
     let day2Day = new Date(currentDay.getTime() + 86400000 * 2)
     let day3Day = new Date(currentDay.getTime() + 86400000 * 3)
     let day4Day = new Date(currentDay.getTime() + 86400000 * 4)
     let day5Day = new Date(currentDay.getTime() + 86400000 * 5)

     dayOne.innerText = `${day1Day.toLocaleDateString('default', {weekday: 'short'})}`;
     dayTwo.innerText = `${day2Day.toLocaleDateString('default', {weekday: 'short'})}`;
     dayThree.innerText = `${day3Day.toLocaleDateString('default', {weekday: 'short'})}`;
     dayFour.innerText = `${day4Day.toLocaleDateString('default', {weekday: 'short'})}`;
     dayFive.innerText = `${day5Day.toLocaleDateString('default', {weekday: 'short'})}`;

    let day1MaxAr = []
    let day2MaxAr = []
    let day3MaxAr = []
    let day4MaxAr = []
    let day5MaxAr = []

    let day1MinAr = []
    let day2MinAr = []
    let day3MinAr = []
    let day4MinAr = []
    let day5MinAr = []

    let day1StatusAr = []
    let day2StatusAr = []
    let day3StatusAr = []
    let day4StatusAr = []
    let day5StatusAr = []

    for(let i = 0; i < fiveDayData.list.length; i++){
        let d = new Date(fiveDayData.list[i].dt * 1000);
        if(d.toLocaleDateString('default') === day1Day.toLocaleDateString('default')){
            day1MaxAr.push(fiveDayData.list[i].main.temp_max)
            day1MinAr.push(fiveDayData.list[i].main.temp_min)
            day1StatusAr.push(fiveDayData.list[i].weather[0].description)
        }else if(d.toLocaleDateString('default') === day2Day.toLocaleDateString('default')){
            day2MaxAr.push(fiveDayData.list[i].main.temp_max)
            day2MinAr.push(fiveDayData.list[i].main.temp_min)
            day2StatusAr.push(fiveDayData.list[i].weather[0].description)
        }else if(d.toLocaleDateString('default') === day3Day.toLocaleDateString('default')){
            day3MaxAr.push(fiveDayData.list[i].main.temp_max)
            day3MinAr.push(fiveDayData.list[i].main.temp_min)
            day3StatusAr.push(fiveDayData.list[i].weather[0].description)
        }else if(d.toLocaleDateString('default') === day4Day.toLocaleDateString('default')){
            day4MaxAr.push(fiveDayData.list[i].main.temp_max)
            day4MinAr.push(fiveDayData.list[i].main.temp_min)
            day4StatusAr.push(fiveDayData.list[i].weather[0].description)
        }else if(d.toLocaleDateString('default') === day5Day.toLocaleDateString('default')){
            day5MaxAr.push(fiveDayData.list[i].main.temp_max)
            day5MinAr.push(fiveDayData.list[i].main.temp_min)
            day5StatusAr.push(fiveDayData.list[i].weather[0].description)
        }
    }

    day1HL.innerHTML = `H: ${Math.floor(Math.max(...day1Hi))}\u00B0 <br>L: ${Math.floor(Math.min(...day1Lo))}\u00B0`



}

fiveDayCall();
}

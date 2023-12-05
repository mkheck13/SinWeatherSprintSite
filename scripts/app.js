import {apiKey} from "./enviroment.js"

//Define API
const apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'; 

//Fetch API
fetch (apiURL)




//ID's
let citySearch = document.getElementById('citySearch').value;
let curDay = document.getElementById('curDay');



//Date
const date = new Date();

let longDay





// require('dotenv').config();

// console.log(process.env);

var cityNameInput = document.querySelector('.inputValue')

var weatherToday = document.querySelector('.weather_basic')
var locationValue = document.querySelector('.location')
var currentDate = document.querySelector('.date')
var currentTemp = document.querySelector('.temp')
var currentWind = document.querySelector('.wind')
var currentHumidity = document.querySelector('.humidity')
var currentUvIndex = document.querySelector('.uvIndex')
var weatherIcon = document.querySelector(".imgClass")
var clickedBtn = document.querySelector('#search-btn')
// const API_KEY = '8b0ee70544e38a07264d7619ab273e85'
// const api_key = process.env.API_KEY;



// to show weather of the city

clickedBtn.addEventListener('click', getApi)

function getApi(locationUrl) {

    var locationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityNameInput.value + "&appid=" + API_KEY

    fetch(locationUrl)
        .then(response => response.json())
        .then(data => {
            let lat = data[0]["lat"]
            let lon = data[0]["lon"]

            console.log(lat, lon)
            console.log(data)

            return fetch("https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + API_KEY + "&units=imperial")
                .then(response => response.json())
                .then(data => {

                    let today = new Date()
                    let temp = data["current"]["temp"]
                    let wind = data["current"]["wind_speed"]
                    let humidity = data["current"]["humidity"]
                    let uvIndex = data["current"]["uvi"]

                    locationValue.innerHTML = cityNameInput.value
                    currentDate.innerHTML = today.toLocaleDateString();

                    currentTemp.innerHTML = "Temp: " + temp
                    currentWind.innerHTML = "Wind: " + wind
                    currentHumidity.innerHTML = "Humidity: " + humidity
                    currentUvIndex.innerHTML = "UV Index: " + uvIndex


                    for (let i = 0; i < 5; i++) {

                        var fiveDate = document.querySelector('.fiveDate' + (i + 1))
                        var fiveTemp = document.querySelector('.fiveTemp' + (i + 1))
                        var fiveWind = document.querySelector('.fiveWind' + (i + 1))
                        var fiveHumidity = document.querySelector('.fiveHumidity' + (i + 1))

                        fiveDate.innerHTML += (i + 1) + "day from today"
                        fiveTemp.innerHTML += "Temp: " + data["daily"][i]["temp"]["day"]
                        fiveWind.innerHTML += "Wind speed: " + data["daily"][i]["wind_speed"]
                        fiveHumidity.innerHTML += "Humidity: " + data["daily"][i]["humidity"];


                    }
                })
                .catch(err => console.log("ERROR!!!"))
        })
}

// to add/list city buttons, store the info in localStorage

clickedBtn.addEventListener('click', cityList)

function cityList(e) {
    e.preventDefault();

    let addCity = document.createElement("button")
    addCity.innerText = cityNameInput.value
    document.querySelector('.searchBox').appendChild(addCity)

    localStorage.setItem("city", cityNameInput.value)
}
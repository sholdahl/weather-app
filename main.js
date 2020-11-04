let apiKey = "6a59599161e25544cfa33a3cbcc8491d",
    weatherData = {
        city: "minneapolis",
        uom: "imperial",
    },
    searchData = "Minneapolis",
    cityDisplay = document.querySelector("#city"),
    descDisplay = document.querySelector("#description"),
    tempDisplay = document.querySelector("#temp"),
    dateDisplay = document.querySelector("#date-value"),
    highDisplay = document.querySelector("#high"),
    lowDisplay = document.querySelector("#low"),
    date = new Date(),
    dd = String(date.getDate()),
    mm = String(date.getMonth() + 1),
    yyyy = date.getFullYear(),
    today = mm + '/' + dd + '/' + yyyy;

console.log(searchData)

const getWeatherData = async () => {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=${apiKey}&units=${weatherData.uom}`);
        let responseData = await response.json()
        weatherData.temp = Math.round(responseData.main.temp);
        weatherData.tempMin = Math.round(responseData.main.temp_min);
        weatherData.tempMax = Math.round(responseData.main.temp_max);
        weatherData.humidity = responseData.main.humidity;
        weatherData.feelsLike = responseData.main.feels_like;
        weatherData.extDescription = responseData.weather[0].description;
        weatherData.description = responseData.weather[0].main;
        weatherData.windSpeed = responseData.wind.speed;
        weatherData.windDeg = responseData.wind.deg;
        weatherData.sunrise = responseData.sys.sunrise;
        weatherData.sunset = responseData.sys.sunset;
        weatherData.city = searchData;
        cityDisplay.textContent = weatherData.city;
        descDisplay.textContent = weatherData.description;
        tempDisplay.textContent = weatherData.temp + "°f";
        dateDisplay.textContent = today;
        highDisplay.textContent = weatherData.tempMax;
        lowDisplay.textContent = weatherData.tempMin;
    } catch(e) {
        console.error(e)
        console.log(`${searchData} was not found. Try another city!`)
    }

    console.log(weatherData)
}

const displayData = () => {
    cityDisplay.textContent = weatherData.city;
    descDisplay.textContent = weatherData.description;
    tempDisplay.textContent = weatherData.temp + "°f";
    dateDisplay.textContent = today;
    highDisplay.textContent = weatherData.tempMax;
    lowDisplay.textContent = weatherData.tempMin;
}


// event listeners

let handleKeypress = (e) => {
    if (e.key === "Enter") {
        searchData = document.querySelector("input").value;
        getWeatherData();
        displayData();
    }
}

window.addEventListener("keypress", handleKeypress);

getWeatherData();


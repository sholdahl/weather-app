let apiKey = "6a59599161e25544cfa33a3cbcc8491d",
    weatherData = {
        city: "minneapolis",
        uom: "imperial",
    },
    searchData = "Minneapolis"

console.log(searchData)

const getWeatherData = async () => {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=${apiKey}&units=${weatherData.uom}`);
        let responseData = await response.json()
        weatherData.temp = responseData.main.temp;
        weatherData.tempMin = responseData.main.temp_min;
        weatherData.tempMax = responseData.main.temp_max;
        weatherData.humidity = responseData.main.humidity;
        weatherData.feelsLike = responseData.main.feels_like;
        weatherData.extDescription = responseData.weather[0].description;
        weatherData.description = responseData.weather[0].main;
        weatherData.windSpeed = responseData.wind.speed;
        weatherData.windDeg = responseData.wind.deg;
        weatherData.sunrise = responseData.sys.sunrise;
        weatherData.sunset = responseData.sys.sunset;
        weatherData.city = searchData;
    } catch {
        console.log(`${searchData} was not found. Try another city!`)
    }

    console.log(weatherData)
}

getWeatherData()

// event listeners

let handleKeypress = (e) => {
    if (e.key === "Enter") {
        searchData = document.querySelector("input").value;
        getWeatherData()
    }
}

window.addEventListener("keypress", handleKeypress);


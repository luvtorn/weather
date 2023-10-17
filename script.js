
const weatherPlace = document.querySelector(".weather-info")
const weatherForm = document.querySelector(".weatherForm")
const weatherCity = document.querySelector(".cities")
const weatherApi = "1b02324090365e3967a6c32c018594fd"

weatherForm.addEventListener("submit", (e) => {
  let city = weatherCity.value
  const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`

  async function getWeather() {
    let weatherIcon = ``
    const resultLink = await fetch(link)
    const data = await resultLink.json()
    const weather = await data.weather.find((elem) => elem.main) // чтобы получить данные из массива обьектов (погодные условия, глянь апишку если что)
    let date = new Date().toLocaleString()

    if (weather.main === "Clouds") {
      weatherIcon = `<div class="icon" >
            <div class="cloud2 small-cloud"></div>
            <div class="cloud2"></div>
          </div>`
    } else if (weather.main === "Thunderstorm") {
      weatherIcon = `<div class="icon" >
            <div class= "cloud2"></div>
            <div class="thunder">
              <div class="bolt"></div>
                <div class="bolt"></div>
            </div>
          </div>`
    } else if (weather.main === "Drizzle") {
      weatherIcon = `<div class="icon">
            <div class="cloud2"></div>
            <div class="drizzle"></div>
        </div>`
    } else if (weather.main === "Rain") {
      weatherIcon = ` <div class="icon">
            <div class="cloud2"></div>
            <div class="rain"></div>
          </div>`
    } else if (weather.main === "Snow") {
      weatherIcon = `<div class="icon">
            <div class="cloud2"></div>
            <div class="snow">
            <div class="flake"></div>
            <div class="flake"></div>
            <div class="flake"></div>
            <div class="flake"></div>
              </div>
        </div>`
    } else if (weather.main === "Atmosphere") {
      weatherIcon = `<div class="icon">
            <div class="extreme text-center">
              <div class="harsh-wind"></div>
              <div class="harsh-wind"></div>
              <div class="harsh-wind"></div>
              <div class="harsh-wind"></div>
              <div class="harsh-wind"></div>
              <div class="harsh-wind"></div>
              <div class="harsh-wind"></div>
            </div>
          </div>`
    } else if (weather.main === "Clear") {
      weatherIcon = `<div class="icon">
            <div class="rays">
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            </div>
            <div class="sun"></div>
          </div>`
    }

    const weatherArr = {
      temp: Math.trunc(data.main.temp - 273),
      isCloudly: weather.description[0].toUpperCase() + weather.description.slice(1),
      wind: data.wind.speed,
      feelsTemp: Math.trunc(data.main.feels_like - 273),
    }

    let weatherInfo = `<h2 id="cityName">${city}</h2>
    <p>${date}</p>
    <div class="weather-text">
      <p id="temperature">Температура: ${weatherArr.temp}&#176</p>
      <p>Ощущается как: ${weatherArr.feelsTemp}&#176</p>
      <p id="description">Погодные условия: ${weatherArr.isCloudly}</p> 
      <p>Скорость ветра: ${weatherArr.wind} м/с</p>
      ${weatherIcon}
    </div>`

    switch (weatherCity.value) {
      case "Minsk":
        weatherPlace.innerHTML = weatherInfo
        break;
      case "Berlin":
        weatherPlace.innerHTML = weatherInfo
        break;
      case "Warsaw":
        weatherPlace.innerHTML = weatherInfo
        break;
      case "Trzcianka":
        weatherPlace.innerHTML = weatherInfo
        break;
      case "Bialystok":
        weatherPlace.innerHTML = weatherInfo
        break;
    }
  }

  getWeather()

  e.preventDefault()
})

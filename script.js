
const weatherPlace = document.querySelector(".weather-info")
const weatherForm = document.querySelector(".weatherForm")
const weatherCity = document.querySelector(".cities")
const weatherApi = "1b02324090365e3967a6c32c018594fd"

const icons = {
  Clouds: "icons/cloud.png",
  Drizzle: "icons/drizzle.png",
  Snow: "icons/snow.png",
  Rain: "icons/rain.png",
  Atmosphere: "icons/tornado.png",
  Clear: "icons/sun.png",
  Thunderstorm: "icons/thunderstorm.png",
  Fog: "icons/fog.png",
}

async function getWeather(link, city) {
  try {
    const response = await fetch(link)
    const data = await response.json()
    const weather = await data.weather.find((elem) => elem) // я так и не понял, какой другой способ...

    const weatherInfo = {
      temp: Math.trunc(data.main.temp - 273),
      isCloudly: weather.description[0].toUpperCase() + weather.description.slice(1),
      wind: data.wind.speed,
      feelsTemp: Math.trunc(data.main.feels_like - 273),
    }

    weatherPlace.innerHTML = `<h2 id="cityName">${city}</h2>
  <p>${new Date().toLocaleString()}</p>
  <div class="weather-text">
    <p id="temperature">Температура: ${weatherInfo.temp}&#176</p>
    <p>Ощущается как: ${weatherInfo.feelsTemp}&#176</p>
    <p id="description">Погодные условия: ${weatherInfo.isCloudly}</p> 
    <p>Скорость ветра: ${weatherInfo.wind} м/с</p>
    <img src="${icons[weather.main]}" alt="">
  </div>`
  } catch (e) {
    console.error(e)
  }
}

weatherForm.addEventListener("submit", (e) => {
  const city = weatherCity.value
  const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${weatherApi}`

  getWeather(link, city)

  e.preventDefault()
})

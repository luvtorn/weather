
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
}

async function getWeather(link, city) {
  let weatherIcon = ``
  const resultLink = await fetch(link)
  const data = await resultLink.json()
  const weather = await data.weather.find((elem) => elem.main) // чтобы получить данные из массива обьектов (погодные условия, глянь апишку если что)
  let date = new Date().toLocaleString()

  const weatherArr = {
    temp: Math.trunc(data.main.temp - 273),
    isCloudly: weather.description[0].toUpperCase() + weather.description.slice(1),
    wind: data.wind.speed,
    feelsTemp: Math.trunc(data.main.feels_like - 273),
  }

  weatherIcon = icons[weather.main]

  let weatherInfo = `<h2 id="cityName">${city}</h2>
  <p>${date}</p>
  <div class="weather-text">
    <p id="temperature">Температура: ${weatherArr.temp}&#176</p>
    <p>Ощущается как: ${weatherArr.feelsTemp}&#176</p>
    <p id="description">Погодные условия: ${weatherArr.isCloudly}</p> 
    <p>Скорость ветра: ${weatherArr.wind} м/с</p>
    <img src="${weatherIcon}" alt="">
  </div>`

  switch (weatherCity.value) {
    case "Minsk":
    case "Berlin":
    case "Warsaw":
    case "Trzcianka":
    case "Bialystok":
      weatherPlace.innerHTML = weatherInfo
      break;
  }
}

weatherForm.addEventListener("submit", (e) => {
  let city = weatherCity.value
  const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${weatherApi}`

  getWeather(link, city)

  e.preventDefault()
})

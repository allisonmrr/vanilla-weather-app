function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "4b32d099d56b1bcaf39ac804454fcf6a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherConditions(response) {
  let tempDisplay = document.querySelector("#temperature");
  let cityDisplay = document.querySelector("#city");
  let descriptionDisplay = document.querySelector("#dayOverview");
  let humidityDisplay = document.querySelector("#humidity");
  let windDisplay = document.querySelector("#wind");
  let dateDisplay = document.querySelector("#time-id");
  let feelsLikeDisplay = document.querySelector("#feels-like");
  let iconDisplay = document.querySelector("#icon");

  fahrenheitTemp = Math.round(response.data.main.temp);

  tempDisplay.innerHTML = fahrenheitTemp;
  cityDisplay.innerHTML = response.data.name;
  descriptionDisplay.innerHTML = response.data.weather[0].description;
  humidityDisplay.innerHTML = response.data.main.humidity;
  windDisplay.innerHTML = Math.round(response.data.wind.speed);
  dateDisplay.innerHTML = formatDate(response.data.dt * 1000);
  feelsLikeDisplay.innerHTML = Math.round(response.data.main.feels_like);
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].description);

  console.log(response.data);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4b32d099d56b1bcaf39ac804454fcf6a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputDisplay = document.querySelector("#city-search-id");
  search(cityInputDisplay.value);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  fahrenheitLink.remove("active");
  celsiusLink.add("active");
  let celsiusTemp = (fahrenheitTemp - 32) * 0.5556;
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let tempElement = document.querySelector("#temperature");
  tempElement = fahrenheitTemp;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("Minneapolis");

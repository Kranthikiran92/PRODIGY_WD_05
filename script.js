let currentCity = "Panvel";
let units = "metric";

const city = document.querySelector(".weather__city");
const datetime = document.querySelector(".weather__datetime");
const weather__forecast = document.querySelector(".weather__forecast");
const weather__temperature = document.querySelector(".weather__temperature");
const weather__icon = document.querySelector(".weather__icon");
const weather__minmax = document.querySelector(".weather__minmax");
const weather__realfeel = document.querySelector(".weather__realfeel");
const weather__humidity = document.querySelector(".weather__humidity");
const weather__wind = document.querySelector(".weather__wind");
const weather__pressure = document.querySelector(".weather__pressure");
const weather__search = document.querySelector(".weather__search");

weather__search.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector(".weather__searchform");
  currentCity = search.value;
  getWeather();
  search.value = "";
});

document.querySelector(".unit__celsius").addEventListener("click", () => {
  if (units !== "metric") {
    units = "metric";
    getWeather();
  }
});

document.querySelector(".unit__fahrenheit").addEventListener("click", () => {
  if (units !== "imperial") {
    units = "imperial";
    getWeather();
  }
});

function convertCountryCode(country) {
  const regionName = new Intl.DisplayNames(["en"], { type: "region" });
  return regionName.of(country);
}

function convertTimestamp(timestamp, timezone) {
  const dt = luxon.DateTime.fromSeconds(timestamp).setZone('utc').plus({ seconds: timezone });
  return dt.toFormat('cccc, dd LLL yyyy, t');
}

function getWeather() {
  const API_KEY = "301b2274c2b27006054540658c62d671"; // Replace with your actual OpenWeatherMap API key
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
        datetime.innerHTML = convertTimestamp(data.dt, data.timezone);
        weather__forecast.innerHTML = `<p>${data.weather[0].description}</p>`;
        weather__temperature.innerHTML = `${data.main.temp.toFixed(1)}&deg`;
        weather__icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="${data.weather[0].description}">`;
        weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed(1)}&deg;</p><p>Max: ${data.main.temp_max.toFixed(1)}&deg;</p>`;
        weather__realfeel.innerHTML = `${data.main.feels_like.toFixed(1)}&deg`;
        weather__humidity.innerHTML = `${data.main.humidity}%`;
        weather__wind.innerHTML = `${data.wind.speed}${units === "imperial" ? " mph" : " m/s"}`;
        weather__pressure.innerHTML = `${data.main.pressure} hPa`;
      } else {
        alert("City not found. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching weather data. Please try again later.");
    });
}

document.addEventListener("DOMContentLoaded", getWeather);

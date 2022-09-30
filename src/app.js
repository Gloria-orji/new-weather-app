function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
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
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                width="42"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">24°</span
                ><span class="weather-forecast-temperature-min">12°</span>
              </div>
            </div>
          `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-heading").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celciusTemp = Math.round(response.data.main.temp);
}
function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-butt").value;
  searchCity(city);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  document.querySelector("#temp-heading").innerHTML =
    Math.round(fahrenheitTemp);
}
function displaycelciusTemp(event) {
  event.preventDefault();
  document.querySelector("#temp-heading").innerHTML = Math.round(celciusTemp);
}
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("New york");
let celciusTemp = null;
let fahrLink = document.querySelector("#fahr");
fahrLink.addEventListener("click", displayFahrenheitTemp);
let celLink = document.querySelector("#cel");
celLink.addEventListener("click", displaycelciusTemp);
displayForecast();

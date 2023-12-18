const searchButton = document.getElementById('search-button');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

searchButton.addEventListener('click', function () {
  const location = locationInput.value;

  getTemperature(location)
    .then(function (temperature) {
      weatherInfo.textContent = `Weather in ${location}: ${temperature}°C`;
    })
    .catch(function (error) {
      weatherInfo.textContent = 'Error fetching weather data';
      console.error(error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the elements where you want to display the date and time
    const currentDateTimeElement = document.getElementById("current-date-time");

    // Get the current date and time
    const currentDateTime = new Date();

    // Format the date (adjust as needed)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDateTime.toLocaleDateString('en-US', options);

    // Format the time (adjust as needed)
    const formattedTime = currentDateTime.toLocaleTimeString('en-US');

    // Update the content of the HTML element with the formatted date and time
    currentDateTimeElement.textContent = `Current Date: ${formattedDate}, Time: ${formattedTime}`;
});



function getTemperature(location) {
  const apiKey = 'a2f73ba4dd15883af62c4681c5e26b29';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  return fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      return response.json();
    })
    .then(function (data) {
      return data.main.temp;
    });
}
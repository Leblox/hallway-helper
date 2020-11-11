import { elements } from './base';

export const renderWeather = forecast => {
    console.log(forecast.weather);

    let weatherIconMarkup = `
        <img class="weather__icon" src='./assets/images/${forecast.weather}.svg' style="fill: #ffffff;" alt="Symbol for '${weatherOptions[forecast.weather]}' weather">
    `;

    elements.weatherIcon.innerHTML = weatherIconMarkup;
    elements.weatherDesc.innerHTML = weatherOptions[forecast.weather];
    elements.weatherTemp.innerHTML = `${forecast.temp2m.max}&deg;`;
}

export const clearWeather = () => {
    elements.weatherIcon.innerHTML = '';
    elements.weatherTemp.innerHTML= '';
    elements.weatherDesc.innerHTML = '';
}

const weatherOptions = 
    {
        clear: 'Sunny',
        pcloudy: 'Partly cloudy',
        mcloudy: 'Cloudy',
        cloudy: 'Very cloudy',
        humid: 'Foggy',
        lighrain: 'Light showers',
        oshower: 'Occasional showers',
        ishower: 'Isolated showers',
        lightsnow: 'Light snow',
        rain: 'Rain', 
        snow: 'Snow', 
        rainsnow: 'Freezing rain'
    }
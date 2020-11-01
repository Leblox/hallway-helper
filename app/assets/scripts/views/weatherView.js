import { elements } from './base';

export const renderWeather = forecast => {
    console.log(forecast);

    elements.weatherSection.innerHTML = forecast;
}

export const clearWeather = () => {
    elements.weatherSection.innerHTML = '';
}


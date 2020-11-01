import '../styles/styles.css';

if (module.hot) {
    module.hot.accept()
  }

// *********************************
// APPLICATION
// *********************************


import Buses from './models/Buses';
import Quote from './models/Quote';
import Weather from './models/Weather';
import * as busView from './views/busView';
import * as weatherView from './views/weatherView';

const state = {};

const controlSearch = async () => {
    state.buses = new Buses();

    try {
        // Get arrival data from API
        await state.buses.getArrivals();
        console.log(state.buses.arrivalData);

        // Clear old data from UI and render results
        busView.clearBuses();
        busView.renderBuses(state.buses.arrivalData);
    
    } catch (error) {
        console.log('Something went wrong with the search.');
    }
}

const controlQuote = async () => {
    state.quote = new Quote();

    try {
        await state.quote.getQuote();
    } catch {
        console.log("Something went wrong with the Quote.")
    }
}

const controlWeather = async () => {
    state.weather = new Weather();

    try {
        await state.weather.getWeather();
        //console.log(state.weather.forecast.weather);
        weatherView.clearWeather();
        weatherView.renderWeather(state.weather.forecast.weather);

    } catch (error) {
        console.log(error)
    }
}

//controlSearch();
//controlQuote();
controlWeather();

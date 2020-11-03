import '../styles/styles.css';

if (module.hot) {
    module.hot.accept()
  }

// *******************************
// APPLICATION
// *********************************


import Buses from './models/Buses';
import Quote from './models/Quote';
import Weather from './models/Weather';
import * as busView from './views/busView';
import * as weatherView from './views/weatherView';
import * as quoteView from './views/quoteView';
import * as timeView from './views/timeView';
import Time from './models/Time';

const state = {};

const controlSearch = async () => {
    state.buses = new Buses();

    try {
        // Get arrival data from AI
        await state.buses.getArrivals();
        
        // Render station name and destinations
        //console.log(state.buses.busStopName);
        busView.clearBusStopName();
        busView.renderStopName(state.buses.busStopName);

        // Clear old data from UI and render results
        busView.clearBuses();
        busView.renderBusTimes(state.buses.arrivalData);
    
    } catch (error) {
        console.log(error);
    }
}

const controlQuote = async () => {
    state.quote = new Quote();

    try {
        await state.quote.getQuote();

        //console.log(state.quote);
        quoteView.renderQuote(state.quote.affirmation);

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

const controlTime = () => {
    state.time = new Time();

    // Updates the time every 15 seconds
    setInterval(state.time.getTime(), 10000);
    setInterval(timeView.renderTime(state.time.time), 10000);
}

controlSearch();
controlQuote();
// controlWeather();
controlTime();

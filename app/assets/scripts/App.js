import '../styles/styles.css';

if (module.hot) {
    module.hot.accept()
  }

// *******************************
// APPLICATION
// *********************************

import { elements, renderLoader, clearLoader } from './views/base';
import Buses from './models/Buses';
import Quote from './models/Quote';
import Weather from './models/Weather';
import * as busView from './views/busView';
import * as weatherView from './views/weatherView';
import * as quoteView from './views/quoteView';
import * as timeView from './views/timeView';
import * as settingsView from './views/settingsView';
import Time from './models/Time';

const state = {};

const controlSearch = async () => {
    state.buses = new Buses();

    try {
        // Get search input from UI
        //let query = settingsView.getSearchInput()
        //console.log(`User query: ${query}`);
        
        // Take search query and call API to get stops with that name
        //renderLoader(elements.settingsNameSearchResults);
        //let stopOptions = await state.buses.findStopName(query);
        //clearLoader();
        //console.log(`Stop Options: ${stopOptions}`);

        // Clear any old results and then render the available options to choose from on the screen
        // settingsView.clearStopNameSearchResults();
        // settingsView.renderStopNameSearchResults(stopOptions);

            // Get chosen option from UI  --- TODO
            // elements.shopping.addEventListener('click', e => {
            //     const id = e.target.closest('.shopping__item').dataset.itemid;
            // }
            // Chose one option if multiple stops
            // await state.buses.findBusStopDirection('490G00009800');

            



        
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
controlSearch();

elements.busSearchForm.addEventListener('submit', e => {
    e.preventDefault();
});

///////////////////////////////////////
// CONTROL QUOTE
///////////////////////////////////////

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
///////////////////////////////////////
// CONTROL WEATHER
///////////////////////////////////////

const controlWeather = async () => {
    state.weather = new Weather();

    try {
        await state.weather.getWeather();
        //console.log(state.weather.forecast);
        //weatherView.clearWeather();
        weatherView.renderWeather(state.weather.forecast);

    } catch (error) {
        console.log(error)
    }
}

///////////////////////////////////////
// TIME CONTROLLER
///////////////////////////////////////

const controlTime = () => {
    state.time = new Time();

    // Updates the time every 15 seconds
    setInterval(state.time.getTime(), 10000);
    setInterval(timeView.renderTime(state.time.time), 10000);
}

///////////////////////////////////////

controlQuote();
controlWeather();
//controlTime();

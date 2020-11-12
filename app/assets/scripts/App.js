import '../styles/styles.css';

if (module.hot) {
    module.hot.accept()
  }

// *******************************
// APPLICATION
// *********************************

import { elements, renderLoader, clearLoader, elementStrings } from './views/base';
import Buses from './models/Buses';
import Quote from './models/Quote';
import Weather from './models/Weather';
import Search from './models/Search';
import * as busView from './views/busView';
import * as weatherView from './views/weatherView';
import * as quoteView from './views/quoteView';
import * as timeView from './views/timeView';
import * as settingsView from './views/settingsView';
import Time from './models/Time';

const state = {};

///////////////////////////////////////
// BUS CONTROL
///////////////////////////////////////

const searchForBusStopNames = async () => {
    let query, stopOptions;
    state.search = new Search();
    
    // Get search input from UI and then clear field
    query = settingsView.getSearchInput()
    settingsView.clearSearchInput();
    renderLoader(elements.settingsNameSearchResult);
    
    try {
        // Take search query and call API to get stops with that name
        stopOptions = await state.search.findStopName(query);
        
        // Clear any old results and then render the available options to choose from on the screen
        settingsView.clearStopOptionsResults();
        settingsView.clearStopNameSearchResults();
        settingsView.renderStopNameSearchResults(stopOptions);

    } catch (error) {
        clearLoader();
        console.log(error);
    }
}

const findOptionsAtTheBusStop = async (id) => {
    renderLoader(elements.settingsNameSearchResult);
    try {        
        // Chose one option if multiple stops
        let stopDetails = await state.search.findBusStopDirection(id);
        
        // Clear the "Find stops by name" results
        settingsView.clearStopNameSearchResults();
        
        // Render options for picked stop
        settingsView.renderStopOptionsResults(stopDetails);
    } catch (error) {
        console.log(error);
    }
}

const getBusArrivals = (id) => {
    console.log('Getting bus arrivals.')
    
    // Clear previous and render loader
    busView.clearBusStopName();
    busView.clearBuses();
    renderLoader(elements.arrivalContainer);

    // Updates the bus arrivals every 15 seconds
    state.busTimer = setInterval( async () => {
        state.buses = new Buses();
        console.log(`Updating bus arrivals...`);

        try {
            // Get arrival data from AI
            await state.buses.getArrivals(id);
           
            // Clear and Render arrivals data and names
            busView.clearBusStopName();
            busView.renderStopName(state.buses.busStopName);
            busView.clearBuses();
            busView.renderBusTimes(state.buses.arrivalData);
   
       } catch (error) {
           console.log(error);
       }
    }, 15000);
}


// Listen for the "submit" button to be pressed on settings from
elements.busSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchForBusStopNames();
});

// Listen for settings page to be opened
elements.generalContainer.addEventListener('click', e => {
    if (e.target.matches('.settings-menu__toggle-button, .settings-menu__toggle-button *')) {
        e.preventDefault();
        // Open the settings menu
        settingsView.toggleSettingsMenu();
    }
});


// Handle event listeners from the settings page
elements.settingsMenuSection.addEventListener('click', e => {
    // Select from the displayed Stop Names
    if (e.target.matches('.settings-menu__bus-search-stop, .settings-menu__bus-search-stop *')) {
        let id = e.target.closest('.settings-menu__bus-search-stop').dataset.stopid;
        findOptionsAtTheBusStop(id);
    }
    // Choose individual bus stop option from previously chosen Stop Name
    else if (e.target.matches('.settings-menu__bus, .settings-menu__bus *')) {
        let target = e.target.closest('.settings-menu__bus').dataset;

         // Persist the data in localStorage
        localStorage.setItem('id', `${target.stopidno}`);
        localStorage.setItem('lat', `${target.stoplat}`);
        localStorage.setItem('lon', `${target.stoplon}`);

        // Clear any old timers and load bus arrivals for selected stop
        clearInterval(state.busTimer)
        getBusArrivals(target.stopidno);
        // Get weather for selected stop with latitude and longitude
        controlWeather(target.stoplat, target.stoplon);
        // Clear and close the settings menu
        settingsView.clearStopOptionsResults();
        settingsView.toggleSettingsMenu();
    }
});


///////////////////////////////////////
// CONTROL QUOTE
///////////////////////////////////////

const controlQuote = async () => {
    state.quote = new Quote();
    renderLoader(elements.quoteSection);

    try {
        await state.quote.getQuote();

        quoteView.renderQuote(state.quote.affirmation);

    } catch {
        console.log("Something went wrong with the Quote.")
    }
}
///////////////////////////////////////
// CONTROL WEATHER
///////////////////////////////////////

const controlWeather = async (lat, lon) => {
    state.weather = new Weather();

    try {
        await state.weather.getWeather(lat, lon);
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

    // Updates the time every second
    setInterval(() => {
        state.time.getTime();
        timeView.renderTime(state.time.time);
    }, 1000);
}

///////////////////////////////////////

const init = () => {
    controlQuote();
    // controlTime();

    // If there is a previously saved ID in localStorage
    if (localStorage.getItem('id')) {
        console.log('Getting data from local storage')

        getBusArrivals(localStorage.getItem('id'));
        controlWeather(localStorage.getItem('lat'), localStorage.getItem('lon'));
    } else {
        // POPULATE DATA IN ADVANCE FOR DEMO PURPOSES
        getBusArrivals('490000173RD');
        controlWeather('51.516964', '-0.14274');
    }
}

init();
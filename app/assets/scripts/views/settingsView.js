import { elements } from './base';

// Toggle if the settings menu is displayed or not
export const toggleSettingsMenu = () => {
    elements.settingsMenuSection.classList.toggle(`settings-menu--visible`);
};


////////////////////////////////
// SEARCH FIELD

// Get input from search field
export const getSearchInput = () => elements.busSearchInput.value;

// Clear the input from search field
export const clearSearchInput = () => elements.busSearchInput.value = "";


////////////////////////////////
// CHOOSE NAME OF STOP

// Display the names from the search
export const renderStopNameSearchResults = busStopArray => { 
    busStopArray.forEach(el => displayBusStopNameOptions(el));
}

const displayBusStopNameOptions = bus => {
    let markup = `
    <div class="settings-menu__bus-search-stop" data-stopid="${bus.id}">
        ${bus.name}
    </div>
    `
    elements.settingsNameSearchResult.insertAdjacentHTML('afterbegin', markup);
}

// Clear displayed Stop Names
export const clearStopNameSearchResults = () => {
    elements.settingsNameSearchResult.innerHTML = "";
}

///////////////////////////////////
/// CHOOSE INDIVIDUAL BUS STOP FROM NAME

// Display available options at chosen Bus Stop (like direction and stop number) so that the arrivals for that stop can be chosen
export const renderStopOptionsResults = stops => {
    stops.forEach(el => displayStopOptions(el));
}

const displayStopOptions = stop => {
    let markup = `
    <div class="settings-menu__bus" data-stopidno="${stop.id}" data-stoplat="${stop.lat}" data-stoplon="${stop.lon}">
        <div class="settings-menu__bus-stop">
            ${stop.stopLetter} towards ${stop.towards}
        </div>
    </div>
    `
    elements.stopOptions.insertAdjacentHTML('afterbegin', markup);
}

// Clear bus stop options
export const clearStopOptionsResults = () => {
    elements.stopOptions.innerHTML = ""
}

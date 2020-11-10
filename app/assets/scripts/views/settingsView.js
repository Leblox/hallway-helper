import { elements } from './base';

export const getSearchInput = () => elements.busSearchInput.value;

export const clearStopNameSearchResults = () => {
    elements.settingsNameSearchResult.innerHTML = "";
}

export const renderStopNameSearchResults = busStopArray => {  
    
    busStopArray.forEach(el => displayBusStopNameOptions(el));

}

const displayBusStopNameOptions = bus => {
    let markup = `
    <div class="" data-stopID=${bus.id}>
        ${bus.name}
    </div>
    `
    
    elements.settingsNameSearchResult.insertAdjacentHTML('afterbegin', markup);
}



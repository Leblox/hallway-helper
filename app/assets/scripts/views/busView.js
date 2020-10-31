import { elements } from './base';

export const renderBuses = (buses) => {
    // Render each bus in the array on the UI
    console.log("Started renderBuses");

    buses.forEach(bus => {
        renderBus(bus);
    });
}

const renderBus = (bus) => {
    let markup = `
    <div class="arrivals__bus">
    <div class="arrivals__bus__lineNumber">${bus.lineName}</div>
        <div class="arrivals__bus__destination">${bus.destination}</div>
        <div class="arrivals__bus__time">${bus.timeToStation} min</div>
        </div>
    `
        console.log(bus);
        console.log("Started renderBus");
    elements.arrivalContainer.insertAdjacentHTML('beforeend', markup);
}

export const clearBuses = () => {
    elements.arrivalContainer.innerHTML = '';
}
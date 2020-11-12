import { elements } from './base';

export const renderStopName = (name) => {
    let markup = `
    ${name}
    `
    elements.busStopName.insertAdjacentHTML('afterbegin', markup);
}

export const clearBusStopName = () => {
    elements.busStopName.innerHTML = '';
}

export const renderBusTimes = buses => {
     // Render each bus in the array on the UI
    buses.forEach(bus => {
        renderBus(bus);
    });
}

const renderBus = bus => {
    let arrivals = bus.arrivalTimes;
    
    // Limit the arrival times shown to max 3
    if (arrivals.length > 3) {
        arrivals.length = 3;
    }

    let times = arrivals.map(checkIfBusIsDue);

    let markup = `
    <div class="arrivals__bus">
    <div class="arrivals__bus__lineNumber">${bus.busLine}</div>
        <div class="arrivals__bus__destination">${bus.towards}</div>
        <div class="arrivals__bus__time">${times.join(', ')} min</div>
        </div>
    `
    elements.arrivalContainer.insertAdjacentHTML('beforeend', markup);
}

const checkIfBusIsDue = (el) => {
    // el == 0 ? "Due" : el;

    if (el == 0) {
        return "Due";
    } else {
        return el;
    }
}

export const clearBuses = () => {
    elements.arrivalContainer.innerHTML = '';
}
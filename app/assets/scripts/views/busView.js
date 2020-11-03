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
    // Render each bus in the array on te UI
    //console.log("Started renderBuses");
    buses.forEach(bus => {
        renderBus(bus);
    });
}

const renderBus = bus => {
    let arrivals = bus.arrivalTimes;
    console.log(arrivals);
    let times = arrivals.map(checkIfBusIsDue);
    // console.log(times);

    let markup = `
    <div class="arrivals__bus">
    <div class="arrivals__bus__lineNumber">${bus.busLine}</div>
        <div class="arrivals__bus__destination">${bus.towards}</div>
        <div class="arrivals__bus__time">${times} min</div>
        </div>
    `
    // console.log(checkIfBusIsDue(bus.arrivalTimes))
        // console.log(bus);
        // console.log("Started renderBus");
    elements.arrivalContainer.insertAdjacentHTML('beforeend', markup);
}

const checkIfBusIsDue = (el) => {
    // (el == 0) ? "Due" : el;

    if (el == 0) {
        console.log("Found a 0");
        return "Due";
    } else {
        return el;
    }
    
}

export const clearBuses = () => {
    elements.arrivalContainer.innerHTML = '';
}
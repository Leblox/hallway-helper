import { elements } from './base';

export const renderTime = (time) => {
   clearTime();
   displayTime(time);
}

const displayTime = (time) => {
    let markup = `${time}`;

    elements.timeSection.insertAdjacentHTML('afterbegin', markup);
    console.log(time);
}

const clearTime = () => {
    elements.timeSection.innerHTML = "";
    console.log("Cleared time");
}

export default class Time {
    constructor() {
        this.time;
    }

    getTime() {
        let today = new Date();
        this.time = today.getHours() + ":" + today.getMinutes();
       
        // Updates the time every 15 seconds
        //setInterval(this.getTime, 15000);
    }
}




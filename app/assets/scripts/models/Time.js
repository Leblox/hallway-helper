export default class Time {
    constructor() {
        this.time;
    }

    getTime() {
        let today = new Date();

        // this.time = today.getHours() + ":" + today.getMinutes();
        this.time= today.toLocaleTimeString();
    }
}




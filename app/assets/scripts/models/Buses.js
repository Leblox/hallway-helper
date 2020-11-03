import axios from 'axios';

export default class Buses {
    constructor() {
        this.busStopID = "490009800W";
        this.arrivalData = [];
    }

    async getArrivals() {
        try {
            // Request data from TFL Api for the stop in question, only buses
            const result = await axios (`https://api.tfl.gov.uk/StopPoint/${this.busStopID}/Arrivals?mode=bus`);
            console.log(result);
            result.data.forEach((el) => {
                let bus = {
                    lineName: el.lineName, 
                    destination: el.destinationName,
                    // ETA in seconds
                    timeToStation: Math.floor(el.timeToStation/60)
                }
                this.arrivalData.push(bus);
            })
            this.sortBySoonest();
        } catch (error) {
            console.log(error);
        }    
    }

    sortBySoonest() {
        // Sort the objects in the array by arrival time at the station
        this.arrivalData.sort((a,b) => (a.timeToStation > b.timeToStation) ? 1 : -1);
    }
}


import axios from 'axios';

export default class Buses {
    constructor() {
        this.responseFromAPI;
        this.busStopID; // Should be set an use .this
        this.busStopName; // Used on UI
        this.busStopDestinations;
        this.busLines = [];
        this.arrivalData = [];
    }

    //// 
    async initBusStop() {
        try {
            // Get data from API
            await this.getDataFromApi();

            // Set bus stop name and destination(s) served
            this.busStopName = this.responseFromAPI.data[0].stationName;
            this.busStopDestinations = this.responseFromAPI.data[0].towards;
            
            // Clear bus stop lines
            this.busLines = [];

            // Check bus lines serving the stop
            this.responseFromAPI.data.forEach((el) => {
                if (!this.busLines.includes(el.lineName)) {
                    this.busLines.push(el.lineName);
                }
            });

            this.sortBusArrivals(this.responseFromAPI);

        } catch (error) {
            console.log(error);
        }    
    }

    async getDataFromApi () {
        try {
            // Request data from TFL Api for the stop in question, only buses
            this.responseFromAPI = await axios (`https://api.tfl.gov.uk/StopPoint/${this.busStopID}/Arrivals?mode=bus`);
        }
        catch (error) {
            console.log(error);
        }

    }

    sortBusArrivals () {
        // Clear previous arrival data
        this.arrivalData = [];

        // Group arrival times by buses
        let bus;
        this.busLines.forEach(busLine => {
            bus = {
                busLine: busLine,
                towards: "",
                arrivalTimes: []
            }
            // Loop over api this.responseFromAPI and push relevant arrival time to the correct bus
            this.responseFromAPI.data.forEach(el => {
                if (el.lineId == busLine) {
                    bus.towards = el.destinationName;
                    bus.arrivalTimes.push(Math.floor(el.timeToStation/60))  
                } 
            })
            // Once it has found all times for the line, sort by time and push the bus into the array
            this.sortBySoonest(bus.arrivalTimes);
            this.arrivalData.push(bus);
        });
        //console.log(this.arrivalData);
    }

    sortBySoonest(arrayToSort) {
        // Sort the objects in the array by arrival time at the station
        arrayToSort.sort((a,b) => (a > b) ? 1 : -1);
        // this.arrivalData.sort((a,b) => (a.timeToStation > b.timeToStation) ? 1 : -1);
    }

    ////////////////// OLD CODE ////

    async getArrivals(busStopID) {
        try {
            // Request data from TFL Api for the stop in question, only buses
            const result = await axios (`https://api.tfl.gov.uk/StopPoint/${busStopID}/Arrivals?mode=bus`);
            //console.log(result);

            // Set bus stop name and destination(s) served
            this.busStopName = result.data[0].stationName;
            this.busStopDestinations = result.data[0].towards;
            
            // Clear bus stop lines
            this.busLines = [];

            // Check bus lines serving the stop
            result.data.forEach((el) => {
                if (!this.busLines.includes(el.lineName)) {
                    this.busLines.push(el.lineName);
                }
            });
            
            // Clear previous arrival data
            this.arrivalData = [];

            // Group arrival times by buses
            let bus;
            this.busLines.forEach(busLine => {
                bus = {
                    busLine: busLine,
                    towards: "",
                    arrivalTimes: []
                }
                // Loop over api result and push relevant arrival time to the correct bus
                result.data.forEach(el => {
                    if (el.lineId == busLine) {
                        bus.towards = el.destinationName;
                        bus.arrivalTimes.push(Math.floor(el.timeToStation/60))  
                    } 
                })
                // Once it has found all times for the line, sort by time and push the bus into the array
                this.sortBySoonest(bus.arrivalTimes);
                this.arrivalData.push(bus);
            });
            //console.log(this.arrivalData);

        } catch (error) {
            console.log(error);
        }    
    }    
}


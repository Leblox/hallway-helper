import axios from 'axios';

export default class Buses {
    constructor() {
        this.busStopID = "490009800W";
        this.busStopName;
        this.busStopDestinations;
        this.busLines = [];
        this.arrivalData = [];
    }

    async findStopName(stopNameQuery) {
        try {
            const result = await axios (`https://api.tfl.gov.uk/Stoppoint/Search/'${stopNameQuery}'?modes=bus`);
            //console.log(result);
            console.log(result);

            // If nothing was found using that query
            if (result.data.total == 0) {
                console.log("Couldnt find a stop with that name");
                return [{name: "Please check the name and try again", id: 0}];
            }

            // If something was found, loop over the available stops and take the info
            let chooseStop = [];
            result.data.matches.forEach( el => chooseStop.push({name: el.name, id: el.id}));
            console.log(chooseStop);

            return chooseStop;

        } catch (error) {
            console.log(error);
        }
    }

    async findBusStopDirection(id) {
        
        try {
            const result = await axios (`https://api.tfl.gov.uk/Stoppoint/${id}`);
            console.log(result);

            console.log(result.data.children)

            let stopOptions = [];
            result.data.children.forEach(el => stopOptions.push({
                name: el.commonName,
                id: el.id,
                lines: el.lines,
                lat: el.lat,
                lon: el.lon
            }));
            console.log(stopOptions);

        } catch (error) {
            console.log(error);
        }
    }


    async getArrivals() {
        try {
            // Request data from TFL Api for the stop in question, only buses
            const result = await axios (`https://api.tfl.gov.uk/StopPoint/${this.busStopID}/Arrivals?mode=bus`);
            //console.log(result);

            // Set bus stop name and destination(s) served
            this.busStopName = result.data[0].stationName;
            this.busStopDestinations = result.data[0].towards;
            
            // Check bus lines serving the stop
            result.data.forEach((el) => {
                if (!this.busLines.includes(el.lineName)) {
                    this.busLines.push(el.lineName);
                }
            });
            
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

    sortBySoonest(arrayToSort) {
        // Sort the objects in the array by arrival time at the station
        arrayToSort.sort((a,b) => (a > b) ? 1 : -1);
        // this.arrivalData.sort((a,b) => (a.timeToStation > b.timeToStation) ? 1 : -1);
    }
}


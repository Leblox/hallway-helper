import axios from 'axios';

export default class Search {

    async findStopName(stopNameQuery) {
        console.log('Running findStopName');
        try {
            const result = await axios (`https://api.tfl.gov.uk/Stoppoint/Search/'${stopNameQuery}'?modes=bus`);

            // If nothing was found using that query
            if (result.data.total == 0) {
                console.log("Couldnt find a stop with that name");
                return [{name: "Please check the name and try again", id: 0}];
            }

            // If something was found, loop over the available stops and take the info
            let chooseStop = [];
            result.data.matches.forEach( el => chooseStop.push({name: el.name, id: el.id}));

            return chooseStop;

        } catch (error) {
            console.log(error);
        }
    }

    async findBusStopDirection(id) {
        // console.log(`FindBusStopDirection id: ${id}`);
        try {
            const result = await axios (`https://api.tfl.gov.uk/Stoppoint/${id}`);
      
            let stopOptions = [];
            result.data.children.forEach(el => stopOptions.push({
                name: el.commonName,
                id: el.id,
                lines: el.lines,
                lat: el.lat,
                lon: el.lon,
                stopLetter: el.stopLetter,
                towards: el.additionalProperties[1].value
            }));

            return(stopOptions);

        } catch (error) {
            console.log(error);
        }
    }
}


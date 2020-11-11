import axios from 'axios';

export default class Weather {
    constructor() {
        this.forecast = {};
    }

    async getWeather() {
        try {
            let latitude = 50.5074;
            let longitude = 0.1278;

            let result = await axios(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);

            //console.log(result);

            this.forecast = result.data.dataseries[0];
            //console.log(this.weather);

        } catch (error) {
            console.log(error);
        }
    }
}


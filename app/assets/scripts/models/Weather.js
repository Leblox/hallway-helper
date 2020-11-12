import axios from 'axios';

export default class Weather {
    constructor() {
        this.forecast = {};
    }

    async getWeather(latitude, longitude) {
        try {
           let result = await axios(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);

            this.forecast = result.data.dataseries[0];

        } catch (error) {
            console.log(error);
        }
    }
}


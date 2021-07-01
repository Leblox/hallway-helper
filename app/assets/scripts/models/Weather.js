import axios from 'axios';

export default class Weather {
    constructor() {
        this.forecast = {};
    }

    async getWeather(latitude, longitude) {
        try {
            let proxy = 'https://sheltered-spire-77616.herokuapp.com/';

            // 7timer needs proxy due to security issues (http and not https) leading to blocked mixed media issues on deployment
            let result = await axios(`${proxy}http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);

            this.forecast = result.data.dataseries[0];

        } catch (error) {
            console.log(error);
        }
    }
}


import axios from 'axios';

export default class Quote {
    constructor() {
        this.affirmation;
    }

    async getQuote() {
        try {
            let proxy = "https://sheltered-spire-77616.herokuapp.com/"
            let result = await axios (`${proxy}https://www.affirmations.dev`);

            this.affirmation = result.data.affirmation;
            //console.log(this.quote);
        } catch (error) {
            console.log(error);
        }
    }
}
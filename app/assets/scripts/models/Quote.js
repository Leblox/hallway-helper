import axios from 'axios';

export default class Quote {
    constructor() {
        this.quote;
    }

    async getQuote() {
        try {
            result = await axios (`https://www.affirmations.dev`);

            this.quote = result.affirmation;
            console.log(this.quote);
        } catch (error) {
            console.log(error);
        }
    }
}
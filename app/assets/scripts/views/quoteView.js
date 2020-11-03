import { elements } from './base';

export const renderQuote = quote => {

    elements.quoteSection.innerHTML = quote;
}

export const clearQuote = () => {

    elements.quoteSection.innerHTML = '';
}
export const elements = {
    generalContainer: document.querySelector('.container'),
    timeSection: document.querySelector('.time'),
    quoteSection: document.querySelector('.quote'),
    
    // Weather section
    weatherSection: document.querySelector('.weather'),
    weatherIcon: document.querySelector('.weather__icon-wrapper'),
    weatherTemp: document.querySelector('.weather__text__temp'),
    weatherDesc: document.querySelector('.weather__text__desc'),

    // Bus arrivals section
    arrivalContainer: document.querySelector('.arrivals_busses'),
    busStopName: document.querySelector('.arrivals__stop-name'),

    // Setting menu
    toggleSettingsMenuButton: document.querySelector('.settings-menu__toggle-button'),
    settingsMenuSection: document.querySelector('.settings-menu'),
    busSearchForm: document.querySelector('.settings-menu__bus-search-form'),
    busSearchInput: document.querySelector('.settings-menu__bus-search-form__input'),
    settingsNameSearchResult: document.querySelector('.settings-menu__bus-search-name-results'),
    stopOptions: document.querySelector('.settings-menu__bus-selection')
};

export const elementStrings = {
    loader: 'loader',
    busStopSearchResults: 'settings-menu__bus-search-stop'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="./assets/images/icons.svg#icon-cw""></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
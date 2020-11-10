export const elements = {
    timeSection: document.querySelector('.time'),
    weatherSection: document.querySelector('.weather'),
    quoteSection: document.querySelector('.quote'),
    arrivalContainer: document.querySelector('.arrivals_busses'),
    busStopName: document.querySelector('.arrivals__stop-name'),

    busSearchForm: document.querySelector('.settings-menu__bus-search-form'),
    busSearchInput: document.querySelector('.settings-menu__bus-search-form__input'),
    settingsNameSearchResult: document.querySelector('.settings-menu__bus-search-name-results')
};

export const elementStrings = {
    loader: 'loader'
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
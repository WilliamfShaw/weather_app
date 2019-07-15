const appId = 'de8bef9125bb33a077f6ef01510e5667';

interface optionsArgument {
    lat?: string | number;
    lon?: string | number;
    cityName?: string;
    zipCode?: string;
    system: string;
}

interface weatherApiResponse {
    coord: {
        lon: number;
        lat: number;
    },
    weather: [{
        id: number;
        main: string;
        description: string;
        icon: string;
    }],
    base: string;
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    },
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    },
    clouds: {
        all: number;
    },
    dt: number;
    sys: {
        type: number;
        id: number;
        message: number;
        country: string;
        sunrise: number;
        sunset: number;
    },
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

const lookup = {
    baseUrl: 'http://api.openweathermap.org/data/2.5/weather',
    getSearchByCityUrl: function(opts: optionsArgument): string {
        return `${this.baseUrl}?q=${opts.cityName},us`;
    },
    getSearchByZipCodeUrl: function (opts: optionsArgument): string {
        return `${this.baseUrl}?zip=${opts.zipCode},us`;
    },
    getSearchByGeoLocationUrl: function (opts: optionsArgument): string {
        return `${this.baseUrl}?lat=${opts.lat}&lon=${opts.lat}`;
    }
}

export function getWeather(searchType: string, opts: optionsArgument): Promise<weatherApiResponse> {
    const baseUrl = lookup[`getSearchBy${searchType}Url`](opts);
    const url = `${baseUrl}&appid=${appId}&units=${opts.system}`;

    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json()).then(response => resolve(response));
    })
};

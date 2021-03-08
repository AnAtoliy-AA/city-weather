import { WEATHER_API, WEATHER_API_KEY } from './api-keys/WeatherApiKey';

import axios from 'axios';

export const weatherApi = {

    getWeather(cityName: string) {
        return axios.get(`${WEATHER_API}${cityName}&appid=${WEATHER_API_KEY}&units=metric`)
            .then(response => response.data);
    },
}

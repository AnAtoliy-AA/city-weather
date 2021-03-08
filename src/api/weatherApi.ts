import { WEATHER_API, WEATHER_API_KEY } from './api-keys/WeatherApiKey';

import axios from 'axios';

export const weatherApi = {

    getWeather(cityName: string) {
        return axios.get(`${WEATHER_API}${cityName}&appid=${WEATHER_API_KEY}&units=metric`)
            .then(response => response.data);
    },

    getAllCitiesWeather(citiesNames: []) {
        const urlArray: string[] = [];
        for (let name of citiesNames) {
            urlArray.push(
              `${WEATHER_API}${name}&appid=${WEATHER_API_KEY}&units=metric`
            );
          }
          let promiseArray = urlArray.map((url) => axios.get(url));
       return   axios.all(promiseArray).then((results) => {
           return results.map((r) => r.data);
          });
    },
}

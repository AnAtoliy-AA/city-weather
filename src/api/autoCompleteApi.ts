import { AUTOCOMPLETE_API, } from './api-keys/WeatherApiKey';
import axios from 'axios';

export const autocompleteApi = {
    getAutocomplete(cityName: string) {
        return axios
        .get(`${AUTOCOMPLETE_API}${cityName}`)
        .then((response) => {
          const autocompleteCityArray = response.data._embedded[
            "city:search-results"
          ].map((c: { matching_full_name: any }) => {
            return c.matching_full_name;
          });
          return autocompleteCityArray;
        });
    },
}

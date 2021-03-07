import './SearchForm.scss';

import {
  AUTOCOMPLETE_API,
  WEATHER_API,
  WEATHER_API_KEY,
} from "../api-keys/WeatherApiKey";
import { LOCAL_STORAGE_NAME_CITY, loadState, saveState } from "../utils";
import React, { useState } from "react";

import axios from "axios";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [autoCompleteArray, setAutoCompleteArray] = useState([]);

  const checkIfLocalStorageEmpty = () => {
    const countriesInfo = loadState();
    const cityNames = loadState(LOCAL_STORAGE_NAME_CITY);

    if (!countriesInfo) {
      saveState([]);
    }

    if (!cityNames) {
      saveState([], LOCAL_STORAGE_NAME_CITY);
    }
  };

  const getAutocompleteCity = (value: string) => {
    axios
      .get(`${AUTOCOMPLETE_API}${value}`)
      .then((response) => {
        const autocompleteCityArray = response.data._embedded[
          "city:search-results"
        ].map((c: { matching_full_name: any }) => {
          return c.matching_full_name;
        });
        setAutoCompleteArray(autocompleteCityArray);
      })
      .catch((er) => {
        setErrorMessage(er.message);
      });
  };

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    if (searchValue.length > 2) {
      getAutocompleteCity(event.target.value);
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getWeatherFromApi(searchTerm);
  };

const getWeatherFromApi = (value: string) => {
  axios
  .get(`${WEATHER_API}${value}&appid=${WEATHER_API_KEY}&units=metric`)
  .then((response) => {
    checkIfLocalStorageEmpty();
    const isCountryExistInTracking = checkIsCountryExistInTracking(
      response.data.name
    );
    if (!isCountryExistInTracking) {
      const countriesInfo = loadState();
      const cityNames = loadState(LOCAL_STORAGE_NAME_CITY);
      saveState(
        [...cityNames, response.data.name],
        LOCAL_STORAGE_NAME_CITY
      );
      saveState([...countriesInfo, response.data]);
    }
  })
  .catch((er) => {
    setErrorMessage(er.message);
  });
}

  const checkIsCountryExistInTracking = (cityName: string) => {
    const cityNames = loadState(LOCAL_STORAGE_NAME_CITY);
    return cityNames.includes(cityName);
  };

  const handleAutoCompleteClick = (value: string) => {
    const searchCity = value.split(',')[0];
    setSearchTerm('');

    getWeatherFromApi(searchCity);
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleOnSubmit}>
        <div>
          <label>
            <input
              type="text"
              name="login"
              placeholder="Select city"
              value={searchTerm}
              autoComplete="off"
              onChange={handleOnInputChange}
              className="form__input"
            />
            <div className="autocomplete__fields">
              {autoCompleteArray.length > 0 &&
                autoCompleteArray.map((city: any) => {
                  return <div onClick={() => handleAutoCompleteClick(city)}>{city}</div>;
                })}
            </div>
          </label>
        </div>
        {/* <p>
          <input type="submit" value="Submit" />
        </p> */}
        {/* <select>
          {(autoCompleteArray.length > 0 )&&  autoCompleteArray.map((city: any) => {
            return <option>{city.matching_full_name}</option>
          })}
        </select> */}
      </form>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
};

export default SearchForm;

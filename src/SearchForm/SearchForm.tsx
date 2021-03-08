import './SearchForm.scss';

import {
  AUTOCOMPLETE_API,
  WEATHER_API,
  WEATHER_API_KEY,
} from "../api-keys/WeatherApiKey";
import { LOCAL_STORAGE_NAME_CITY, loadState, saveState } from "../utils";
import React, { useState } from "react";

import {addCity} from '../../src/store/cityList-reducer';
import {addCityToInfoList} from '../../src/store/cityInfoList-reducer'
import axios from "axios";
import { connect } from 'react-redux';

const SearchForm = (props:any) => {
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

  const updateAllCitiesWeather = () => {
    const urlArray: any[] = [];
    const cityNames = loadState(LOCAL_STORAGE_NAME_CITY);

    for(let name of cityNames) {
      urlArray.push(`${WEATHER_API}${name}&appid=${WEATHER_API_KEY}&units=metric`);
    }

    let promiseArray = urlArray.map(url => axios.get(url));

    axios.all(promiseArray)
    .then(results => {
      let temp = results.map(r => r.data);
      saveState(temp);
      console.log("TEMP", temp);
    })
  }

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
      // const countriesInfo = loadState();
      // const cityNames = loadState(LOCAL_STORAGE_NAME_CITY);
      // saveState(
      //   [...cityNames, response.data.name],
      //   LOCAL_STORAGE_NAME_CITY
      // );
      // saveState([...countriesInfo, response.data]);
      props.addCity(response.data.name);
      props.addCityToInfoList(response.data);
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
    setAutoCompleteArray([]);

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
      </form>
      <button onClick={updateAllCitiesWeather}>UpdateAll</button>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
};

let mapStateToProps = (state: {
  cityList: {  cityList: any};
  cityInfoList: {cityInfoList: any,}
}) => {
  return {
    cityInfoList: state.cityInfoList.cityInfoList,
    cityList: state.cityList.cityList
  };
};

export default connect(mapStateToProps, {
  addCity,
  addCityToInfoList
})(SearchForm);


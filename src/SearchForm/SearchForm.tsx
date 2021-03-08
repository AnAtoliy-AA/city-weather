import "./SearchForm.scss";

// import { LOCAL_STORAGE_NAME_CITY, loadState, saveState } from "../utils";
import React, { useState } from "react";
import { addCity, addCityToInfoList, getAllCityWeather, getCityWeather } from "../../src/store/cityInfoList-reducer";

import {
  AUTOCOMPLETE_API,
} from "../api/api-keys/WeatherApiKey";
import { CityInfoType } from "../types";
// import { addCity } from "../../src/store/cityList-reducer";
import axios from "axios";
import { connect } from "react-redux";

const SearchForm = (props: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [autoCompleteArray, setAutoCompleteArray] = useState([]);

  const updateAllCitiesWeather = () => {
    props.getAllCityWeather(props.cityList)
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
    // getWeatherFromApi(searchTerm);
    setSearchTerm("");
    setAutoCompleteArray([]);
  };

  // const getWeatherFromApi = (value: string) => {
  //   axios
  //     .get(`${WEATHER_API}${value}&appid=${WEATHER_API_KEY}&units=metric`)
  //     .then((response) => {
  //       const isCityExistInTracking = checkIsCityExistInTracking(
  //         response.data.name
  //       );
  //       if (!isCityExistInTracking) {
  //         props.addCity(response.data.name);
  //         props.addCityToInfoList(response.data);
  //       }
  //     })
  //     .catch((er) => {
  //       setErrorMessage(er.message);
  //     });
  // };

  const checkIsCityExistInTracking = (cityName: string) => {
    return props.cityList.includes(cityName);
  };

  const handleAutoCompleteClick = (value: string) => {
    const searchCity = value.split(",")[0];
    setSearchTerm("");
    setAutoCompleteArray([]);

    // getWeatherFromApi(searchCity);
    // const isCityExistInTracking = checkIsCityExistInTracking(
    //   searchCity
    // );
    // if (!isCityExistInTracking) {
      props.getCityWeather(searchCity);
    //   props.addCity(searchCity);
    // }
  };

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
                  return (
                    <div onClick={() => handleAutoCompleteClick(city)}>
                      {city}
                    </div>
                  );
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
  // cityList: { cityList: any };
  cityInfoList: { cityInfoList: CityInfoType[],cityList: string[] };
}) => {
  return {
    cityInfoList: state.cityInfoList.cityInfoList,
    cityList: state.cityInfoList.cityList,
  };
};

export default connect(mapStateToProps, {
  addCity,
  addCityToInfoList,
  getCityWeather,
  getAllCityWeather
})(SearchForm);

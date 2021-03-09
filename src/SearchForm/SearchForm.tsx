import "./SearchForm.scss";

import React, { useEffect, useState } from "react";
import {
  addCityToInfoList,
  getAllCityWeather,
  getCityWeather,
} from "../../src/store/cityInfoList-reducer";
import {
  clearAutocompleteCitiesNames,
  getAutocompleteCitiesNames,
} from "../../src/store/autoComplete-reducer";

import { CityInfoType } from "../types";
import { WORDS_CONFIG } from "../shared/wordsConfig";
import { connect } from "react-redux";

const MIN_SEARCH_VALUE = 2;
const UPDATE_CITY_INFO_PERIOD_IN_MS = {
  TEN_SECONDS: 10000,
  THIRTY_SECONDS: 30000,
  ONE_MINUTE: 60000,
  FIVE_MINUTES: 300000,
  TEN_MINUSTES: 600000,
};

const UPDATE_CITY_INFO_PERIOD = {
  TEN_SECONDS: 10,
  THIRTY_SECONDS: 30,
  ONE_MINUTE: 1,
  FIVE_MINUTES: 5,
  TEN_MINUSTES: 10,
};

const SearchForm = (props: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(false);
  const [updatingPeriod, setUpdatingPeriod] = useState(
    UPDATE_CITY_INFO_PERIOD_IN_MS.TEN_SECONDS
  );

  const handleCheckBoxClick = () => setChecked(!checked);

  const handleUpdatePeriodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUpdatingPeriod(+e.target.value);
  };

  useEffect(() => {
    let interval: number | undefined;

    interval = window.setInterval(() => {
      props.getAllCityWeather(props.cityList);
    }, updatingPeriod);

    if (!checked) {
      clearInterval(interval);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [props, props.cityList, checked, updatingPeriod]);

  const getAutocompleteCity = (value: string) => {
    props.getAutocompleteCitiesNames(value);
  };

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    if (searchValue.length > MIN_SEARCH_VALUE) {
      getAutocompleteCity(event.target.value);
    } else props.clearAutocompleteCitiesNames();
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSearchTerm("");
    props.clearAutocompleteCitiesNames();
    props.getCityWeather(searchTerm);
  };

  const handleAutoCompleteClick = (value: string) => {
    const searchCity = value.split(",")[0];
    setSearchTerm("");
    props.clearAutocompleteCitiesNames();
    props.getCityWeather(searchCity);
  };

  return (
    <div className="SearchForm">
      <form onSubmit={handleOnSubmit}>
        <div>
          <label>
            <input
              type="text"
              name="login"
              placeholder={WORDS_CONFIG.SELECT_CITY}
              value={searchTerm}
              autoComplete="off"
              onChange={handleOnInputChange}
              className="form__input"
            />
            <div className="autocomplete__fields">
              {props.autoCompleteInfo.map((city: string) => {
                return (
                  <div key={city} onClick={() => handleAutoCompleteClick(city)}>
                    {city}
                  </div>
                );
              })}
            </div>
          </label>
        </div>
      </form>
      <div className="autoupdate__togler">
        {WORDS_CONFIG.AUTO_UPDATE}
        <input
          onClick={handleCheckBoxClick}
          checked={checked}
          type="checkbox"
        />
      </div>
      <select
        onChange={(e) => handleUpdatePeriodChange(e)}
        className="browser-default custom-select"
      >
        <option value={UPDATE_CITY_INFO_PERIOD_IN_MS.TEN_SECONDS}>
          {UPDATE_CITY_INFO_PERIOD.TEN_SECONDS} {WORDS_CONFIG.SECONDS}
        </option>
        <option value={UPDATE_CITY_INFO_PERIOD_IN_MS.THIRTY_SECONDS}>
          {UPDATE_CITY_INFO_PERIOD.THIRTY_SECONDS} {WORDS_CONFIG.SECONDS}
        </option>
        <option value={UPDATE_CITY_INFO_PERIOD_IN_MS.ONE_MINUTE}>
          {UPDATE_CITY_INFO_PERIOD.ONE_MINUTE} {WORDS_CONFIG.MINUTES}
        </option>
        <option value={UPDATE_CITY_INFO_PERIOD_IN_MS.FIVE_MINUTES}>
          {UPDATE_CITY_INFO_PERIOD.FIVE_MINUTES} {WORDS_CONFIG.MINUTES}
        </option>
        <option value={UPDATE_CITY_INFO_PERIOD_IN_MS.TEN_MINUSTES}>
          {UPDATE_CITY_INFO_PERIOD.FIVE_MINUTES} {WORDS_CONFIG.MINUTES}
        </option>
      </select>
      )
    </div>
  );
};

let mapStateToProps = (state: {
  cityInfoList: { cityInfoList: CityInfoType[]; cityList: string[] };
  autoCompleteInfo: { autoCompleteInfo: string[] };
}) => {
  return {
    cityInfoList: state.cityInfoList.cityInfoList,
    cityList: state.cityInfoList.cityList,
    autoCompleteInfo: state.autoCompleteInfo.autoCompleteInfo,
  };
};

export default connect(mapStateToProps, {
  addCityToInfoList,
  getCityWeather,
  getAllCityWeather,
  getAutocompleteCitiesNames,
  clearAutocompleteCitiesNames,
})(SearchForm);

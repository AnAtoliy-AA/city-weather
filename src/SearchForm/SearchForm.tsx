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

const SearchForm = (props: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(false);
  const handleCheckBoxClick = () => setChecked(!checked);

  useEffect(() => {
    let interval: number | undefined;

    interval = window.setInterval(() => {
      props.getAllCityWeather(props.cityList);
    }, 10000);

    if (!checked) {
      clearInterval(interval);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [props, props.cityList,checked]);

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
    props.getCityWeather(searchTerm);
    setSearchTerm("");
    props.clearAutocompleteCitiesNames();
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
        <input onClick={handleCheckBoxClick} checked={checked} type="checkbox"/>
      </div>
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

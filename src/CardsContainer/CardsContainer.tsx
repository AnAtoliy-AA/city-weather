import "./CardsContainer.scss";

import { LOCAL_STORAGE_NAME_CITY, loadState, saveState } from "../utils";
import React, { useCallback, useEffect, useState } from "react";
import { WEATHER_API, WEATHER_API_KEY } from "../api/api-keys/WeatherApiKey";
import {removeActiveCity, removeCityFromInfoList, setCityInfoList} from '../../src/store/cityInfoList-reducer';

import CityCard from "../CityCard/CityCard";
import axios from "axios";
import { connect } from "react-redux";

// import {removeActiveCity} from '../../src/store/cityList-reducer';

const CardsContainer = (props: any) => {
  const handleDeleteButton = (value: string) => {
    props.removeActiveCity(value);
    props.removeCityFromInfoList(value);
  };

  const handleUpdateButton = (value: string) => {
    axios
    .get(`${WEATHER_API}${value}&appid=${WEATHER_API_KEY}&units=metric`)
    .then((response) => {
        const countriesInfo = loadState();
        const cityNames = loadState(LOCAL_STORAGE_NAME_CITY);
        const index = cityNames.indexOf(value);
        
        countriesInfo.splice(index, 1, response.data);
        saveState(countriesInfo);
        // setCitiesInfo(countriesInfo);
    })
    .catch((er) => {
    });
  }

  const getWeatherFromApi = (value: string) => {
   
  }

  return (
    <div className="cards__container">
      {props.cityInfoList.map((city: any) => {
        return <CityCard key={city.name} city={city} handleDeleteButton={handleDeleteButton} handleUpdateButton={handleUpdateButton}/>;
      })}
      <button onClick={() => localStorage.clear()}>LS</button>
    </div>
  );
};

let mapStateToProps = (state: {
  // cityList: { cityList: any};
  cityInfoList: { cityInfoList: any, cityList: any};
}) => {
  return {
    cityInfoList: state.cityInfoList.cityInfoList,
    cityList: state.cityInfoList.cityList
  };
};

export default connect(mapStateToProps, {
  setCityInfoList,
  removeActiveCity,
  removeCityFromInfoList
})(CardsContainer);


import "./CardsContainer.scss";

import { LOCAL_STORAGE_NAME_CITY, loadState, saveState } from "../utils";
import React, { useCallback, useEffect, useState } from "react";
import { WEATHER_API, WEATHER_API_KEY } from "../api-keys/WeatherApiKey";

import CityCard from "../CityCard/CityCard";
import axios from "axios";
import { connect } from "react-redux";
import {setCityInfoList} from '../../src/store/cityInfoList-reducer'

const CardsContainer = (props: any) => {
  const [citiesInfo, setCitiesInfo] = useState(loadState());

  // useEffect(() => {
  //   function checkCitiesData() {
  //     const item = loadState();
  //     console.log('1111')
  //     if (item) {
  //       setCitiesInfo(item);
  //     }
  //   }

  //   window.addEventListener("Storage", checkCitiesData);

  //   return () => {
  //     window.removeEventListener("storage", checkCitiesData);
  //   };
  // }, []);

  const handleDeleteButton = (value: string) => {
    const countriesInfo = loadState();
    const cityNames = loadState(LOCAL_STORAGE_NAME_CITY);
    const index = cityNames.indexOf(value);

    if (index > -1) {
      cityNames.splice(index, 1);
      countriesInfo.splice(index, 1);
    }
    
    console.log(window.localStorage)
    // setCitiesInfo(countriesInfo);
    saveState(countriesInfo);
    saveState(cityNames,LOCAL_STORAGE_NAME_CITY);
    console.log(window.localStorage)
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
        setCitiesInfo(countriesInfo);
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
  cityList: { cityList: any};
  cityInfoList: { cityInfoList: any};
}) => {
  return {
    cityInfoList: state.cityInfoList.cityInfoList,
    cityList: state.cityList.cityList
  };
};

export default connect(mapStateToProps, {
  setCityInfoList
})(CardsContainer);


import "./CardsContainer.scss";

import { LOCAL_STORAGE_NAME_CITY, loadState, saveState } from "../utils";
import React, { useEffect, useState } from "react";

import CityCard from "../CityCard/CityCard";

const CardsContainer = () => {
  const [citiesInfo, setCitiesInfo] = useState(loadState());

  useEffect(() => {
    function checkCitiesData() {
      const item = loadState();

      if (item) {
        setCitiesInfo(item);
      }
    }

    window.addEventListener("storage", checkCitiesData);

    return () => {
      window.removeEventListener("storage", checkCitiesData);
    };
  }, []);

  const handleDeleteButton = (value: any) => {
    const countriesInfo = loadState();
    const cityNames = loadState(LOCAL_STORAGE_NAME_CITY);
    const index = cityNames.indexOf(value);

    if (index > -1) {
      cityNames.splice(index, 1);
      countriesInfo.splice(index, 1);
    }
    
    setCitiesInfo(countriesInfo);
    saveState(countriesInfo);
    saveState(cityNames,LOCAL_STORAGE_NAME_CITY);

  };

  return (
    <div className="cards__container">
      {citiesInfo.map((city: any) => {
        return <CityCard key={city.name} city={city} handleDeleteButton={handleDeleteButton}/>;
      })}
    </div>
  );
};

export default CardsContainer;

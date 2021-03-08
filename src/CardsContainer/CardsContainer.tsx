import "./CardsContainer.scss";

import {
  removeCityFromInfoList,
  updateCityWeather,
} from "../../src/store/cityInfoList-reducer";

import CityCard from "../CityCard/CityCard";
import { CityInfoType } from "../types";
import { WORDS_CONFIG } from "../shared/wordsConfig";
import { connect } from "react-redux";

const CardsContainer = (props: any) => {
  const handleDeleteButton = (value: CityInfoType) => {
    props.removeCityFromInfoList(value);
  };

  const handleUpdateButton = (value: CityInfoType) => {
    props.updateCityWeather(value);
  };

  //TODO
  const getMinMaxTemperatures = () => {
    let maxMinTemperatureInfo = props.cityInfoList.slice();
    maxMinTemperatureInfo.sort(function (a: CityInfoType, b: CityInfoType) {
      return a.main.temp - b.main.temp;
    });
    return maxMinTemperatureInfo;
  };
  const maxMinTemperatureInfo = getMinMaxTemperatures();

  return (
    <div className="cards__wrapper">
      <div className="container__info">
        <div className="info__card">
          <p>{WORDS_CONFIG.CITY_WITH_MIN_TEMPERATURE}</p>
          <p>{maxMinTemperatureInfo[0].name}</p>
          <p>{maxMinTemperatureInfo[0].main.temp}</p>
        </div>
        <div className="info__card">
          <p>{WORDS_CONFIG.CITY_WITH_MAX_TEMPERATURE}</p>
          <p>{maxMinTemperatureInfo[maxMinTemperatureInfo.length - 1].name}</p>
          <p>
            {maxMinTemperatureInfo[maxMinTemperatureInfo.length - 1].main.temp}
          </p>
        </div>
      </div>
      <div className="cards__container">
        {props.cityInfoList.map((city: CityInfoType) => {
          return (
            <CityCard
              key={city.name}
              city={city}
              handleDeleteButton={handleDeleteButton}
              handleUpdateButton={handleUpdateButton}
            />
          );
        })}
      </div>

      {/* <button onClick={() => localStorage.clear()}>LS</button> */}
    </div>
  );
};

let mapStateToProps = (state: {
  cityInfoList: { cityInfoList: CityInfoType[]; cityList: string[] };
}) => {
  return {
    cityInfoList: state.cityInfoList.cityInfoList,
    cityList: state.cityInfoList.cityList,
  };
};

export default connect(mapStateToProps, {
  removeCityFromInfoList,
  updateCityWeather,
})(CardsContainer);

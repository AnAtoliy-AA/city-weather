import "./CardsContainer.scss";

import {removeActiveCity, removeCityFromInfoList, setCityInfoList, updateCityWeather} from '../../src/store/cityInfoList-reducer';

import CityCard from "../CityCard/CityCard";
import { connect } from "react-redux";

const CardsContainer = (props: any) => {
  const handleDeleteButton = (value: string) => {
    props.removeActiveCity(value);
    props.removeCityFromInfoList(value);
  };

  const handleUpdateButton = (value: string) => {
    props.updateCityWeather(value);
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
  removeCityFromInfoList,
  updateCityWeather,
})(CardsContainer);


import { addCity } from './cityList-reducer';

const ACTION_CONST = {
  SET_CITIES_INFO: "SET_CITIES_INFO",
  ADD_CITY_INFO: "ADD_CITY_INFO",
  REMOVE_ACTIVE_CITY_INFO: "REMOVE_ACTIVE_CITY_INFO",
};

let initialState = {
  cityInfoList: []
};

const cityLisReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_CONST.SET_CITIES_INFO: {
      return { ...state, cityInfoList: action.cityInfoList };
    }
    case ACTION_CONST.ADD_CITY_INFO: {
      return { ...state, cityInfoList: [...state.cityInfoList ,action.cityInfo] };
  }
    case ACTION_CONST.REMOVE_ACTIVE_CITY_INFO: {
        return { ...state, activeCityInfo: action.activeCityInfo };
    }
    default:
      return state;
  }
};

export const setCityInfoList = (cityInfoList: any) => ({
  type: ACTION_CONST.SET_CITIES_INFO,
  cityInfoList,
});
export const addCityToInfoList = (cityInfo: any) => ({
  type: ACTION_CONST.ADD_CITY_INFO,
  cityInfo,
});

export default cityLisReducer;

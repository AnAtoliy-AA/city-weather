import { CityInfoType } from "./../types/index";
import { mockState } from "./initialState";
import { weatherApi } from "../api/weatherApi";

const ACTION_CONST = {
  SET_CITIES_INFO: "SET_CITIES_INFO",
  ADD_CITY_INFO: "ADD_CITY_INFO",
  REMOVE_ACTIVE_CITY_INFO: "REMOVE_ACTIVE_CITY_INFO",
  UPDATE_ALL_CITIES_INFO: "UPDATE_ALL",
  UPDATE_CITY_INFO: "UPDATE_CITY_INFO",
};

let initialState = mockState;

const cityInfoListReducer = (
  state = initialState,
  action: {
    type: string;
    cityInfoList: CityInfoType[];
    cityInfo: CityInfoType;
    activeCity: string;
  }
) => {
  switch (action.type) {
    case ACTION_CONST.SET_CITIES_INFO: {
      return { ...state, cityInfoList: action.cityInfoList };
    }
    case ACTION_CONST.ADD_CITY_INFO: {
      if (state.cityList.includes(action.cityInfo.name)) {
        return state;
      } else
        return {
          ...state,
          cityList: [...state.cityList, action.cityInfo.name],
          cityInfoList: [...state.cityInfoList, action.cityInfo],
        };
    }
    case ACTION_CONST.REMOVE_ACTIVE_CITY_INFO: {
      return {
        ...state,
        cityList: state.cityList.filter((c) => c !== action.cityInfo.name),
        cityInfoList: state.cityInfoList.filter(
          (c) => c.name !== action.cityInfo.name
        ),
      };
    }
    case ACTION_CONST.UPDATE_ALL_CITIES_INFO: {
      return { ...state, cityInfoList: [...action.cityInfoList] };
    }
    case ACTION_CONST.UPDATE_CITY_INFO: {
      const index = state.cityInfoList.findIndex(
        (el) => el.id === action.cityInfo.id
      );
      const newCityList = state.cityInfoList.slice();
      newCityList.splice(index, 1, action.cityInfo);
      return { ...state, cityInfoList: [...newCityList] };
    }
    default:
      return state;
  }
};

export const addCityToInfoList = (cityInfo: CityInfoType) => ({
  type: ACTION_CONST.ADD_CITY_INFO,
  cityInfo,
});
export const removeCityFromInfoList = (cityInfo: CityInfoType) => ({
  type: ACTION_CONST.REMOVE_ACTIVE_CITY_INFO,
  cityInfo,
});
export const updateCityInInfoList = (cityInfo: CityInfoType) => ({
  type: ACTION_CONST.UPDATE_CITY_INFO,
  cityInfo,
});

export const updateAllCitiesInfo = (cityInfoList: CityInfoType[]) => ({
  type: ACTION_CONST.UPDATE_ALL_CITIES_INFO,
  cityInfoList,
});

export const getCityWeather = (cityName: string) => async (
  dispatch: (arg0: { type: string; cityInfo: CityInfoType }) => void
) => {
  const response = await weatherApi.getWeather(cityName);

  dispatch(addCityToInfoList(response));
};

export const updateCityWeather = (cityInfo: CityInfoType) => async (
  dispatch: (arg0: { type: string; cityInfo: CityInfoType }) => void
) => {
  const response = await weatherApi.getWeather(cityInfo.name);

  dispatch(updateCityInInfoList(response));
};

export const getAllCityWeather = (citiesNames: []) => async (
  dispatch: (arg0: { type: string; cityInfoList: CityInfoType[] }) => void
) => {
  const response = await weatherApi.getAllCitiesWeather(citiesNames);

  dispatch(updateAllCitiesInfo(response));
};

export default cityInfoListReducer;

import { CityInfoType } from './../types/index';
import { weatherApi } from "../api/weatherApi";

const ACTION_CONST = {
  SET_CITIES_INFO: "SET_CITIES_INFO",
  ADD_CITY_INFO: "ADD_CITY_INFO",
  REMOVE_ACTIVE_CITY_INFO: "REMOVE_ACTIVE_CITY_INFO",
  UPDATE_ALL_CITIES_INFO: "UPDATE_ALL",
  UPDATE_CITY_INFO: "UPDATE_CITY_INFO",
  SET_CITIES_LIST: "SET_CITIES_LIST",
  REMOVE_ACTIVE_CITY: "REMOVE_ACTIVE_CITY",
  ADD_CITY: "ADD_CITY",
};

let initialState = {
  cityList: ["Minsk"],
  cityInfoList: [{
    coord: {
    lon: 27.5667,
      lat: 53.9
    },
    weather: [
      {
        id: 600,
        main: "Snow",
        description: "light snow",
        icon: "13n"
      }
    ],
    base: "stations",
    main: {
      temp: -6.05,
      feels_like: -11.84,
      temp_min: -6.11,
      temp_max: -6,
      pressure: 1014,
      humidity: 79
    },
    visibility: 10000,
    wind: {
      speed: 4,
      deg: 340
    },
    snow: {
      "1h": 0.44
    },
    clouds: {
      all: 75
    },
    dt: 1615229579,
    sys: {
      type: 1,
      id: 8939,
      country: "BY",
      sunrise: 1615178497,
      sunset: 1615219181
    },
    timezone: 10800,
    id: 625144,
    name: "Minsk",
    cod: 200
  }],
};

// const ACTION_CONST = {
//   SET_CITIES_LIST: 'SET_CITIES_LIST',
//   REMOVE_ACTIVE_CITY: 'REMOVE_ACTIVE_CITY',
//   ADD_CITY: 'ADD_CITY',
// }

// let initialState = {

// }

// const cityListReducer = (state = initialState, action: { type: any; cityInfoList: any; activeCity: any; value: any }) => {
//   switch (action.type) {
//       case ACTION_CONST.SET_CITIES_LIST: {
//           return { ...state, cityList: action.cityInfoList }
//       }

//       case ACTION_CONST.ADD_CITY: {
//           return { ...state, cityList: [...state.cityList, action.activeCity] }
//       }
//       case ACTION_CONST.REMOVE_ACTIVE_CITY: {
//           return { ...state, cityList: state.cityList.filter(c => c !== action.activeCity) }
//       }
//       default:
//           return state;
//   }
// }

const cityInfoListReducer = (state = initialState, action: { type: string; cityInfoList: CityInfoType[]; cityInfo: CityInfoType; activeCity: string; }) => {
  switch (action.type) {
    case ACTION_CONST.SET_CITIES_INFO: {
      return { ...state, cityInfoList: action.cityInfoList };
    }
    case ACTION_CONST.ADD_CITY_INFO: {
      if (state.cityList.includes(action.cityInfo.name)) {
        return state
      }else  return {
        ...state,
        cityList: [...state.cityList, action.cityInfo.name],
        cityInfoList: [...state.cityInfoList, action.cityInfo],
      };
    }
    case ACTION_CONST.REMOVE_ACTIVE_CITY_INFO: {
      return {
        ...state,
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
    case ACTION_CONST.SET_CITIES_LIST: {
      return { ...state, cityList: action.cityInfoList };
    }

    case ACTION_CONST.ADD_CITY: {
      return { ...state, cityList: [...state.cityList, action.cityInfo] };
    }
    case ACTION_CONST.REMOVE_ACTIVE_CITY: {
      return {
        ...state,
        cityList: state.cityList.filter((c) => c !== action.cityInfo.name),
      };
    }
    default:
      return state;
  }
};

export const setCityInfoList = (cityInfoList: CityInfoType[]) => ({
  type: ACTION_CONST.SET_CITIES_INFO,
  cityInfoList,
});
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

export const setCitiesList = (cityInfoList: CityInfoType[]) => ({
  type: ACTION_CONST.SET_CITIES_LIST,
  cityInfoList,
});
export const addCity = (activeCity: string) => ({
  type: ACTION_CONST.ADD_CITY,
  activeCity,
});
export const removeActiveCity = (cityInfo: CityInfoType) => ({
  type: ACTION_CONST.REMOVE_ACTIVE_CITY,
  cityInfo,
});

// export const getCityWeather = (cityName: string) => async (dispatch: any) => {
//   const response = await weatherApi.getWeather(cityName);

//   dispatch(addCityToInfoList(response));
// };
export const getCityWeather = (cityName: string) => async (dispatch: (arg0: { type: string; cityInfo: CityInfoType; }) => void) => {
  const response = await weatherApi.getWeather(cityName);

  dispatch(addCityToInfoList(response));
};


export const updateCityWeather = (cityName: string) => async (
  dispatch: any
) => {
  const response = await weatherApi.getWeather(cityName);

  dispatch(updateCityInInfoList(response));
};

export const getAllCityWeather = (citiesNames: []) => async (dispatch: any) => {
  const response = await weatherApi.getAllCitiesWeather(citiesNames);

  dispatch(updateAllCitiesInfo(response));
};

export default cityInfoListReducer;

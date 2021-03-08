import { weatherApi } from '../api/weatherApi';

const ACTION_CONST = {
  SET_CITIES_INFO: "SET_CITIES_INFO",
  ADD_CITY_INFO: "ADD_CITY_INFO",
  REMOVE_ACTIVE_CITY_INFO: "REMOVE_ACTIVE_CITY_INFO",
  UPDATE_ALL_CITIES_INFO: 'UPDATE_ALL',
  UPDATE_CITY_INFO: 'UPDATE_CITY_INFO',
  SET_CITIES_LIST: 'SET_CITIES_LIST',
  REMOVE_ACTIVE_CITY: 'REMOVE_ACTIVE_CITY',
  ADD_CITY: 'ADD_CITY',
};

let initialState = {
  cityList: [],
  cityInfoList: [
    {name: ''},
  ]
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



const cityListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_CONST.SET_CITIES_INFO: {
      return { ...state, cityInfoList: action.cityInfoList };
    }
    case ACTION_CONST.ADD_CITY_INFO: {
      return { ...state, cityInfoList: [...state.cityInfoList ,action.cityInfo] };
  }
    case ACTION_CONST.REMOVE_ACTIVE_CITY_INFO: {
      return { ...state, cityInfoList: state.cityInfoList.filter(c => c.name !== action.cityInfo) }
    }
    case ACTION_CONST.UPDATE_ALL_CITIES_INFO: {
      return { ...state, cityInfoList: [...action.cityInfoList] }
    }
    case ACTION_CONST.UPDATE_CITY_INFO: {
      return { ...state, cityInfoList: state.cityInfoList.filter(c => c.name !== action.cityInfo) }
    }
    case ACTION_CONST.SET_CITIES_LIST: {
      return { ...state, cityList: action.cityInfoList }
  }
  
  case ACTION_CONST.ADD_CITY: {
      return { ...state, cityList: [...state.cityList, action.activeCity] }
  }
  case ACTION_CONST.REMOVE_ACTIVE_CITY: {
      return { ...state, cityList: state.cityList.filter(c => c !== action.activeCity) }
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
export const removeCityFromInfoList = (cityInfo: any) => ({
  type: ACTION_CONST.REMOVE_ACTIVE_CITY_INFO,
  cityInfo,
});

export const updateAllCitiesInfo = (cityInfoList: any) => ({
  type: ACTION_CONST.UPDATE_ALL_CITIES_INFO,
  cityInfoList,
});

export const setCitiesList = (cityInfoList: any) => ({ type: ACTION_CONST.SET_CITIES_LIST, cityInfoList })
export const addCity = (activeCity: any) => ({ type: ACTION_CONST.ADD_CITY, activeCity });
export const removeActiveCity = (activeCity: any) => ({ type: ACTION_CONST.REMOVE_ACTIVE_CITY, activeCity });

export const getCityWeather = (cityName: string) => async (dispatch: any) => {
  const response = await weatherApi.getWeather(cityName);

  dispatch(addCityToInfoList(response));
}



export default cityListReducer;

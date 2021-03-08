

const ACTION_CONST = {
    SET_CITIES_LIST: 'SET_CITIES_LIST',
    REMOVE_ACTIVE_CITY: 'REMOVE_ACTIVE_CITY',
    ADD_CITY: 'ADD_CITY',
}

let initialState = {
    cityList: []
}

const cityListReducer = (state = initialState, action: { type: any; cityInfoList: any; activeCity: any; value: any }) => {
    switch (action.type) {
        case ACTION_CONST.SET_CITIES_LIST: {
            return { ...state, cityList: action.cityInfoList }
        }
        
        case ACTION_CONST.ADD_CITY: {
            return { ...state, cityList: [...state.cityList, action.activeCity] }
        }
        default:
            return state;
    }
}

export const setCitiesList = (cityInfoList: any) => ({ type: ACTION_CONST.SET_CITIES_LIST, cityInfoList })
export const addCity = (activeCity: any) => ({ type: ACTION_CONST.ADD_CITY, activeCity });
export const removeActiveCity = (activeCity: any) => ({ type: ACTION_CONST.REMOVE_ACTIVE_CITY, activeCity });

// export const getWorldWide = () => {
//     return (dispatch: (arg0: any) => void) => {
//         countriesAPI.getWorldWide()
//             .then((data: { Global: any }) => {
//                 dispatch(setWorldWideData(data.Global));
//                 dispatch(setCovidTableWorldWideData(data.Global));
//             });
//     }
// }

// export const getCountriesInfo = () => {
//     return (dispatch: (arg0: { type: string; countryInfoList: any }) => void) => {
//         countriesAPI.getCountriesInfo()
//             .then((data: any) => {
//                 dispatch(setCountriesInfoData(data));
//             });
//     }
// }

export default cityListReducer;

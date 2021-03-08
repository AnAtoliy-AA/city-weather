import { autocompleteApi } from '../api/autoCompleteApi';

const ACTION_CONST = {
  SET_AUTOCOMPLETE_CITIES_INFO: "SET_AUTOCOMPLETE_CITIES_INFO",
  CLEAR_AUTOCOMPLETE_CITIES_INFO: "REMOVE_AUTOCOMPLETE_CITIES_INFO",
};

let initialState = {
    autoCompleteInfo : [],
};

const autoCompleteReducer = (state = initialState, action: { type: string; citiesNames: string[] }) => {
  switch (action.type) {
    case ACTION_CONST.SET_AUTOCOMPLETE_CITIES_INFO: {
      return { ...state, autoCompleteInfo: action.citiesNames };
    }
    case ACTION_CONST.CLEAR_AUTOCOMPLETE_CITIES_INFO: {
      return { ...state, autoCompleteInfo: [] };
    }
    default:
      return state;
  }
};

export const setAutocompleteCitiesNames = (citiesNames: string[]) => ({
  type: ACTION_CONST.SET_AUTOCOMPLETE_CITIES_INFO,
  citiesNames,
});

export const clearAutocompleteCitiesNames = () => ({
    type: ACTION_CONST.CLEAR_AUTOCOMPLETE_CITIES_INFO,
  });

export const getAutocompleteCitiesNames = (cityName: string) => async (dispatch: any)=> {
  const response = await autocompleteApi.getAutocomplete(cityName);

  dispatch(setAutocompleteCitiesNames(response));
};

export default autoCompleteReducer;

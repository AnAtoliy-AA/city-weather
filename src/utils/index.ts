const LOCAL_STORAGE_NAME_WEATHER = 'city-weather';
export const LOCAL_STORAGE_NAME_CITY = 'city-name'

export const loadState = (state: string = LOCAL_STORAGE_NAME_WEATHER) => {

    try {
        const serializedState = localStorage.getItem(state);
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: any, destination: string = LOCAL_STORAGE_NAME_WEATHER) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem(destination, serializedState);
    } catch (err){
        return undefined;
    }
}
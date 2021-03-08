import "./App.scss";

import CardsContainer from "./CardsContainer/CardsContainer";
import { Provider } from "react-redux";
import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import store from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SearchForm />
        <CardsContainer />
      </Provider>
    </div>
  );
}

export default App;

import './App.scss';

import CardsContainer from './CardsContainer/CardsContainer';
import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import axios from "axios";

function App() {
  return (
    <div className="App">
      <SearchForm />
      <CardsContainer />
    </div>
  );
}

export default App;

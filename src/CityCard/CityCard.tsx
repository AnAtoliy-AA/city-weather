import "./CityCard.scss";

import Moment from "react-moment";
import React from "react";

const CityCard = (props: any) => {


    

  return (
    <div className="city__card">
      <h3>City: {props.city.name}</h3>
      <p>Temperature: {props.city.main.temp} &deg;C</p>
      <p>{props.city.main.humidity}</p>
      <p>{props.city.main.pressure}</p>
      <p>{props.city.wind.speed}</p>
      <span style={{ transform: `rotate(${props.city.wind.deg}deg)` }}>&#10224;</span>
      <button onClick={() => props.handleDeleteButton(props.city.name)}>delete</button>
      <button onClick={() => props.handleUpdateButton(props.city.name)}>update</button>
      <Moment unix format="D MMMM YYYY HH:MM:SS">
        {props.city.dt}
      </Moment>
      <p></p>
    </div>
  );
};

export default CityCard;

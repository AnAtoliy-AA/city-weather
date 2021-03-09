import "./CityCard.scss";

import Moment from "react-moment";
import React from "react";
import { WORDS_CONFIG } from "../shared/wordsConfig";

const CityCard = (props: any) => {
  return (
    <div className="city__card">
      <h3>
        {WORDS_CONFIG.CITY}: {props.city.name}
      </h3>
      <p>
        {WORDS_CONFIG.TEMPERATURE}: {props.city.main.temp}
        {WORDS_CONFIG.CELSIUS}
        <img
          src={`http://openweathermap.org/img/w/${props.city.weather[0].icon}.png`}
          alt=""
        />
      </p>
      <p>
        {WORDS_CONFIG.HUMIDITY}: {props.city.main.humidity} %
      </p>
      <p>
        {WORDS_CONFIG.PRESSURE}: {props.city.main.pressure}
      </p>
      <div className="card__wind">
        {WORDS_CONFIG.WIND}: {props.city.wind.speed}
        <span>{WORDS_CONFIG.METERS_IN_SECOND}</span>
        <span style={{ transform: `rotate(${props.city.wind.deg}deg)` }}>
          &#10224;
        </span>
      </div>
      <div className="card__controls">
        <button onClick={() => props.handleDeleteButton(props.city)}>
          {WORDS_CONFIG.DELETE}
        </button>
        <button onClick={() => props.handleUpdateButton(props.city)}>
          {WORDS_CONFIG.UPDATE}
        </button>
      </div>
      <div>
        {WORDS_CONFIG.LAST_UPDATE}
        <Moment unix format="D MMMM YYYY HH:MM:SS">
          {props.city.dt}
        </Moment>
      </div>
      <p></p>
    </div>
  );
};

export default CityCard;

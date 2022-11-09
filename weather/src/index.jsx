import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"

import { useState, useEffect } from "react";
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { MdAdsClick } from "react-icons/md";
import { WiDayCloudyWindy, WiDayHaze, WiDayFog, WiNightAltCloudy,WiThermometer,WiRaindrop } from "react-icons/wi";

let num1 = 0;



function Hi() {

  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});



  const submitHandler = (e) => {
    e.preventDefault();

    console.log("city: " + cityName);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
      .then(function (response) {

        console.log("data: ", response.data);

        setWeather(response.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    const getWeather = () => { // get current weather 
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
        .then(function (response) {

          console.log("data: ", response.data);
          setWeather(response.data)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    getWeather();
  }, [])



  return <div>
  <center>
    <h1 className='heading'>
      WEATHER APP:
    </h1></center>
<center>    <form onSubmit={submitHandler}>

      <input
        type="text"
        placeholder='enter your city name'
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />
      <br/>
        
      <button type="submit"><BsArrowRight /></button>

    </form>
</center>

    <br />
  

    {(weather?.name) ?
<center>
      <div className='card'><h3>
      {/* <u><h1 className='head'>Weather Forecast</h1></u> */}
        <div>{weather?.name}</div>
        <div><WiDayCloudyWindy size="4em"/></div><hr/><hr/>
        <div>Current-Temp  <br/><span><WiDayFog size="2em"/></span>{weather?.main?.temp}°C</div><hr/><hr/>
        <span>Max-Temp<br/><span><WiDayHaze size="2em"/></span>{weather?.main?.temp_max}°C</span><hr/><hr/>
        <div>Min-Temp<br/><span><WiNightAltCloudy size="2em"/></span>{weather?.main?.temp_min}°C</div><hr/><hr/>
        <div>Feel-Like<br/><span><WiThermometer size="2em"/></span>{weather?.main?.temp_min}°C</div><hr/><hr/>
        <div>humidity<br/><span><WiRaindrop size="2em"/></span>{weather?.main?.humidity}°C</div>
        </h3>
      </div>
      </center>
      :
      null
    }

  </div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));
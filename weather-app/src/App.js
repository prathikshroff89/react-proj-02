import React, { useState } from 'react';

const apiInfo = {
  apiKey: "d3ecc673556f47b5d5e40e44d4545995",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${apiInfo.baseUrl}?q=${query}&units=imperial&APPID=${apiInfo.apiKey}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  let changeBackground = (w) => {
    if(typeof w != "undefined"){
      console.log(`W: ${w.weather[0]}`);
      if(w.weather[0].main === "Clouds"){
        console.log(`Weather: ${w.weather[0].main}`);
        return 'app cloudy';
      }
      else if(w.weather[0].main === "Rain"){
        return 'app rainy';
      }
      else if(w.weather[0].main === "Clear"){
        return 'app sunny';
      }
      
    }
    else {
      return 'app';
    }
  }
  
  //console.log("Weather: "+JSON.stringify(weather));
  //changeBackground(weather)
  return (
    <div className={(typeof weather.main != "undefined") ? changeBackground(weather) : 'app'}>
      
      
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="City Name, State, Country"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°F
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;

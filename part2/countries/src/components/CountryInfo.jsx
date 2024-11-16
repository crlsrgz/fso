/**
 * Process an array with a single object from the filtered elements
 * returns the object values.
 * @param {Object} filteredCountries result one Object of the filtered array.
 * @returns {HTMLElement}
 */
export default function CountryInfo({ filteredCountry, weather = "empty" }) {
  console.log("weather data", weather);
  return (
    <div>
      <h1>{filteredCountry.name.common}</h1>
      <div>Capital {filteredCountry.capital}</div>
      <div>Area {filteredCountry.area}</div>
      <h5>Languages:</h5>
      <div>
        <ul>
          {Object.values(filteredCountry.languages).map((language) => {
            return (
              <li key={`${filteredCountry.name.common}-${language}`}>
                {language}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <img
          src={filteredCountry.flags.png}
          alt={filteredCountry.name.common + " flag"}
        />
      </div>
      <div>
        <h2>Weather in {filteredCountry.name.common}</h2>
        <p>Temperature {weather.main.temp}°C</p>
        <p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather-icon"
          />
        </p>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}

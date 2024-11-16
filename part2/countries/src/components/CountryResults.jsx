import { useState } from "react";
import CountryInfo from "./CountryInfo";
import CountryList from "./CountryList";
import { useEffect } from "react";
import axios from "axios";

/**
 * Returns a list or a single country data
 * @param {Array} countries array with the countries as Objects
 * @param {string} searchCountry
 * @returns {HTMLDivElement}
 */

export default function CountryResult({
  countries,
  searchCountry,
  interactingWithInput,
}) {
  const [openCountry, setOpenCountry] = useState(interactingWithInput);
  const [displaySingleCountry, setDisplaySingleCountry] = useState(false);

  const [weatherInfo, setWeatherInfo] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [weaKey, _] = useState(import.meta.env.VITE_WEA_KEY);

  function handleClick(event) {
    // console.log(event.target.value);
    // console.log(event.target.dataset.countryname);
    const tmp = event.target.dataset.countryname;
    const tmpCountry = countries.filter((country) => {
      return country.name.common === tmp;
    });
    setOpenCountry(tmpCountry);
    setDisplaySingleCountry(true);
    console.log("interactingWithInput", interactingWithInput);
    // console.log(tmp);
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry)
  );

  function weatherGet(countryName, apiKey) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=metric&appid=${apiKey}`
      )
      .then((response) => setWeatherInfo(response.data));
  }

  useEffect(() => {
    setDisplaySingleCountry(false);
  }, [interactingWithInput]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const tmpCountry = [...filteredCountries];
      setOpenCountry(tmpCountry);
      //   const tmp = openCountry;
      //   console.log("weaKey", weaKey);
      //   console.log("filteredCountries", filteredCountries);

      //   console.log("openCountry", openCountry[0]);
      //   console.log("tmp", tmp);

      weatherGet(tmpCountry[0].name.common, weaKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCountries.length]);

  return (
    <div>
      {filteredCountries.length > 10 && searchCountry === "" ? (
        "Type to find a country"
      ) : filteredCountries.length > 10 ? (
        "To many matches, plese keey writing"
      ) : filteredCountries.length <= 0 ? (
        "Nothing found"
      ) : filteredCountries.length === 1 ? (
        /* 💡 TODO open country instead filteredCOuntries*/
        <CountryInfo
          filteredCountry={filteredCountries[0]}
          weather={weatherInfo}
        />
      ) : displaySingleCountry === true ? (
        // console.log("nothing", openCountry)
        <CountryInfo filteredCountry={openCountry[0]} weather={weatherInfo} />
      ) : (
        <CountryList
          filteredCountries={filteredCountries}
          handleClick={(e) => handleClick(e)}
        />
      )}
    </div>
  );
} //

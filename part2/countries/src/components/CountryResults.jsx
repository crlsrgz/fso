import { useState } from "react";
import CountryInfo from "./CountryInfo";
import CountryList from "./CountryList";

/**
 * Returns a list or a single country data
 * @param {Array} countries array with the countries as Objects
 * @param {string} searchCountry
 * @returns {HTMLDivElement}
 */

export default function CountryResult({ countries, searchCountry }) {
  const [openCountry, setOpenCountry] = useState("-");

  function handleClick(event) {
    // console.log(event.target.value);
    // console.log(event.target.dataset.countryname);
    const tmp = event.target.dataset.countryname;
    setOpenCountry(tmp);
    // setOpenCountry(event.target.dataset.countryname);
    console.log(tmp);
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry)
  );
  return (
    <div>
      {filteredCountries.length > 10 && searchCountry === "" ? (
        "Type to find a country"
      ) : filteredCountries.length > 10 ? (
        "To many matches, plese keey writing"
      ) : filteredCountries.length <= 0 ? (
        "Nothing found"
      ) : filteredCountries.length === 1 ? (
        <CountryInfo filteredCountries={filteredCountries} />
      ) : openCountry !== "-" ? (
        console.log(filteredCountries[0])
      ) : (
        <CountryList
          filteredCountries={filteredCountries}
          handleClick={(e) => handleClick(e)}
        />
      )}
    </div>
  );
}

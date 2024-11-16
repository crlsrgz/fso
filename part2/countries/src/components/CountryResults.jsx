import { useState } from "react";
import CountryInfo from "./CountryInfo";
import CountryList from "./CountryList";
import { useEffect } from "react";

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

  useEffect(() => {
    setDisplaySingleCountry(false);
  }, [interactingWithInput]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setOpenCountry(filteredCountries);
    }
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
        <CountryInfo filteredCountry={openCountry[0]} />
      ) : displaySingleCountry === true ? (
        // console.log("nothing", openCountry)
        <CountryInfo filteredCountry={openCountry[0]} />
      ) : (
        <CountryList
          filteredCountries={filteredCountries}
          handleClick={(e) => handleClick(e)}
        />
      )}
    </div>
  );
} //

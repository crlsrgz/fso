import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function CountryResult({ countries, searchCountry }) {
  // const arr = [...countries];
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry)
  );
  return (
    <div>
      {filteredCountries.length > 10 ? (
        "to many matches, plese keey writing"
      ) : filteredCountries.length === 1 ? (
        <div>
          <div>{filteredCountries[0].name.common}</div>
          <div>{filteredCountries[0].capital}</div>
          <div>{filteredCountries[0].area}</div>
          <div>
            {Object.values(filteredCountries[0].languages).map((lang) =>
              console.log(lang)
            )}
            {Object.values(filteredCountries[0].languages).map((language) => {
              return (
                <p key={`${filteredCountries[0].name.common}-${language}`}>
                  {language}
                </p>
              );
            })}
          </div>
          <div>{filteredCountries[0].flag}</div>
        </div>
      ) : (
        filteredCountries.map((country) => {
          return (
            <p key={country.cca2}>
              <span>{country.name.common}</span>
              <span>
                <button
                  onClick={() => {
                    console.log("clicked", country.name.common);
                  }}
                >
                  show
                </button>
              </span>
            </p>
          );
        })
      )}
    </div>
  );
}

function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  // axios
  //   .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
  //   .then((response) => {
  //     return response.data;
  //   })
  // .then((data) => {
  // console.log(
  //   data.name.common
  // data.capital[0],
  // data.area,
  // data.languages,
  // data.flag
  // );
  // });
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setAllCountries(data);
      });
  }, []);

  function checkInput(event) {
    // console.log(event.target.value);
    setSearchCountry(event.target.value.toLowerCase());
  }

  /*:: Separating functionality WIP ::*/

  return (
    <>
      <div>
        find countries{" "}
        <input type="text" value={searchCountry} onChange={checkInput} />
      </div>
      <div>
        <CountryResult countries={allCountries} searchCountry={searchCountry} />
      </div>
    </>
  );
}

export default App;

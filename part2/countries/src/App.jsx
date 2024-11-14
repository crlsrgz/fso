import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CountryResult from "./components/CountryResults";

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

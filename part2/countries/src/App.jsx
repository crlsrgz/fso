import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CountryResult from "./components/CountryResults";

function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [interactingWithInput, setSelectCountry] = useState(false);

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
    setSearchCountry(event.target.value.toLowerCase());
    setSelectCountry(!interactingWithInput);
  }

  /*:: Separating functionality WIP ::*/

  return (
    <>
      <div>
        find countries{" "}
        <input type="text" value={searchCountry} onChange={checkInput} />
      </div>
      <div>
        <CountryResult
          countries={allCountries}
          searchCountry={searchCountry}
          interactingWithInput={interactingWithInput}
        />
      </div>
    </>
  );
}

export default App;

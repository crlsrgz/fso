import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [country, setCountry] = useState("spain");
  const [searchCountry, setSearchCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filterResults, setFilterResults] = useState([]);

  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      // console.log(
      //   data.name.common
      // data.capital[0],
      // data.area,
      // data.languages,
      // data.flag
      // );
    });
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

    setSearchCountry(event.target.value);
    const tmpCountries = allCountries.filter(
      (country) => searchCountry === country.name.common
    );

    setFilterResults(tmpCountries);
    console.log(filterResults);
  }
  return (
    <>
      <div>
        find countries{" "}
        <input type="text" value={searchCountry} onChange={checkInput} />
      </div>
      <div>a</div>
    </>
  );
}

export default App;

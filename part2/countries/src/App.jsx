import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [country, setCountry] = useState("spain");
  const [searchCountry, setSearchCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filterResults, setFilterResults] = useState([]);

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
    setSearchCountry(event.target.value);
  }

  /*:: Separating functionality WIP ::*/

  function filterCountries() {
    const tmpCountries = allCountries.filter((country) =>
      country.name.common.includes(searchCountry)
    );

    setFilterResults(tmpCountries);
    console.log(filterResults);
  }
  /*:: Testing returned values ::*/

  useEffect(() => {
    filterCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCountry]);

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

import axios from "axios";
import { useState } from "react";

function App() {
  const [country, setCountry] = useState("spain");

  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then((response) => {
      console.log(response);
    });

  return (
    <>
      <div>
        find countries <input type="text" />
      </div>
      <div>a</div>
    </>
  );
}

export default App;

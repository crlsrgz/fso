/**
 * Process an array with a single object from the filtered elements
 * returns the object values.
 * @param {Object} filteredCountries result one Object of the filtered array.
 * @returns {HTMLElement}
 */
export default function CountryInfo({ filteredCountry }) {
  return (
    <div>
      <h1>{filteredCountry.name.common}</h1>
      <div>{filteredCountry.capital}</div>
      <div>{filteredCountry.area}</div>
      <h5>languages:</h5>
      <div>
        {Object.values(filteredCountry.languages).map((lang) =>
          console.log(lang)
        )}
        {Object.values(filteredCountry.languages).map((language) => {
          return (
            <p key={`${filteredCountry.name.common}-${language}`}>{language}</p>
          );
        })}
      </div>
      <div>
        <img
          src={filteredCountry.flags.png}
          alt={filteredCountry.name.common + " flag"}
        />
      </div>
    </div>
  );
}

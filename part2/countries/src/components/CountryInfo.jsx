/**
 * Process an array with a single object from the filtered elements
 * returns the object values.
 * @param {Object} filteredCountries result one Object of the filtered array.
 * @returns {HTMLElement}
 */
export default function CountryInfo({ filteredCountry }) {
  return (
    <div>
      <div>{filteredCountry.name.common}</div>
      <div>{filteredCountry.capital}</div>
      <div>{filteredCountry.area}</div>
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
      <div>{filteredCountry.flag}</div>
    </div>
  );
}

/**
 * Process an array with a single object from the filtered elements
 * returns the object values.
 * @param {Array} filteredCountries filtered array with just one item.
 * @returns {HTMLElement}
 */
export default function CountryInfo({ filteredCountries }) {
  return (
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
  );
}

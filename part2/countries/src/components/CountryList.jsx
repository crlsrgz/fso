export default function CountryList({ filteredCountries, handleClick }) {
  return filteredCountries.map((country) => {
    return (
      <p key={country.cca2}>
        <span>{country.name.common}</span>
        <span>
          <button
            data-countryname={country.name.common}
            onClick={(event) => handleClick(event)}
          >
            show
          </button>
        </span>
      </p>
    );
  });
}

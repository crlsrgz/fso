export default function CountryList({ filteredCountries }) {
  return filteredCountries.map((country) => {
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
  });
}

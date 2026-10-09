
const ExpandedCountryInfo = ({ data, notify }) => {

  const countryName = data.name.common
  const countryCapitals = data.capital.join(', ')
  const countryArea = data.area
  const countryLanguages = Object.entries(data.languages)
  const countryFlagPng = data.flags.png

  return (
    <div>
      <h1>{countryName}</h1>
      <p>Capital: {countryCapitals}</p>
      <p>Area: {countryArea} km<sup>2</sup></p>
      <h2>Languages</h2>
      <ul>
        {countryLanguages.map(([code, lang]) => (
          <li key={code}>{lang}</li>
        ))}
      </ul>
      <img
        src={countryFlagPng}
        alt={`${countryName} flag`}
        style={{ border: "2px solid black" }} />
    </div>
  )
}

export default ExpandedCountryInfo
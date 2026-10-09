import WeatherWidget from "./WeatherWidget"

const ExpandedCountryInfo = ({ data, notify }) => {

  const countryName = data.name.common
  const countryCapital = data.capital[0]
  const countryArea = data.area
  const countryLanguages = Object.entries(data.languages)
  const countryFlagPng = data.flags.png
  const [lat, lng] = data.capitalInfo.latlng

  return (
    <div>
      <h1>{countryName}</h1>
      <p>Capital: {countryCapital}</p>
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
      <WeatherWidget capital={countryCapital} lat={lat} lng={lng} notify={notify} />
    </div>
  )
}

export default ExpandedCountryInfo
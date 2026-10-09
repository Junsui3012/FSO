import { useState } from "react"
import ExpandedCountryInfo from "./ExpandedCountryInfo"

const CountryOptions = ({ displayList, notify }) => {

  const [shownCountry, setShownCountry] = useState(null)

  if (shownCountry) return (
    <div>
      <button onClick={() => setShownCountry(null)}>
        return
      </button>
      <ExpandedCountryInfo notify={notify} data={shownCountry} />
    </div>
  )
  return (
    <div>
      {displayList.map(val => (
        <p key={val.key_id}>{val.name.common} <button onClick={() => setShownCountry(val)}>show</button></p>
      ))}
    </div>
  )
}

export default CountryOptions
import { useRef } from "react"
import ExpandedCountryInfo from "./ExpandedCountryInfo"
import CountryOptions from "./CountryOptions"

const Display = ({ displayList, notify }) => {

  const renderId = useRef(0)

  const listLength = displayList.length

  if (listLength === 0) return (
    <div>
      <p>No results to display...</p>
    </div>
  )
  else if (listLength > 10) return (
    <div>
      <p>Too many matches, please be more specific...</p>
    </div>
  )
  else if (listLength === 1) return (
    <ExpandedCountryInfo data={displayList[0]} notify={notify} />
  )
  else {
    renderId.current += 1
    return (
      <CountryOptions key={renderId.current} displayList={displayList} notify={notify} />
    )
  }
}

export default Display
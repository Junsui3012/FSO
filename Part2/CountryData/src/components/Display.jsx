import ExpandedCountryInfo from "./ExpandedCountryInfo"


const Display = ({ displayList, notify }) => {

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
  else return (
    <div>
      {displayList.map(val => (
        <p key={val.key_id}>{val.name.common}</p>
      ))}
    </div>
  )
}

export default Display
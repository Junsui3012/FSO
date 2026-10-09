import { useState } from "react"
import Display from "./Display"

const Countries = ({ countryList, notify }) => {

  const [query, setQuery] = useState("")

  const onChange = (e) => setQuery(e.target.value)

  const cleanQuery = query.trim().toLowerCase()

  const exactMatch = countryList.find(val => val.name.common.toLowerCase() === cleanQuery)

  const allMatches = (cleanQuery === "") ? [] : countryList.filter(val => val.name.common.toLowerCase().includes(cleanQuery))

  const displayList = (exactMatch) ? [exactMatch] : allMatches

  return (
    <>
      <div>
        <label htmlFor="search_bar">Search Country: </label>
        <input
          type="text"
          name="search_bar"
          id="search_bar"
          placeholder="abc..."
          value={query}
          onChange={onChange} />
      </div>
      {(!query) ? (
        <div>
          <p>Enter a query to seach</p>
        </div>
      ) : (
        <Display displayList={displayList} notify={notify} />
      )}
    </>
  )
}

export default Countries
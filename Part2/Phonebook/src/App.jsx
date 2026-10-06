import { useState, useEffect } from "react"
import NewNumberForm from "./NewNumberForm"
import DisplayList from "./DisplayList"
import Filter from "./Filter"

const App = () => {
  const [numberList, setNumberList] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const url = "http://localhost:3001/persons"
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return response.json()       
      })
      .then(data => {
        setNumberList(data)
      })
      .catch(err => alert(`Error encountered ${err.message}`))
  }, [])

  const handleListUpdate = (newEntry) => {
    setNumberList([...numberList, newEntry])
    setSearchQuery("")
  }
  const handleSearchQuery = (e) => setSearchQuery(e.target.value)

  const displayedList = (searchQuery === "") ? numberList : numberList.filter(value => {
    const lowCaseVal = value.name.toLowerCase()
    const lowCaseQuery = searchQuery.toLowerCase()
    return lowCaseVal.includes(lowCaseQuery)
  })

  return (
    <>
      <h1>Phonebook</h1>
      <Filter searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
      <NewNumberForm handleListUpdate={handleListUpdate} numberList={numberList} />
      <DisplayList numberList={displayedList} />
    </>
  )
}

export default App
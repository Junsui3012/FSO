import { useState } from "react"
import NewNumberForm from "./NewNumberForm"
import DisplayList from "./DisplayList"
import Filter from "./Filter"

const App = () => {
  const [numberList, setNumberList] = useState([
    { id: 1, name: "Adrian", number: "+89-7346731849" },
    { id: 2, name: "Drake", number: "+89-7320013439" },
    { id: 3, name: "Rihanna", number: "+89-1204781849" },
  ])
  const [searchQuery, setSearchQuery] = useState("")

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
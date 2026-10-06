import { useState, useEffect } from "react"
import NewNumberForm from "./NewNumberForm"
import DisplayList from "./DisplayList"
import Filter from "./Filter"
import listOperations from "./services/backendOperations"

const App = () => {
  const [numberList, setNumberList] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    listOperations.getAllNumbers()
      .then(data => {
        setNumberList(data)
      })
      .catch(err => alert(`Error encountered ${err.message}`))
  }, [])

  const handleListUpdate = (newEntry) => {
    const foundEntry = numberList.find(val => val.name === newEntry.name)
    if (foundEntry) {
      if (confirm(`Update number for ${foundEntry.name}?`)) {
        listOperations.updateNumber(foundEntry.id, newEntry)
          .then(data => {
            setNumberList(numberList.map(val => val.id === data.id ? data : val))
          })
          .catch(err => alert(`${err.message}`))
      }
      return
    }
    listOperations.createNewNumber(newEntry)
      .then(data => {
        setNumberList([...numberList, data])
      })
      .catch(err => alert(`${err.message}`))
    setSearchQuery("")
  }
  const handleDelete = (id) => {
    const delEntry = numberList.find(val => val.id === id)
    if (!delEntry) return alert(`${id} doesn't exist`)
    if (!confirm(`Delete entry for ${delEntry.name}?`)) return
    listOperations.deleteNumber(id)
      .then(data => {
        setNumberList(numberList.filter(val => val.id !== data.id))
      })
      .catch(err => alert(`${err.message}`))
  }
  const onSearchQueryChange = (e) => setSearchQuery(e.target.value)

  const displayedList = (searchQuery === "") ? numberList : numberList.filter(value => {
    const lowCaseVal = value.name.toLowerCase()
    const lowCaseQuery = searchQuery.trim().toLowerCase()
    return lowCaseVal.includes(lowCaseQuery)
  })

  return (
    <>
      <h1>Phonebook</h1>
      <Filter searchQuery={searchQuery} handleSearchQuery={onSearchQueryChange} />
      <NewNumberForm handleListUpdate={handleListUpdate} />
      <DisplayList numberList={displayedList} onDelete={handleDelete} />
    </>
  )
}

export default App
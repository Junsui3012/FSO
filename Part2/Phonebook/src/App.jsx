import { useState, useEffect, useRef } from "react"
import NewNumberForm from "./components/NewNumberForm"
import DisplayList from "./components/DisplayList"
import Filter from "./components/Filter"
import listOperations from "./services/backendOperations"
import Notification from "./components/Notification"

const App = () => {
  const [numberList, setNumberList] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationState, setNotificationState] = useState({ state: 0, msg: "" })
  const timerId = useRef(null)

  const handleNotify = (state, message) => {
    // -1 for error, 1 for success
    clearTimeout(timerId.current)
    setNotificationState({ state: state, msg: message })
    timerId.current = setTimeout(() => { setNotificationState({ state: 0, msg: "" }) }, 5000)
  }

  useEffect(() => {
    listOperations.getAllNumbers()
      .then(data => {
        setNumberList(data)
      })
      .catch(err => handleNotify(-1, `Error encountered ${err.message}`))
  }, [])

  const handleListUpdate = (newEntry) => {
    const foundEntry = numberList.find(val => val.name === newEntry.name)
    if (foundEntry) {
      if (confirm(`Update number for ${foundEntry.name}?`)) {
        return listOperations.updateNumber(foundEntry.id, newEntry)
          .then(data => {
            setNumberList(numberList.map(val => val.id === data.id ? data : val))
            setSearchQuery("")
            handleNotify(1, `Successfully updated ${data.name}`)
            return true
          })
          .catch(err => {
            if (err.status === 404) {
              handleNotify(-1, `${err.message}: ${foundEntry.name} not found on server`)
              setNumberList(numberList.filter(val => val.id !== foundEntry.id))
            }
            else { handleNotify(-1, `${err.message}: Server error`) }
            return false
          })
      }
      return Promise.resolve(false)
    }

    return listOperations.createNewNumber(newEntry)
      .then(data => {
        setNumberList([...numberList, data])
        setSearchQuery("")
        handleNotify(1, `Successfully added ${data.name}`)
        return true
      })
      .catch(err => {
        handleNotify(-1, `${err.message}: Server error`)
        return false
      })
  }
  const handleDelete = (id) => {
    const delEntry = numberList.find(val => val.id === id)
    if (!delEntry) return handleNotify(-1, `${id} doesn't exist`)
    if (!confirm(`Delete entry for ${delEntry.name}?`)) return
    listOperations.deleteNumber(id)
      .then(data => {
        setNumberList(numberList.filter(val => val.id !== delEntry.id))
        handleNotify(1, `Successfully deleted ${delEntry.name}`)
      })
      .catch(err => {
        if (err.status === 404) handleNotify(-1, `${err.message}: ${delEntry.name} not found on server`)
        else handleNotify(-1, `${err.message}: Server error`)
      })
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
      <Notification notificationState={notificationState} />
      <Filter searchQuery={searchQuery} handleSearchQuery={onSearchQueryChange} />
      <NewNumberForm handleListUpdate={handleListUpdate} handleNotify={handleNotify} />
      <DisplayList numberList={displayedList} onDelete={handleDelete} />
    </>
  )
}

export default App
import { useState, useEffect, useRef } from "react"
import Countries from "./components/Countries"
import Notification from "./components/Notification"

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [notification, setNotification] = useState({ status: null, message: "" })
  const timerId = useRef(null)

  const notify = (status, message) => {
    clearTimeout(timerId.current)
    setNotification({ status, message })
    timerId.current = setTimeout(() => {
      setNotification({ status: null, message: "" })
    }, 5000)
  }

  useEffect(() => {
    const getCountryList = async () => {
      try {
        const response = await fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
        if (!response.ok) {
          throw new Error(`Failed to fetch country list: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setCountryList(data.map((val, i) => {
          val.key_id = i
          return val
        }))
      }
      catch (err) {
        notify("error", `${err.message}`)
      }
    }

    getCountryList()
  }, [])

  return (
    <>
      <Notification notification={notification} />
      <Countries countryList={countryList} notify={notify} />
    </>
  )
}

export default App
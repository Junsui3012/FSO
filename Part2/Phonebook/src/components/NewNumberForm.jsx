import { useState } from "react"

const NewNumberForm = ({ handleListUpdate, handleNotify }) => {

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")

  const onNameChange = (e) => setName(e.target.value)
  const onNumberChange = (e) => setNumber(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedNumber = number.trim()
    if (trimmedName === "" || trimmedNumber === "") {
      handleNotify(-1, "Missing fields")
      return
    }

    const cleanName = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase()
    handleListUpdate({
      name: cleanName,
      number: trimmedNumber,
    }).then(ok => {
      if (ok) {
        setName("")
        setNumber("")
      }
    })
  }

  return (
    <>
      <h1>Add a new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name_inp">name: </label>
          <input
            type="text"
            name="name"
            id="name_inp"
            placeholder="abc..."
            value={name}
            onChange={onNameChange} />
        </div>

        <div>
          <label htmlFor="number_inp">number: </label>
          <input
            type="tel"
            name="number"
            id="number_inp"
            pattern="\+[0-9]{2}-[0-9]{10}"
            placeholder="+99-1234567890"
            value={number}
            onChange={onNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default NewNumberForm
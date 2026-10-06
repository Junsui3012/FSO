import { useState } from "react"

const NewNumberForm = ({ handleListUpdate }) => {

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")

  const onNameChange = (e) => setName(e.target.value)
  const onNumberChange = (e) => setNumber(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedNumber = number.trim()
    if (trimmedName === "" || trimmedNumber === "") {
      alert("Missing fields")
      return
    }

    const cleanName = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase()
    handleListUpdate({
      name: cleanName,
      number: trimmedNumber,
    })
    setName("")
    setNumber("")
  }

  return (
    <>
      <h1>Add a new</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name_inp">name: </label>
        <input
          type="text"
          name="name"
          id="name_inp"
          placeholder="abc..."
          value={name}
          onChange={onNameChange} />

        <label htmlFor="number_inp">number: </label>
        <input
          type="tel"
          name="number"
          id="number_inp"
          pattern="\+[0-9]{2}-[0-9]{10}"
          placeholder="+99-1234567890"
          value={number}
          onChange={onNumberChange} />

        <button type="submit">add</button>
      </form>
    </>
  )
}

export default NewNumberForm
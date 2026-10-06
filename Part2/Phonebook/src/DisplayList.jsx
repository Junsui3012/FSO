
const DisplayList = ({ numberList, onDelete }) => {

  return (
    <>
      <h1>Numbers</h1>
      {numberList.length === 0 ? (<p>No entries found</p>) : (numberList.map(entry => (
        <p key={entry.id}>
          {entry.name} {entry.number}
          <button onClick={() => { onDelete(entry.id) }}>delete</button>
        </p>
      )))}
    </>
  )
}

export default DisplayList
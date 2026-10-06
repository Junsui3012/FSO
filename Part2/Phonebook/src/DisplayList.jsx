
const DisplayList = ({ numberList }) => {

  return (
    <>
      <h1>Numbers</h1>
      {numberList.map(entry => (
        <p key={entry.id}>{entry.name} {entry.number}</p>
      ))}
    </>
  )
}

export default DisplayList
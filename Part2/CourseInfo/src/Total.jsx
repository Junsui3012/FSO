
const Total = ({ parts }) => {

  const all = parts.reduce((sum, part) =>
    sum + part.exercises
    , 0)
  
  return (
    <p><b>total of {all} exercises</b></p>
  )
}

export default Total
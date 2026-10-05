
const Part = ({ part }) => {

  const title = part.name
  const exercises = part.exercises

  return (
    <>
      <p>{title} {exercises}</p>
    </>
  )
}

export default Part
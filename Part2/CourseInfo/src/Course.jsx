import Part from "./Part"
import Total from "./Total"

const Course = ({ course }) => {

  const heading = course.name
  const parts = course.parts

  return (
    <>
      <h2>{heading}</h2>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={parts}/>
    </>
  )
}

export default Course
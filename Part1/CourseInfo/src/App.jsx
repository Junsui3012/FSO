
const Header = (props) => (
  <h1>
    {props.course}
  </h1>
)

const Part = (props) => (
  <p>
    {props.part}: {props.exercise}
  </p>
)

const Content = (props) => (
  <div>
    <Part part={props.parts[0].name} exercise={props.parts[0].exercise} />
    <Part part={props.parts[1].name} exercise={props.parts[1].exercise} />
    <Part part={props.parts[2].name} exercise={props.parts[2].exercise} />
  </div>
)

const Total = (props) => (
  <p>
    Number of exercises: {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}
  </p>
)

const App = () => {
  const course = {
    name: "Front End application development",
    parts: [{
      name: "Fundamentals of React",
      exercise: 10,
    },
    {
      name: "Using props to pass data",
      exercise: 7,
    },
    {
      name: "State of a component",
      exercise: 14,
    },
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div >
  )

}

export default App;
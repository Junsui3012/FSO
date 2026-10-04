
const DisplayAnecdote = ({ heading, anecdote, votes }) => (
  <>
    <h1>{heading}</h1>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
)

export default DisplayAnecdote
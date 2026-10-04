import DisplayAnecdote from "./DisplayAnecdote"


const DisplayHighlight = ({ anecdotes, votes }) => {
  let maxIdx = 0
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > votes[maxIdx])
      maxIdx = i
  }

  return (
    <DisplayAnecdote
      heading={"Anecdote with most Votes"}
      anecdote={anecdotes[maxIdx]}
      votes={votes[maxIdx]} />
  )
}

export default DisplayHighlight
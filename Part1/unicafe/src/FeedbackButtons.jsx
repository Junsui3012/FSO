
const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>)

const FeedbackButtons = ({ clickFunctions }) => {
  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={clickFunctions.handleGoodIncrement} text={"Good"} />
      <Button onClick={clickFunctions.handleNeutralIncrement} text={"Neutral"} />
      <Button onClick={clickFunctions.handleBadIncrement} text={"Bad"} />
    </>
  )
}

export default FeedbackButtons;
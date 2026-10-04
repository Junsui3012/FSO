import { useState } from "react";
import FeedbackButtons from "./FeedbackButtons";
import Statistics from "./Statistics"

const App = () => {
  const [feedback, setFeedback] = useState({
    bad: 0,
    neutral: 0,
    good: 0,
  })

  const handleFunctions = {
    handleBadIncrement: () => setFeedback({ ...feedback, bad: feedback.bad + 1 }),
    handleNeutralIncrement: () => setFeedback({ ...feedback, neutral: feedback.neutral + 1 }),
    handleGoodIncrement: () => setFeedback({ ...feedback, good: feedback.good + 1 }),
  }

  return(
    <>
      <FeedbackButtons clickFunctions={handleFunctions} />
      <Statistics data={feedback} />
    </>
  )

}

export default App;
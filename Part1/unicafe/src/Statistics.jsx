
const StatisticsLine = ({ text, value, percent }) => (
  <tr>
    <td>{text}</td>
    <td>{value} {percent ? "%" : ""}</td>
  </tr>
)

const Statistics = ({ data }) => {

  const good = data.good
  const neutral = data.neutral
  const bad = data.bad
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if (all === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={good} />
          <StatisticsLine text={"neutral"} value={neutral} />
          <StatisticsLine text={"bad"} value={bad} />
          <StatisticsLine text={"all"} value={all} />
          <StatisticsLine text={"average"} value={average} />
          <StatisticsLine text={"positive"} value={positive} percent={true} />
        </tbody>
      </table>
    </>
  )
}

export default Statistics
import "../styles/Notification.css"

const Notification = ({ notification }) => {
  return (
    <div className={notification.status === "error" ? "error_box" : "empty_box"}>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notification
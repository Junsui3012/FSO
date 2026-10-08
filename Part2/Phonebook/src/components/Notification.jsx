import "../styles/Notification.css"

const Notification = ({ notificationState }) => {

  if (notificationState.state === 0) return null

  return (
    <>
      <p className={notificationState.state === 1 ? "success_box" : "error_box"}>
        {notificationState.msg}
      </p>
    </>
  )

}

export default Notification
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification !== null) {
    return (
      <div className={notification.style}>
        {notification.content}
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default Notification
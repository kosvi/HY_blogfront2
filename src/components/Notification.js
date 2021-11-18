import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.visible) {
    if (notification.style === 'error') {
      return (
        <Alert variant='danger'>
          {notification.content}
        </Alert>
      )
    } else if (notification.style === 'success') {
      return (
        <Alert variant='success'>
          {notification.content}
        </Alert>
      )
    }
  }
  return (
    <div></div>
  )
}

export default Notification
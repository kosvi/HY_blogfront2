const initialState = { content: 'Default notification', style: 'error', visible: false }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIF':
    return action.data
  case 'RESET_NOTIF':
    return initialState
  default:
    return state
  }
}

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIF',
      data: {
        content: content,
        visible: true
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIF'
      })
    }, timeout)
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIF'
  }
}

export default notificationReducer
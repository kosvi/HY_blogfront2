import userService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGOUT_USER':
    return action.data
  case 'LOGIN_USER':
    blogService.setToken(action.data.token)
    return action.data
  case 'STORE_USER':
    blogService.setToken(action.data.token)
    return action.data
  default:
    return state
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedInUser')
  return {
    type: 'LOGOUT_USER',
    data: null
  }
}

export const storeUser = (user) => {
  return {
    type: 'STORE_USER',
    data: user
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await userService.login({ username, password })
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
    } catch (error) {
      dispatch(setNotification('learn to type!', 'error', 5000))
    }
  }
}

export default userReducer
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Menu = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className='nav'>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      logged in as {user.name} <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
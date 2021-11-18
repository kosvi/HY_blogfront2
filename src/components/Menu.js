import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
      <Navbar.Toggle aria-controls='responsive-navbar' />
      <Navbar.Collapse id='responsive-navbar'>
        <Nav>
          <Nav.Link href='#' as='span'>
            <Link to='/'>blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/users'>users</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            logged in as {user.name} <button onClick={handleLogout}>logout</button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
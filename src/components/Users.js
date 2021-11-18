import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import { Table, ListGroup } from 'react-bootstrap'

const Users = ({ user }) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await userService.getAll())
    }
    getUsers()
  }, [])

  if (user) {
    const userObj = users.find(u => u.id === user)
    if (userObj) {
      return (
        <div>
          <h1>{userObj.name}</h1>
          <h3>Added blogs</h3>
          <ListGroup>
            {
              userObj.blogs.map(b => <ListGroup.Item key={b.id}>{b.title}</ListGroup.Item>)
            }
          </ListGroup>
        </div>
      )
    }
    else {
      return (
        <div>
          USER NOT FOUND
        </div>
      )
    }
  }

  return (
    <div>
      <h1>Users</h1>
      <Table striped hover responsive>
        <thead>
          <tr>
            <td>Username</td>
            <td>Blogs created</td>
          </tr>
        </thead>
        <tbody>
          {
            users.map(u => <tr key={u.username}><td><Link to={`/users/${u.id}`}>{u.name}</Link></td><td>{u.blogs.length}</td></tr>)
          }
        </tbody>
      </Table>
    </div >
  )
}

export default Users
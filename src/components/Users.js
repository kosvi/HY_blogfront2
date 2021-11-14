import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

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
          <ul>
            {
              userObj.blogs.map(b => <li key={b.id}>{b.title}</li>)
            }
          </ul>
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
      <table>
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
      </table>
    </div >
  )
}

export default Users
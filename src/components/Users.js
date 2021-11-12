import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const Users = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await userService.getAll())
    }
    getUsers()
  }, [])

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
            users.map(u => <tr key={u.username}><td>{u.name}</td><td>{u.blogs.length}</td></tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users
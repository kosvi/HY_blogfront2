import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Login = ({ user, pwd, setUser, setPwd, handleLogin }) => (
  <div>
    <form onSubmit={handleLogin}>
      <Form.Label>Username</Form.Label><br />
      <Form.Control id="username" type="text" value={user} name="Username" onChange={({ target }) => setUser(target.value)} /> <br />
      <Form.Label>Password</Form.Label><br />
      <Form.Control id="password" type="password" value={pwd} name="Password" onChange={({ target }) => setPwd(target.value)} /> <br />
      <Button variant='primary' type='submit' id="loginButton">login</Button>
    </form>
  </div>
)

export default Login

import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { storeUser, loginUser } from './reducers/userReducer'
// import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Menu from './components/Menu'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Users from './components/Users'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import SingleBlog from './components/SingleBlog'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  // const history = useHistory()
  const match = useRouteMatch('/users/:id')
  const blogRoute = useRouteMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      dispatch(storeUser(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  if (user === null) {
    return (
      <div className='container'>
        <Notification />
        <h2>log in to application</h2>
        <Login
          user={username}
          pwd={password}
          setUser={setUsername}
          setPwd={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
  if (user !== null) {
    return (
      <div className='container'>
        <Menu />
        <Notification />
        <h2>blogs</h2>
        <Switch>
          <Route path='/users'>
            <Users user={match ? match.params.id : null} />
          </Route>
          <Route path='/blogs/:id'>
            <SingleBlog id={blogRoute ? blogRoute.params.id : null} />
          </Route>
          <Route path='/'>
            <Togglable buttonLabel='add new blog' ref={blogFormRef}>
              <BlogForm />
            </Togglable><br /><br />
            <Blogs userId={user.id} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App
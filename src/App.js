import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { storeUser, loginUser, logoutUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
// import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  //  const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  /*
  const sortSetBlogs = (blogs) => {
    const sortedList = blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedList)
  }
  */

  const blogFormRef = useRef()

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
    /*
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      */
    setUsername('')
    setPassword('')
    /*
  } catch (error) {
    dispatch(setNotification('learn to type!', 'error', 5000))
  }
  */
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    window.localStorage.removeItem('loggedInUser')
  }

  /*
  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.addBlog(newBlog)
      const newBlogList = blogs.concat(response)
      sortSetBlogs(newBlogList)
      dispatch(setNotification(`a new blog ${response.title} by ${response.author} added`, 'success', 5000))
    } catch (error) {
      dispatch(setNotification('error in saving new blog entry', 'error', 5000))
    }
  }
  */

  /*
  const addLike = async (blog) => {
    try {
      const response = await blogService.likeBlog(blog)
      const blogList = blogs.map(b => b.id === response.id ? { ...response, user: blog.user } : b)
      sortSetBlogs(blogList)
      dispatch(setNotification(`${response.title} by ${response.author} was liked`, 'success', 5000))
    } catch (error) {
      dispatch(setNotification('could not add a like', 'error', 5000))
    }
  }
  */

  /*
  const removeBlog = async (blog) => {
    try {
      const blogId = blog.id
      await blogService.deleteBlog(blog)
      const blogList = blogs.filter(b => b.id !== blogId)
      sortSetBlogs(blogList)
      dispatch(setNotification(`${blog.title} by ${blog.author} deleted succesfully`, 'success', 5000))
    } catch (error) {
      dispatch(setNotification(error.message, 'error', 5000))
    }
  }
  */

  if (user === null) {
    return (
      <div>
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
      <div>
        <Notification />
        <h2>blogs</h2>
        logged in as {user.name} <button onClick={handleLogout}>logout</button> <br /><br />
        <Togglable buttonLabel='add new blog' ref={blogFormRef}>
          <BlogForm />
        </Togglable><br /><br />
        <Blogs userId={user.id} />
      </div>
    )
  }
}

export default App
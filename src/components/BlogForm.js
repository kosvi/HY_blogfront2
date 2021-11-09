import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {

  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    dispatch(createBlog(newBlog))
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} was added`, 'success', 5000))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newBlog}>
        title: <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)} /><br />
        author: <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
        url: <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} /><br />
        <button id='createBlogButton'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
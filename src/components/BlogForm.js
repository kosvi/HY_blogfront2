import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

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
        <Form.Label>title:</Form.Label><br />
        <Form.Control id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)} /><br />
        <Form.Label>author:</Form.Label><br />
        <Form.Control id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
        <Form.Label>url:</Form.Label><br />
        <Form.Control id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} /><br />
        <Button variant='primary' type='submit' id='createBlogButton'>create</Button>
      </form>
    </div>
  )
}

export default BlogForm
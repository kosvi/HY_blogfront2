import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'
import { Button } from 'react-bootstrap'

const SingleBlog = ({ id }) => {

  const dispatch = useDispatch()
  const blog = useSelector(({ blogs }) => {
    return blogs.find(b => b.id === id)
  })

  const like = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`${blog.title} by ${blog.author} was liked`, 'success', 5000))
  }


  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title} by {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a><br />
      {blog.likes} likes <Button variant='success' onClick={like}>like</Button><br />
      added by {blog.user.name}
      <Comments id={blog.id} />
    </div>
  )
}

export default SingleBlog
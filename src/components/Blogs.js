import React from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = ({ userId }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`${blog.title} by ${blog.author} was liked`, 'success', 5000))
  }

  const deleteBlog = (blog) => {
    dispatch(removeBlog(blog))
    dispatch(setNotification(`${blog.title} by ${blog.author} deleted succesfully`, 'success', 5000))
  }

  return (
    <div id='blogList'>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={deleteBlog} user={userId} />
      )}
    </div>
  )
}

export default Blogs
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const FullInfo = ({ blog, addLike, removeBlog, user }) => {

  const like = async () => {
    await addLike(blog)
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}???`)) {
      await removeBlog(blog)
    }
  }

  return (
    <div>
      {blog.url}<br />
      likes {blog.likes} <Button variant='success' onClick={like}>like</Button><br />
      {blog.user.name}<br />
      {user === blog.user.id && <Button variant='danger' onClick={deleteBlog}>remove</Button>}
    </div>
  )
}

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const [displayAll, setDisplayAll] = useState(false)

  const toggleDisplay = () => {
    setDisplayAll(!displayAll)
  }

  return (
    <div className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link> <Button variant='info' onClick={toggleDisplay}>{displayAll ? 'hide' : 'view'}</Button>
      {displayAll && <FullInfo blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />}
    </div>
  )
}

FullInfo.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.string,
}

export default Blog
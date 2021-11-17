import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Comments = ({ id }) => {

  const [comments, setComments] = useState([])

  useEffect(() => {
    const getComments = async () => {
      const res = await blogService.getComments(id)
      setComments(res)
    }
    getComments()
  }, [])

  return (
    <div><h3>comments</h3>
      <ul>
        {
          comments.map(c => <li key={c.id}>{c.content}</li>)
        }
      </ul></div>
  )
}

export default Comments
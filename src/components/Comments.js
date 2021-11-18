import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { ListGroup, Form, Button } from 'react-bootstrap'

const Comments = ({ id }) => {

  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')

  useEffect(() => {
    const getComments = async () => {
      const res = await blogService.getComments(id)
      setComments(res)
    }
    getComments()
  }, [])

  const addComment = async (e) => {
    // add comment
    e.preventDefault()
    const response = await blogService.addComment(id, content)
    setComments(comments.concat(response))
  }

  return (
    <div><h3>comments</h3>
      <form onSubmit={addComment}>
        <Form.Control type="text" value={content} onChange={({ target }) => setContent(target.value)} />
        <Button type='submit' variant='primary'>add comment</Button>
      </form>
      <ListGroup>
        {
          comments.map(c => <ListGroup.Item key={c.id}>{c.content}</ListGroup.Item>)
        }
      </ListGroup></div>
  )
}

export default Comments
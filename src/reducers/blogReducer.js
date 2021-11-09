import blogService from '../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.data.id)
  case 'LIKE_BLOG': {
    const newBlogs = state.map(b => b.id !== action.data.id ? b : action.data)
    return newBlogs.sort((a, b) => b.likes - a.likes)
  }
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.addBlog(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.likeBlog(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer
import { createSlice } from '@reduxjs/toolkit'
import { sub } from 'date-fns'


const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!', date: sub(new Date(), { minutes: 10 }).toISOString()},
  { id: '2', title: 'Second Post', content: 'More text', date: sub(new Date(), { minutes: 5 }).toISOString()}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
              state.push(action.payload)
            },
            prepare(title, content, uid) {
              return {
                payload: {
                  id: nanoid(),
                  date: new Date().toISOString(),
                  title,
                  content,
                  user: uid
                }
              }
            }
          },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
            existingPost.title = title
            existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
              existingPost.reactions[reaction]++
            }
          }
    }
  })
  
  export const { postAdded, postUpdated } = postsSlice.actions
  
  export default postsSlice.reducer
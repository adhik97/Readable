export const GET_POSTS = 'GET_POSTS'
export const VOTE_POST = 'VOTE_POST' 

export const getPosts= (data) => ({type:GET_POSTS,data})

export const votePost = (id,centiment) => ({type:VOTE_POST,id,centiment})


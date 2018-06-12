export const GET_POSTS = 'GET_POSTS'
export const VOTE_POST = 'VOTE_POST' 
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'


export const getPosts= (data) => ({type:GET_POSTS,data})

export const votePost = (id,centiment) => ({type:VOTE_POST,id,centiment})

export const addPostAction = (postData) => ({type:ADD_POST,postData})

export const deletePost = (id) => ({type:DELETE_POST,id})


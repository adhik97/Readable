export const GET_POSTS = 'GET_POSTS'
export const VOTE_POST = 'VOTE_POST' 
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'


export const POST_COMMENT = 'POST_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const getPosts= (data) => ({type:GET_POSTS,data})

export const votePost = (id,centiment) => ({type:VOTE_POST,id,centiment})

export const addPostAction = (postData) => ({type:ADD_POST,postData})

export const deletePost = (id) => ({type:DELETE_POST,id})

export const editPostAction = (editData,id) => ({type:EDIT_POST,editData,id})

export const postCommentAction = (id) =>({type:POST_COMMENT,id})

export const deleteCommentAction = (id) => ({type:DELETE_POST,id})


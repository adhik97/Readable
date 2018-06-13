const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
	fetch(`${api}/categories`,{headers})
	.then(res => res.json())
	.then(resjson => resjson.categories)

/////////////////// - Posts APIs - //////////////////////////////

export const getAllPosts = () =>
	fetch(`${api}/posts`,{headers})
	.then(res => res.json())

export const postVote = (id,centiment) =>
	{
		const jsonData = {'option':centiment==='up'?'upVote':'downVote'}
		

		return fetch(`${api}/posts/${id}`,{
			method:'POST',
			headers:{...headers,'Content-Type': 'application/json'},
			body:JSON.stringify(jsonData)})
		.then(res => res.json())
	}

export const addPost = (data) => 
	{
		return fetch(`${api}/posts/`,{
			method:'POST',
			headers:{...headers,'Content-Type': 'application/json'},
			body:JSON.stringify(data)})
			.then(res => res.json())
		
	}

export const deletePostAPI = (id) => {

	fetch(`${api}/posts/${id}`,{
		method:'delete',
		headers,
		})
	.then(res => res.json())

	}

export const editPost = (id,data) => {

	return fetch(`${api}/posts/${id}`,{
		method:'put',
		headers:{...headers,'Content-Type':'application/json'},
		body:JSON.stringify(data)
	}).then(res => res.json())
}

/////////////////// - Comments APIs - //////////////////////////////

export const getAllComments = (parentId) => {

	return fetch(`${api}/posts/${parentId}/comments`,{headers})
			.then(res => res.json())

}

export const postComment = (commentData) => {
	return fetch(`${api}/comments`,{
		method:'post',
		headers:{...headers,'Content-Type':'application/json'},
		body:JSON.stringify(commentData)
	}).then(res => res.json())
}

export const deleteComment = (commentId) => {
	return fetch(`${api}/comments/${commentId}`,{
		method:'delete',
		headers
	}).then(res => res.json())
}

export const postCommentVote = (commentId,centiment) =>
	{
		const jsonData = {'option':centiment==='up'?'upVote':'downVote'}
		

		return fetch(`${api}/comments/${commentId}`,{
			method:'POST',
			headers:{...headers,'Content-Type': 'application/json'},
			body:JSON.stringify(jsonData)})
		.then(res => res.json())
	}

export const putEditComment = (commentId,data) => {

	return fetch(`${api}/comments/${commentId}`,{
		method:'put',
		headers:{...headers,'Content-Type':'application/json'},
		body:JSON.stringify(data)
	}).then(res => res.json())

}


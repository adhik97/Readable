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
	


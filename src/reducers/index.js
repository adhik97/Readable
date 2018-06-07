import {GET_POSTS,getPosts} from '../actions'

const posts = (state={} , action) => {

	switch(action.type){
		
		case GET_POSTS:
		let postsObjects = action.data.reduce((acc,val) => {
			acc[val.id]=val
			return acc
		},{})
		return {
			...state,
			...postsObjects
		}

		default:
		return state

	}

} 

export default posts
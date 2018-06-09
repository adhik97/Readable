import {GET_POSTS,VOTE_POST} from '../actions'

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


		case VOTE_POST:
		const {id,centiment} = action
		const preVote =state[id].voteScore

		
		return {
			...state,
			[id]:{...state[id],voteScore:centiment==='up'?preVote+1:preVote-1}
		}

		default:
		return state

	}

} 

export default posts
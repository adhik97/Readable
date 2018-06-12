import {GET_POSTS,VOTE_POST,ADD_POST,DELETE_POST} from '../actions'


const posts = (state={} , action) => {

	const {id,centiment,postData,type} = action

	switch(type){

		

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
		const preVote =state[id].voteScore

		
		return {
			...state,
			[id]:{...state[id],voteScore:centiment==='up'?preVote+1:preVote-1}
		}

		case ADD_POST:
		return {...state,
				[postData.id] : {...postData}

		}

		case DELETE_POST:
		return {
			...state,
			[id]:{...state[id],deleted:true}
		}


		default:
		return state

	}

} 

export default posts
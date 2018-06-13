import {GET_POSTS,VOTE_POST,ADD_POST,DELETE_POST,EDIT_POST,POST_COMMENT,DELETE_COMMENT} from '../actions'


const posts = (state={} , action) => {

	const {id,centiment,postData,type,editData} = action
	

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

		case EDIT_POST:
		return {
			...state,
			[id]:{...state[id],
				title:editData.title,
				body:editData.body}
		}

		case POST_COMMENT:
		const Count = state[id].commentCount
		return {
			...state,
			[id]:{...state[id],commentCount:Count+1}
		}

		case DELETE_COMMENT:
		const oldCount = state[id].commentCount
		return {
			...state,
			[id]:{...state[id],commentCount:oldCount-1}
		}


		default:
		return state

	}

} 

export default posts
import React,{Component} from 'react'
import CommentCard from './CommentCard'
import {getAllComments,postComment,deleteComment,postCommentVote,putEditComment} from '../utils/APIcalls'
import {uidGenerator} from '../utils/helpers'
import {postCommentAction,deleteCommentAction} from '../actions'
import {connect} from 'react-redux'
import update from 'immutability-helper'
import PropTypes from 'prop-types'

class CommentGrid extends Component {

	state = {
		obComments:null,
		commentData:'',
		author:'',
		message:null
	}

	componentDidMount(){
		getAllComments(this.props.id).then(res => {

			this.setState({obComments:res.reduce((acc,val) => {
			acc[val.id]=val
			return acc
		},{})})

		})
	}

	commentOnChange = (input) =>this.setState({commentData:input})
	

	authorOnChange = (input) =>this.setState({author:input})

	postComment = () => {
		const {commentData,author} = this.state

		if(commentData.trim().length === 0)
			this.setState({message : "Don't leave the body blank"})
		else if(author.trim().length === 0)
			this.setState({message : "Don't leave the author blank"})
		else{

			const commentInfo = {
				body:commentData,
				id:uidGenerator(),
				parentId:this.props.id,
				timestamp:Date.now(),
				author:author
			}

			postComment(commentInfo).then((res) => this.setState((prevState) => {
				const newState = update(prevState,{
					obComments: obComments => update(obComments || {},{
						[res.id]: () => update({},{$merge:{...res}})
					})
				})

				return newState
			})).then(this.props.addComment(this.props.id))
				.then(this.setState({commentData:'',author:''}))

			
		}



	}

	removeCommentById = (commentId) => {

		const {removeComment} = this.props

		this.setState((prevState) => (
			
			update(prevState,{
				obComments:{[commentId]:{deleted:{$set:true}}}
			})
		))
		deleteComment(commentId).then(() => removeComment(commentId))
		
	}

	voteComment = (commentId,centiment) => {


		this.setState((prevState) => {

			
			const newVoteScore = prevState.obComments[commentId].voteScore + (centiment === 'up' ? 1 : -1 )

			return update(prevState,{
				obComments:{[commentId]:{voteScore:{$set:newVoteScore}}}
			})
		})
		postCommentVote(commentId,centiment)
	}

	editComment = (commentId,body) => {

		const data = {
			timestamp:Date.now(),
			body
		}

		this.setState((prevState) => {

			return update(prevState,{
				obComments: {
					[commentId] : {
					body : {$set:body}
				}
			}
		})

		})

		return putEditComment(commentId,data)


	}
	
	
	render(){

		const {obComments,commentData,message,author} = this.state

				let comments=[]

				if(obComments)
				{
					const ids = Object.keys(obComments)
					
					comments = ids.map((id) => ({...obComments[id]})).filter((val) => {
							if(val.deleted === false){
									return true
							}
							return false

						})
				}
				
				
	

		return <div className="container">
				<h4>Comments : {comments && comments.length}</h4>
				{comments && comments.map((comment) => <CommentCard key={comment.id} 
																	comment={comment} 
																	onDeletePressed={this.removeCommentById} 
																	onVotePressed={this.voteComment}
																	onEditPressed={this.editComment}/>)}
				<div className="card">
					<div className="card-body"><textarea required="required" className="form-control" onChange={(e) => this.commentOnChange(e.target.value)} rows="4" placeholder="Write your comment over here" value={commentData}></textarea>
					<br/>
					<input className="form-control" onChange={(e) => this.authorOnChange(e.target.value)} placeholder="Enter author name" value={author}/>
					<br/>
					
					<button type="button" onClick={this.postComment} className="btn btn-primary col-sm-3">Post</button>
					<span className="h5"> {message}</span>
					
					</div>
				</div>
				<br/>
			   </div>
	}
}

const mapDispatchToProps = {
	addComment:postCommentAction,
	removeComment:deleteCommentAction
}

CommentGrid.propTypes = {
	id:PropTypes.string,
	addComment:PropTypes.func,
	removeComment:PropTypes.func
}

export default connect(null,mapDispatchToProps)(CommentGrid)
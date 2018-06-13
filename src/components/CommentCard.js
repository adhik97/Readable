import React,{Component} from 'react'
import ThumbUp from 'react-icons/lib/md/thumb-up'
import ThumbDown from 'react-icons/lib/md/thumb-down'
import PropTypes from 'prop-types'


const spanStyle = {marginRight:'1.25em'}

class CommentCard extends Component {

	state={
		editMode:false,
	}

	editButtonClicked = () =>{
		this.setState({editMode:true})
	}

	saveButtonClicked = () => {
		const {onEditPressed,comment} = this.props
		
		onEditPressed(comment.id,this.editCom.value)
		.then(()=>this.setState({editMode:false}))
	}






	
	render(){

		const {comment,onDeletePressed,onVotePressed} = this.props
		const {editMode} = this.state



		return <div className="card">
				  <div className="card-body">{editMode && <div>
				  										  <textarea className="form-control" 
				  										  			rows="4" 
				  										  			placeholder="Enter comment body" 
				  										  			defaultValue={comment.body}
				  										  			ref={(input) => this.editCom = input}></textarea><br/>
				  										  <button className="btn btn-primary" onClick={() => this.saveButtonClicked()} type="button">Save</button>
				  										  </div>}
				  							{!editMode && <pre>{comment.body}</pre>}<p className="font-italic">-{comment.author}</p></div> 
				  <div className="card-footer">
				  	<div className="row">
				    	<div className="col-sm-4 text-left">
				      		<span style={spanStyle}>Votes : <kbd>{comment.voteScore}</kbd></span> 
				      		<div className="btn-group btn-group-sm">
						        <button type="button" className="btn btn-outline-primary" onClick={()=> onVotePressed(comment.id,'up')}><ThumbUp size={17}/></button>
						        <button type="button" className="btn btn-outline-primary" onClick={()=> onVotePressed(comment.id,'down')}><ThumbDown size={17}/></button>
				      		</div>
				    	</div>
				    	<div className="col-sm-4 text-center">
				    		<div className="btn-group btn-group-sm">
						       {!editMode && <button type="button" className="btn btn-primary" onClick={() => this.editButtonClicked()}>edit</button>}
						        <button type="button" className="btn btn-danger" onClick={()=> onDeletePressed(comment.id)}>delete</button>
				      		</div>
				    	</div>
				     	<div className="col-sm-4 text-right">{new Date(comment.timestamp).toLocaleString()}</div>
				  </div>				  
				</div>

			

			   </div>
	}
}

CommentCard.propTypes = {
	onEditPressed:PropTypes.func,
	comment:PropTypes.object,
	onDeletePressed:PropTypes.func,
	onVotePressed:PropTypes.func

}

export default CommentCard
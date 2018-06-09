import React,{Component} from 'react'
import ThumbUp from 'react-icons/lib/md/thumb-up'
import ThumbDown from 'react-icons/lib/md/thumb-down'
import { votePost } from '../actions'
import {connect} from 'react-redux'
import {postVote} from '../utils/APIcalls'

const spanStyle = {marginRight:'1.25em'}


class PostCardView extends Component {

	doVote = (id,centiment) => {
		this.props.votePost(id,centiment)
		postVote(id,centiment)
	}

	
	render(){

		const {post} = this.props


		return <div className="card">
    			<div className="card-body">
      				<h4 className="card-title"><a href="#">{post.title}</a></h4>
        			<div className="row">
  						<div className="col-sm-4">Category - {post.category}</div>
  						<div className="col-sm-8 text-right"><p className="font-italic">-{post.author}</p></div>
					</div>
					<hr/>
      				<pre className="card-text">{post.body}</pre>
  					<div className="row">
  						<div className="col-sm-4"><p>Comments : <kbd>{post.commentCount}</kbd></p></div>
  						<div className="col-sm-4 text-center">
  							<span style={spanStyle}>Votes : <kbd>{post.voteScore}</kbd> </span> 
  							<div className="btn-group btn-group-sm">
  								<button type="button" className="btn btn-outline-primary" onClick={() => this.doVote(post.id,'up')}><ThumbUp size={17}/></button>
  								<button type="button" className="btn btn-outline-primary" onClick={() => this.doVote(post.id,'down')}><ThumbDown size={17}/></button>
  							</div>
  						</div>
  						<div className="col-sm-4 text-right">{new Date(post.timestamp).toLocaleString()}</div>
  					</div>
  				</div>
  			</div>
	}
}

const mapDispatchToProps = {
	votePost
}


export default connect(null,mapDispatchToProps)(PostCardView)
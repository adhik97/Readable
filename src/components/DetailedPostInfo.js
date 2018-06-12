import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import ThumbUp from 'react-icons/lib/md/thumb-up'
import ThumbDown from 'react-icons/lib/md/thumb-down'
import HomeIcon from 'react-icons/lib/md/home'

const spanStyle = {marginRight:'1.25em'}


class DetailedPostInfo extends Component {
	render(){

	const {post,doVote,deletePostById} = this.props

	return <div className="jumbotron">
								<div className="text-right"><Link className="btn btn-link" to="/"><HomeIcon size={30}/></Link></div>
				  				<div className="container">
				    				<h1>{post.title}</h1>     
				    				<pre>{post.body}</pre>
				    				<br/>
								<div className="row">
								<div className="col-sm-8 text-left">
		  							<span style={spanStyle}>Votes : <kbd>{post.voteScore}</kbd> </span> 
		  							<div className="btn-group btn-group-sm">
		  								<button type="button" className="btn btn-outline-primary" onClick={() => doVote(post.id,'up')}><ThumbUp size={17}/></button>
		  								<button type="button" className="btn btn-outline-primary" onClick={() => doVote(post.id,'down')}><ThumbDown size={17}/></button>
		  							</div>
  								</div>
  								<div className="col-sm-4 text-right"><p className="font-italic">-{post.author}</p></div>
  								</div>				    				

				  				</div>
				  				<div className="text-right">{new Date(post.timestamp).toLocaleString()}
				  				<br/>
				  				<div className="btn-group">
								  <button type="button" className="btn btn-primary btn-sm">Edit</button>
								  <button type="button" onClick={() => deletePostById(post.id)}className="btn btn-danger btn-sm">Delete</button>
  
								</div>
				  				</div>
				  			</div>

	}
}

export default DetailedPostInfo
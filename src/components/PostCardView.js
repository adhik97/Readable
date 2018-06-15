import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'






const PostCardView = ({post}) => {

		return <div className="card">
    			<div className="card-body">
      				<h4 className="card-title"><Link to={`/post/${post.id}`}>{post.title}</Link> <small className="font-italic">- {post.author}</small></h4>
  					<div className="row">
  						<div className="col-sm-4"><p>Comments : <kbd>{post.commentCount}</kbd></p></div>
  						<div className="col-sm-4 text-center">
  							<span>Votes : <kbd>{post.voteScore}</kbd></span> 
  						</div>
  						<div className="col-sm-4 text-right">{new Date(post.timestamp).toLocaleString()}</div>
  					</div>
  				</div>
  			</div>
	}


PostCardView.propTypes = {
  post:PropTypes.object
}


export default PostCardView
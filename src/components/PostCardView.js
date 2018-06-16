import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ThumbUp from 'react-icons/lib/md/thumb-up'
import ThumbDown from 'react-icons/lib/md/thumb-down'
import {postVote,deletePostAPI} from '../utils/APIcalls'
import { votePost,deletePost } from '../actions'


const spanStyle = {marginRight:'1.25em'}





class PostCardView extends Component {


  doVote = (id,centiment) => {
    this.props.votePost(id,centiment)
    postVote(id,centiment)
  }

  postDelete = (id) => {
    this.props.deletePostById(id)
    deletePostAPI(id) 
  }

  render(){

    const {post} = this.props

		return <div className="card">
    			<div className="card-body">
      				<h4 className="card-title"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link> <small className="font-italic">- {post.author}</small></h4>
  					<div className="row">
  						<div className="col-sm-2"><p>Comments : <kbd>{post.commentCount}</kbd></p></div>
  						<div className="col-sm-4 text-center">
  							<span style={spanStyle}>Votes : <kbd>{post.voteScore}</kbd></span>
                <div className="btn-group btn-group-sm">
                      <button type="button" className="btn btn-outline-primary" onClick={() => this.doVote(post.id,'up')}><ThumbUp size={17}/></button>
                      <button type="button" className="btn btn-outline-primary" onClick={() => this.doVote(post.id,'down')}><ThumbDown size={17}/></button>
                    </div> 
  						</div>
              <div className="col-sm-4 text-center">
                <div className="btn-group">
                  <Link to={`/editpost/${post.id}`} className="btn btn-primary btn-sm">Edit</Link>
                  <button type="button" onClick={() => this.postDelete(post.id)}className="btn btn-danger btn-sm">Delete</button>
  
                </div>
              </div>
  						<div className="col-sm-2 text-right">{new Date(post.timestamp).toLocaleString()}</div>
  					</div>
  				</div>
  			</div>
	}

}


PostCardView.propTypes = {
  post:PropTypes.object
}


const mapDispatchToProps = {
  votePost,
  deletePostById:deletePost
}

export default connect(null,mapDispatchToProps)(PostCardView)
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {postVote,deletePostAPI} from '../utils/APIcalls'
import { votePost,deletePost } from '../actions'
import HomeIcon from 'react-icons/lib/md/home'
import {Link} from 'react-router-dom'
import DetailedPostInfo from './DetailedPostInfo'




class DetailedPostPage extends Component {

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

		const homeLink = <Link className="btn btn-link" to="/"><HomeIcon size={30}/></Link>

		const noPostRender = <div className="container"><h3 className="text-center">No post with that ID found, Click {homeLink} for HomePage</h3></div>

		const PostDeleted = <div className="container"><h3 className="text-center">This post has been deleted, Click {homeLink} for HomePage</h3></div>



		return <div>{post===undefined ? noPostRender : (post.deleted === true ? PostDeleted : <div>
							<DetailedPostInfo post={post} doVote={this.doVote} deletePostById={this.postDelete}/>
							<div className="container">
				 	 			<p>This is some text.</p>      
				  				<p>This is another text.</p>      
							</div>
						</div>)}
				</div>
	}
}

const mapStateToProps = (state,{match}) =>{
	return {
		post:state[match.params.id]
	}
}

const mapDispatchToProps = {
	votePost,
	deletePostById:deletePost
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailedPostPage)
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {postVote,deletePostAPI} from '../utils/APIcalls'
import { votePost,deletePost } from '../actions'
import HomeIcon from 'react-icons/lib/md/home'
import {Link} from 'react-router-dom'
import DetailedPostInfo from './DetailedPostInfo'
import CommentGrid from './CommentGrid'
import PropTypes from 'prop-types'



		const homeLink = <Link className="btn btn-link" to="/"><HomeIcon size={30}/></Link>

		const noPostRender = <div className="container"><br/><br/><br/><h3 className="text-center">No post with that ID and category found, Click {homeLink} for HomePage</h3></div>

		const PostDeleted = <div className="container"><br/><br/><br/><h3 className="text-center">This post has been deleted, Click {homeLink} for HomePage</h3></div>


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

		const {post,match} = this.props
		
		return <div>{post===undefined || post.category !== match.params.category ? noPostRender : (post.deleted === true ? PostDeleted : <div>
							<DetailedPostInfo post={post} doVote={this.doVote} deletePostById={this.postDelete}/>
							<CommentGrid id={post.id}/>
						</div>)}
				</div>
	}
}

const mapStateToProps = (state,{match}) =>({
		post:state[match.params.id]
	})

const mapDispatchToProps = {
	votePost,
	deletePostById:deletePost
}

DetailedPostPage.propTypes = {
	votePost:PropTypes.func,
	deletePostById:PropTypes.func,
	post:PropTypes.object

}

export default connect(mapStateToProps,mapDispatchToProps)(DetailedPostPage)
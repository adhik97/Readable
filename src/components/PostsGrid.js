import React,{Component} from 'react'
import {connect} from 'react-redux'
import PostCardView from './PostCardView'
import {capitalize} from '../utils/helpers'
import {Link} from 'react-router-dom'
import HomeIcon from 'react-icons/lib/md/home'
class PostsGrid extends Component {

	state={
		votesSort: false

	}

	render(){

		const {posts,category} = this.props

		return <div className="container">

					{category && <div className="row">
						<div className="col-sm-8"><h1>{capitalize(category)}</h1></div>
						<div className="col-sm-4 text-right"><Link className="btn btn-link" to="/"><HomeIcon size={30}/></Link></div>
					</div>}
					<hr/>
					{posts && posts.length>0 ? posts.map((val) => (<PostCardView key={val.id} post={val}/>)) : <h3 className="text-center">Oops! There are no posts</h3>}
					
					
				</div>

	}
}

const mapStoreToProps = (posts,{category}) => {
	if(posts)
	{
		const ids = Object.keys(posts)
		return {
			posts:ids.map((id) => ({...posts[id]})).filter((val) => {
				if(category){
					if(category === val.category)
						return true
				}
				else
					return true
				return false

			})
		}
	}
	else
	return {
		posts
	}

	
}

export default connect(mapStoreToProps)(PostsGrid)
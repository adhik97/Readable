import React,{Component} from 'react'
import {connect} from 'react-redux'
import PostCardView from './PostCardView'
import {capitalize} from '../utils/helpers'
import {Link} from 'react-router-dom'
import HomeIcon from 'react-icons/lib/md/home'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'



class PostsGrid extends Component {

	state={
		sortby: '-voteScore',
	}

	sortChange = (val) => {
		this.setState({
			sortby:val
		})
	}




	render(){

		const {category,oldPosts} = this.props
		const {sortby} = this.state

		
		const posts = oldPosts.sort(sortBy(sortby))
		

		return <div className="container">



					{category && <div className="row">
						<div className="col-sm-8"><h1>{capitalize(category)}</h1></div>
						<div className="col-sm-4 text-right"><Link className="btn btn-link" to="/"><HomeIcon size={30}/></Link></div>
					</div>}

					<hr/>
					{posts && (posts.length>0 && <div className="row">
					<div className="col-sm-1">Sort By : </div>
					<select onChange={(e) => this.sortChange(e.target.value)} className="form-control col-sm-2">
						<option value="-voteScore">Votes</option>
						<option value="-timestamp">Date</option>
					</select>
					</div>) }
					
					<br/>
					{posts && posts.length>0 ? posts.map((val) => (<PostCardView key={val.id} post={val}/>)) : <h3 className="text-center">Oops! There are no posts</h3>}
					
					
				</div>

	}
}

const mapStoreToProps = (posts,{category}) => {
	if(posts)
	{
		const ids = Object.keys(posts)
		return {
			oldPosts:ids.map((id) => ({...posts[id]})).filter((val) => {
				if(val.deleted === false){
					if(category){
						if(category === val.category)
							return true
					}
					else
						return true
				}
				return false

			})
		}
	}
	else
	return {
		posts
	}

	
}

PostsGrid.propTypes = {
	category:PropTypes.string,
	oldPosts:PropTypes.array
}

export default connect(mapStoreToProps)(PostsGrid)
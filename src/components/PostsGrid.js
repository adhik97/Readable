import React,{Component} from 'react'

class PostsGrid extends Component {

	render(){

		const {category} = this.props


		return <h1>{category}</h1>

	}
}

export default PostsGrid
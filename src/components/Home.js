import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import PostsGrid from './PostsGrid'
import {capitalize} from '../utils/helpers'

class Home extends Component {

	render(){

	const {categories} = this.props

	return <div className="container">
			  
			   
			   <ul className="nav">

				{categories && categories.map((category) => {
		          return  <li className="nav-item" key={category.name}>
		    				<Link className="nav-link" to={`/${category.path}`}>{capitalize(category.name)}</Link>
		  				  </li>
		          			
		            
	            })}

	            </ul>
	            <PostsGrid/>
			  </div>



		
	}
}

export default Home
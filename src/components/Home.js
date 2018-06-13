import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import PostsGrid from './PostsGrid'
import {capitalize} from '../utils/helpers'
import CreateIcon from 'react-icons/lib/md/create'
import PropTypes from 'prop-types'



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
	            <ul className="nav justify-content-end">
	            <li className="nav-item"><Link className="btn btn-outline-primary" to="/newpost">New Post <CreateIcon size={17}/></Link></li>
	            </ul>
	            <PostsGrid/>
		 </div>		
	}
}

Home.propTypes = {
	categories:PropTypes.array
}

export default Home
import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {

	render(){

	const {categories} = this.props

	return <div className="container">
			  
			   <p>Catagories:</p>
			   <ul className="nav">

				{categories && categories.map((category) => {
		          return  <li className="nav-item" key={category.name}>
		    				<Link className="nav-link" to={`/${category.path}`}>{category.name}</Link>
		  				  </li>
		          			
		            
	            })}

	            </ul>
			  </div>



		
	}
}

export default Home
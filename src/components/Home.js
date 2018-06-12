import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import PostsGrid from './PostsGrid'
import {capitalize} from '../utils/helpers'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import CreateIcon from 'react-icons/lib/md/create'
import {addPost} from '../utils/APIcalls'
import {uidGenerator} from '../utils/helpers'
import {addPostAction} from '../actions'


class Home extends Component {

	componentWillMount() {
    Modal.setAppElement('body');
	}

	state = {
		createPost:false,
		submitMessage:null
	}

	buttonClicked = () => {
		this.setState({createPost:true})
	}

	closeCreatePost = () => {
		this.setState({createPost:false,submitMessage:null})
	}

	submitPressed = (event) => {
		event.preventDefault()

		const newPost = {

			id:uidGenerator(),
			timestamp:Date.now(),
			title:this.postTitle.value,
			body:this.postBody.value,
			author:this.postAuthor.value,
			category:this.postCategory.value
		}

		

		addPost(newPost).then(data => this.props.addPostAction(data))
						.then(() => this.setState({submitMessage: 'Post added'}))
						.then(() => {
							this.postTitle.value = ''
							this.postBody.value = ''
							this.postAuthor.value = ''
							this.postCategory.value = 'none'
						})
		


	}



	render(){

	const {categories} = this.props
	const {createPost,submitMessage} = this.state

	return <div className="container">
			  
			
			   <ul className="nav">

				{categories && categories.map((category) => {
		          return  <li className="nav-item" key={category.name}>
		    				<Link className="nav-link" to={`/${category.path}`}>{capitalize(category.name)}</Link>
		  				  </li>	          			
		            
	            })}

				
	            </ul>
	            <ul className="nav justify-content-end">
	            <li className="nav-item"><button className="btn btn-outline-primary" onClick={this.buttonClicked}>New Post <CreateIcon size={15}/></button></li>
	            </ul>
	            <PostsGrid/>
 				
 				<Modal
		          className='modalBox'
		          overlayClassName='overlay'
		          isOpen={createPost}
		          onRequestClose={this.closeCreatePost}
		          contentLabel='Modal'
		        >

			    <form>
				    <div className="form-group">
				      <input type="text"
				      		 className="form-control" 
				      		 placeholder="Enter title" 
				      		 required="required"
				      		 ref={(input) => this.postTitle = input}/>
				    </div>
				    <div className="form-group">
				      <textarea 
				      		className="form-control" 
				      		rows="5" 
				      		placeholder="Enter body" 
				      		required="required"
				      		ref={(input) => this.postBody = input}></textarea>
				    </div>
				    <div className="form-group">
				      <input type="text"
				      		 className="form-control" 
				      		 placeholder="Enter author" 
				      		 required="required"
				      		 ref={(input) => this.postAuthor = input}/>
				    </div>
				   
				   	<div className="form-group">
				 	<label htmlFor="sel1">Category:</label>
				  	<select className="form-control" 
				  		  id="sel1" 
				  		  equired="required"
				  		  ref={(input) => this.postCategory = input}>
				  		  <option value="none" selected="selected" disabled="disabled">Select a category</option>

				  	{categories && categories.map((category)=>(<option key={category.name} value={category.name}>{category.name}</option>))}
				    
				  	</select>
					</div>
				    
				    
				    <button type="submit" onClick={this.submitPressed} className="btn btn-primary">Submit</button>
				    <br/>
				    <h5>{submitMessage}</h5>
			  	</form>
          
       		 	</Modal>

			 </div>		
	}
}

export default connect(null,{addPostAction})(Home)
import React,{Component} from 'react'
import {addPost,editPost} from '../utils/APIcalls'
import {uidGenerator} from '../utils/helpers'
import {addPostAction,editPostAction} from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import HomeIcon from 'react-icons/lib/md/home'
import ArrowBack from 'react-icons/lib/md/arrow-back'


class NewEditPostView extends Component {
	state = {
		submitMessage:null
	}

	componentDidMount(){

		const {edit,post} = this.props


		if(edit === true){
			if(post){
				this.postTitle.value = post.title
				this.postBody.value = post.body
			}
		}

	}

	componentDidUpdate(){

		const {edit,post} = this.props


		if(edit === true){
			if(post){
				this.postTitle.value = post.title
				this.postBody.value = post.body
			}
		}

	}

	submitPressed = (event) => {

		const {edit,post,editPostAction} = this.props

		event.preventDefault()


		if(edit){
			const data = {
				body:this.postBody.value,
				title:this.postTitle.value
			}

			editPostAction(data,post.id)
			editPost(post.id,data).then(() => this.setState({submitMessage:'Post has been edited'}))
		}
		else
		{

		const postInfo = {
			id:uidGenerator(),
			timestamp:Date.now(),
			title:this.postTitle.value,
			body:this.postBody.value,
			author:this.postAuthor.value,
			category:this.postCategory.value
		}

		postInfo.category === 'none' ? this.setState({submitMessage:'Select a category'}) : addPost(postInfo).then(data => this.props.addPostAction(data))
						.then(() => this.setState({submitMessage: 'Post added'}))
						.then(() => {
							this.postTitle.value = ''
							this.postBody.value = ''
							this.postAuthor.value = ''
							this.postCategory.value = 'none'
						})
		
		}

	}

	render(){

		const {categories,edit,id} = this.props
		const {submitMessage} = this.state

			return <div className="container">
					<div className="text-right"><Link className="btn btn-link" to={edit ? `/post/${id}` : '/'}>{edit ? <ArrowBack size={30}/> : <HomeIcon size={30}/>}</Link></div>
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
				  {!edit && <div>
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
				  		  required="required"
				  		  ref={(input) => this.postCategory = input}>
				  		  <option value="none" disabled="disabled">Select a category</option>

				  	{categories && categories.map((category)=>(<option key={category.name} value={category.name}>{category.name}</option>))}
				    
				  	</select>
					</div>
					</div>
				}
				    
				    
				    <button type="submit" onClick={this.submitPressed} className="btn btn-primary">Submit</button>
				    <br/>
				    <h5>{submitMessage}</h5>
			  		</form>
			  	</div>
	}
}

const mapDispatchToProps = {
	addPostAction,
	editPostAction
}

const mapStateToProps = (state,{id}) => {
	return {
		post: id !== undefined ? state[id] : null
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewEditPostView)
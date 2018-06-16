import React,{Component} from 'react'
import {addPost,editPost} from '../utils/APIcalls'
import {uidGenerator} from '../utils/helpers'
import {addPostAction,editPostAction} from '../actions'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import HomeIcon from 'react-icons/lib/md/home'
import ArrowBack from 'react-icons/lib/md/arrow-back'
import PropTypes from 'prop-types'


const postRedirect = <Redirect to="/"/>


class NewEditPostView extends Component {
	state = {
		submitMessage:null,
		editSuccess:false,
		postSuccess:false
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
			editPost(post.id,data).then(() => this.setState({editSuccess:true}))
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
						.then(() => this.setState({postSuccess:true}))		
		}

	}

	render(){

		const {categories,edit,id,post,fromDetail} = this.props
		const {submitMessage,postSuccess,editSuccess} = this.state

			return <div className="container">
					<div className="text-right"><Link className="btn btn-link" to={edit ? (fromDetail ? (post ? `/${post.category}/${id}` : '/') : '/' ) : '/' }>{edit ? <ArrowBack size={30}/> : <HomeIcon size={30}/>}</Link></div>
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

			  		{post && editSuccess ? (fromDetail ? <Redirect to={`/${post.category}/${post.id}`}/> : postRedirect) : null}
			  		{postSuccess && postRedirect}
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

NewEditPostView.propTypes = {
	edit:PropTypes.bool,
	post:PropTypes.object,
	editPostAction:PropTypes.func,
	addPostAction:PropTypes.func,
	categories:PropTypes.array,
	id:PropTypes.string

}

export default connect(mapStateToProps,mapDispatchToProps)(NewEditPostView)
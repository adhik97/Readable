import React, { Component } from 'react';
import './App.css';
import {getCategories} from './utils/APIcalls'
import { Route,Switch } from 'react-router-dom'
import Page404 from './components/Page404'
import PostsGrid from './components/PostsGrid'
import Home from './components/Home'
import DetailedPostPage from './components/DetailedPostPage'


class App extends Component {

  componentDidMount(){
    getCategories().then((categories) => this.setState({ categories }))
  }

  state={
    categories:null
  }

  render() {

    const {categories} = this.state

    return (
      <div>
        <Switch>        

        {categories && categories.map((category) => {
          return <Route className="nav-link" key={category.path} path={`/${category.path}`} render={() => (<PostsGrid category={category.name}/>)}/>
                 
                  })}              

        <Route exact path='/' render={() => (<Home categories={categories}/>)}/>
        <Route path="/post/:id" component={DetailedPostPage}/>
        <Route component={Page404}/>
      </Switch>      
    </div>
    );
  }
}

export default App;

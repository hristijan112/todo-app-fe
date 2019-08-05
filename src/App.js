import React from 'react';
import './App.css';
import Login from './components/Login'
import Header from './components/Header'
import List from './components/List'
import axios from 'axios'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      user: null,
      header: "",
      newUser: false,
      isLoggedIn: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    fetch("http://localhost:8080/list/all")
        .then(res => res.json())
        .then(data => {
            this.setState({data: data})
        })
  } 

  handleSubmit(username, password){
    const user = {
      username: username,
      password: password
    }

    axios.post("http://localhost:8080/login/authenticate", user)
      .then(res => res.data)
      .then(res => this.setState({header: res}))
}

  render(){
    if(this.state.header !== "" && this.state.user === null){
      axios.get("http://localhost:8080/user/current-user", {
        headers: {
          Authorization: this.state.header
        }
      }).then(res => res.data)
        .then(res => this.setState({user: res, newUser: true, isLoggedIn: true}))
      localStorage.setItem("header", this.state.header)
    }

    if(this.state.user !== null && this.state.newUser){
      axios.get("http://localhost:8080/list/byUser", {
        params: {
          userId: this.state.user.id
        },
        headers: {
          Authorization: this.state.header
        }
      }).then(res => res.data)
        .then(res => this.setState({data: res, newUser: false}))
    }

    const lists = this.state.data.map(list => {
        return <List key={list.id} id={list.id} title={list.name} listItems = {list.listItems} isLoggedIn = {this.state.isLoggedIn} />
      })
    
    const item = [{
      id: 0,
      itemDesc: "",
      completed: false,
      emailNotification: false
    }]


    return (
      <div className="App">
        <Header />
        {!this.state.isLoggedIn && <Login handleSubmit = {this.handleSubmit}/>}
        {this.state.isLoggedIn && <List key={0} id={0} title={""} listItems = {item} />}
        {lists}
      </div>
    )
  }
}

export default App;

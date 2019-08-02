import React from 'react';
import './App.css';
import Login from './components/Login'
import Header from './components/Header'
import List from './components/List'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      user: {},
      a: ""
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

  handleSubmit(username){
    // e.preventDefault()
    // fetch("http://localhost:8080/login", {
    //     credentials: 'include',
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'authorization': 'Basic' + this.state.username + ":" + this.state.password
    //     },
    //     body: JSON.stringify({
    //         username: this.state.username,
    //         password: this.state.password,
    //       })
    // })
    this.setState({a: username})
    console.log(this.state.a)
}

  render(){

    const lists = this.state.data.map(list => {
      return <List key={list.id} id={list.id} title={list.name} listItems = {list.listItems} />
    })

    return (
      <div className="App">
        <Header />
        <Login handleSubmit = {this.handleSubmit}/>
        {lists}
        {/* <List />
        <List /> */}
      </div>
    )
  }
}

export default App;

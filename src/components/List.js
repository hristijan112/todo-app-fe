import React from 'react'
import ListItem from './ListItem'
import axios from 'axios';

class List extends React.Component{
    constructor(){
        super()
        this.state = {
            showCompleted: false,
            items: [],
            title: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleMinus = this.handleMinus.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handlePlus = this.handlePlus.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
    }

    componentDidMount(){
        this.setState({
            items: this.props.listItems,
        })
    }

    handleChange(e){
        e.target.type === "checkbox" ? this.setState(prevState => ({showCompleted: !prevState.showCompleted})) : this.setState({[e.target.name]: e.target.value})
    }

    handlePlus(){
        this.setState(prevState => ({
            items: [...prevState.items, prevState.items[0]]
        }))
    }

    handleMinus(){
        const newItems = this.state.items
        newItems.length > 1 && newItems.pop()
        this.setState({ items: newItems })
    }

    handleOk(item){
        item.completed = true
        axios.put("http://localhost:8080/item/put", item, {
            headers: {
              Authorization: localStorage.getItem("header")
            }
          })
            .then(console.log("successful"))
    }

    handleRemove(id){
        axios.delete("http://localhost:8080/item/delete/" + id, {
            headers: {
              Authorization: localStorage.getItem("header")
            }
          })
            .then(console.log("deleted"))
        const items = this.state.items.filter(item => item.id !== id)
        this.setState({items: items})
    }

    handleAddItem(data){

    }

    render(){
        const titleStyle = {
            border: '5px solid brown'
        }

        const boxStyle = {
            border: '5px solid brown',
            height: '400px'
        }

        const items = this.state.items.map(item => {
            return <ListItem 
                        name = "listItem" 
                        key = {item.id} 
                        item = {item} 
                        showCompleted = {this.state.showCompleted} 
                        isLoggedIn = {this.props.isLoggedIn}
                        handleYes = {item.id === 0 ? this.handlePlus : this.handleOk}
                        handleNo = {item.id === 0 ? this.handleMinus : this.handleRemove}
                    />
        })

        return (
            <div style={boxStyle} className="col-xs-6">
                <div className = {this.props.isLoggedIn ? "col-xs-10" : "col-xs-12"}>
                    <input 
                        name = "title" 
                        className="form-control" 
                        disabled={this.props.id !== 0 && true} 
                        style={titleStyle} 
                        value = {this.props.title !== "" ? this.props.title : this.state.title} 
                        onChange = {this.handleChange} 
                    /> 
                </div>

                {this.props.isLoggedIn && <button className={this.props.id === 0 ? "btn btn-success" : "btn btn-secondary"}>
                    <span className={this.props.id === 0 ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove"} aria-hidden="true"></span>
                </button>}

                <br />
                <div className="checkbox">
                    <label>{this.props.id !== 0 && <input 
                                name = "showCompleted"
                                type="checkbox" 
                                value={this.state.showCompleted}
                                onChange = {this.handleChange} />}
                                {this.props.id !== 0 ? "Show completed" : "Insert your list items below:"}
                    </label>
                </div>

                <div>
                {this.props.id !== 0 && <ListItem 
                        name = "listItem" 
                        key = {0}
                        item = {{id: 0}} 
                        showCompleted = {this.state.showCompleted} 
                        isLoggedIn = {this.props.isLoggedIn}
                        handleAddItem = {this.handleAddItem}
                    />}
                    {items}
                </div>
            </div>
        )
    }
}

export default List
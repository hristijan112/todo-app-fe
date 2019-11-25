import React from 'react'
import ListItem from './ListItem'
import axios from 'axios';

class List extends React.Component{
    constructor(){
        super()
        this.state = {
            listId: 0,
            showCompleted: false,
            items: [],
            title: "",
            newItem: {
                itemDesc: "",
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleMinus = this.handleMinus.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handlePlus = this.handlePlus.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleItemChange = this.handleItemChange.bind(this)
        this.handleNewListChanges = this.handleNewListChanges.bind(this)
    }

    componentDidMount(){
        this.setState({
            listId: this.props.id,
            items: this.props.listItems,
            title: this.props.title
        })
    }

    // Function for changing the text in the textboxes above every list except the first.
    handleItemChange(e){
        this.setState({ newItem: {itemDesc: e.target.value}})
    }

    // Function for changing the state of the first list items
    handleNewListChanges(e){
        var index = -1
        for(var i = 0; i<this.state.items.length; i++){
            if(Number(this.state.items[i].id) === Number(e.target.id)){
                index = i
                break
            }
        }
        const modifiedItem = {id: e.target.id, itemDesc: e.target.value, completed: false, emailNotifications: false}
        const newItems = [...this.state.items]
        newItems[index] = modifiedItem
        this.setState({items: newItems})
    }

    handleChange(e){
        e.target.type === "checkbox" ? this.setState(prevState => ({showCompleted: !prevState.showCompleted})) : this.setState({[e.target.name]: e.target.value})
    }

    // Function for adding a new textbox for adding new items in the first (empty) list by clicking the plus button.
    handlePlus(){
        this.setState(prevState => ({
            items: prevState.items.concat({id: Number(prevState.items[prevState.items.length - 1].id) + 1, itemDesc: "", completed: false, emailNotifications: false})
        }))
    }

    // Function for removing an empty item from the first list
    handleMinus(){
        const newItems = this.state.items
        newItems.length > 1 && newItems.pop()
        this.setState({ items: newItems })
    }

    // For marking an item with completed. Changes the completed atribute in the database to true.
    handleOk(item){
        item.completed = true
        axios.put("http://localhost:8080/item/put", item, {
            headers: {
              Authorization: localStorage.getItem("header")
            }
          })
        const items = this.state.items.map(thisItem => {return (thisItem.id === item.id) 
            ? thisItem = {id: item.id, itemDesc: thisItem.itemDesc, completed: true, emailNotifications: false} 
            : thisItem})
        this.setState({items: items})
    }

    // for removing a list item
    handleRemove(id){
        axios.delete("http://localhost:8080/item/delete/" + id, {
            headers: {
              Authorization: localStorage.getItem("header")
            }
          })
        const items = this.state.items.filter(item => item.id !== id)
        this.setState({items: items})
    }

    // for adding a new item to the list by filling the textbox above all the items on any list.
    handleAddItem(){
        const data = {
            id: 0,
            itemDesc: this.state.newItem.itemDesc,
            completed: false,
            emailNotifications: false,
            todoList: { id: this.props.id }
        }
        axios.post("http://localhost:8080/item/post", data, {
            headers: {
                Authorization: localStorage.getItem("header")
            }
        })
            .then(returnData => this.setState(prevState => ({
                items: prevState.items.concat({
                    id: returnData.data.id, 
                    itemDesc: returnData.data.itemDesc, 
                    completed: false, 
                    emailNotifications: false})
                })))
        
    }

    render(){
        // some styling
        const titleStyle = {
            border: '5px solid brown'
        }

        // some styling
        const boxStyle = {
            border: '5px solid brown',
            height: '400px'
        }

        // The items that are displayed for every list, from the database
        const items = this.state.items.map(item => {
            return <ListItem 
                        name = "listItem" 
                        key = {item.id} 
                        item = {item}
                        listId = {this.state.listId}
                        showCompleted = {this.state.showCompleted} 
                        isLoggedIn = {this.props.isLoggedIn}
                        handleNewListChange = {this.handleNewListChanges}
                        handleItemChange = {this.handleItemChange}
                        handleYes = {(item.id === 0 || this.state.listId === 0) ? this.handlePlus : this.handleOk}
                        handleNo = {(item.id === 0 || this.state.listId === 0) ? this.handleMinus : this.handleRemove}
                    />
        })

        return (
            <div style={boxStyle} className="col-xs-6">
                
                {/* The textbox with the title of the list. If user is logged in, the first list has id = 0 and key = 0 as props, as well 
                as empty title and empty list item. */}
                <div className = {this.props.isLoggedIn ? "col-xs-10" : "col-xs-12"}>
                    <input 
                        name = "title" 
                        className="form-control" 
                        disabled={this.props.id !== 0 && true} 
                        style={titleStyle} 
                        value = {this.state.title} 
                        onChange = {this.handleChange} 
                    /> 
                </div>

                {/* The button right to the title. Will be a checkmark on the first list if the user is logged in. */}
                {this.props.isLoggedIn && <button className={this.props.id === 0 ? "btn btn-success" : "btn btn-secondary"} 
                    onClick = {this.props.id === 0 ? () => this.props.createList(this.state.title, this.state.items) : () => this.props.removeList(this.state.listId)}>
                    <span className={this.props.id === 0 ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove"}></span>
                </button>}

                <br />

                {/* A checkbox to show the items with complete = true. On the empty list will say: Insert your list items below. */}
                <div className="checkbox">
                    <label>{this.state.listId !== 0 && <input 
                                name = "showCompleted"
                                type="checkbox" 
                                value={this.state.showCompleted}
                                onChange = {this.handleChange} />}
                                {this.props.id !== 0 ? "Show completed" : "Insert your list items below:"}
                    </label>
                </div>

                {/* Empty textbox for every list to add new item/s. */}
                <div>
                    {this.state.listId !== 0 && this.props.isLoggedIn && <ListItem 
                        name = "listItem" 
                        key = {0}
                        item = {{id: 0}}
                        listId = {this.state.listId}
                        value = {this.state.newItem.itemDesc}
                        showCompleted = {this.state.showCompleted}
                        isLoggedIn = {this.props.isLoggedIn}
                        handleYes = {this.handleAddItem}
                        handleItemChange = {this.handleItemChange}
                    />}


                    {/* The list items. */}
                    {items}
                </div>
            </div>
        )
    }
}

export default List
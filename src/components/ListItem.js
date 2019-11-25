import React from 'react'

class ListItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){


        const compeltedStyle = {
            fontStyle: 'italic',
            fontSize: '20px',
            fontColor: 'gray',
            textDecoration: 'line-through'
        }

        const style = {
            fontWeight: 'bold',
            fontSize: '20px'
        }

        const isDisabled = this.props.item.completed ? true : false

        const btns = this.props.item.id === 0 || this.props.listId === 0 ? 
        // If the prop id is 0, or the listId prop is 0, the buttons will be minus and plus
            <div>
                <button className="btn btn-success" onClick = {this.props.handleYes}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
                <button className="btn btn-danger" onClick = {this.props.handleNo}>
                    <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                </button>
            </div>
        :   
        // If the prop id or listId isn't 0, the buttons will be ok and remove
            <div>
                <button disabled={isDisabled} className="btn btn-success" onClick = {() => this.props.handleYes(this.props.item)}>
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                </button>
                <button disabled = {isDisabled} className="btn btn-danger" onClick = {() => this.props.handleNo(this.props.item.id)}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
            </div>


        return(

            //TODO -- make the items from the first list to go into List state.items
            !this.props.item.completed || (this.props.item.completed && this.props.showCompleted) ? <div className="row">
                <div className="col-xs-10">
                <input 
                    id = {this.props.item.id}
                    className="form-control" 
                    disabled={(this.props.item.id !== 0 && this.props.listId !== 0) && true} 
                    value = {(this.props.id === 0 && this.props.listId > 0) ? this.props.value : this.props.item.itemDesc}
                    onChange = {this.props.listId === 0 ? this.props.handleNewListChange : this.props.handleItemChange} 
                    style={this.props.item.completed ? compeltedStyle : style} />
                </div>
                {(this.props.isLoggedIn || this.props.item.id === 0) && btns}
                <hr />
            </div> : null
        )
    }
}

export default ListItem
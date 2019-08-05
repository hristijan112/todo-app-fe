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

        const btns = this.props.item.id === 0 ? 
            <div>
                <button className="btn btn-success" onClick = {this.props.handleYes}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
                <button className="btn btn-danger" onClick = {this.props.handleNo}>
                    <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                </button>
            </div>
        :   <div>
                <button disabled={isDisabled} className="btn btn-success" onClick = {() => this.props.handleYes(this.props.item)}>
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                </button>
                <button disabled = {isDisabled} className="btn btn-danger" onClick = {() => this.props.handleNo(this.props.item.id)}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
            </div>


        return(
            !this.props.item.completed || (this.props.item.completed && this.props.showCompleted) ? <div className="row">
                <div className="col-xs-10">
                <input 
                    className="form-control" 
                    disabled={this.props.item.id !== 0 && true} 
                    value={this.props.item.itemDesc} 
                    style={this.props.item.completed ? compeltedStyle : style} />
                </div>
                {(this.props.isLoggedIn || this.props.item.id === 0) && btns}
                <hr />
            </div> : null
        )
    }
}

export default ListItem
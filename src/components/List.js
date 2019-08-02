import React from 'react'
import ListItem from './ListItem'

class List extends React.Component{


    render(){
        const titleStyle = {
            border: '5px solid brown'
        }

        const boxStyle = {
            border: '5px solid brown',
            height: '400px'
        }

        const items = this.props.listItems.map(item => {
            return <ListItem key = {item.id} itemDesc = {item.itemDesc} />
        })


        return (
            <div style={boxStyle} className="col-xs-6">
                <h2 style={titleStyle}>{this.props.title} <button><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></h2>
                <div className="checkbox">
                    <label><input type="checkbox" value="" />Show completed</label>
                </div>
                <div>
                    {items}
                </div>
            </div>
        )
    }
}

export default List
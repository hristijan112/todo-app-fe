import React from 'react'

class ListItem extends React.Component{


    render(){
        return(
            <div className="row">
                <label className="col-xs-2" style={{fontWeight: 'bold', fontSize: '20px'}}>{this.props.itemDesc}</label>
                <div className="col-xs-5">
                </div>
                <button><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                <button><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                <hr />
            </div>
        )
    }
}

export default ListItem
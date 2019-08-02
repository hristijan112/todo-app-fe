import React from 'react'

class Header extends React.Component{


    render(){
        const style = {
            backgroundColor: '#937B63'
        }

        return(
            <div className="form-inline">            
                <nav className="navbar navbar-light" style={style}>
                    <p className="navbar-brand" style={{fontWeight: 'bold', fontSize: '30px'}}>
                        ToDo List
                    </p>
                    <p className="text-right" style={{fontSize: '20px'}}>
                        logout
                    </p>
                </nav>
            </div>
        )
    }
}

export default Header
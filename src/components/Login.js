import React from 'react'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            register: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister(){
        this.setState(prevState => ({
            register: !prevState.register
        }))
    }

   
    render(){

        return(
            <div>
                <form>
                    <div className="col-xs-12">
                        <div className="col-xs-4">
                            </div>
                <div className="form-group col-xs-4">
                    <label>Username:</label>
                    <input name="username" type="text" className="form-control" id="usr" value={this.state.username} onChange = {this.handleChange} />
                </div>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-4">
                        </div>
                <div className="form-group col-xs-4">
                    <label>Password:</label>
                    <input name="password" type="password" className="form-control" id="pwd" value={this.state.password} onChange = {this.handleChange} />
                </div>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-4">
                        </div>
                <div id="email-input" className = {this.state.register ? "form-group col-xs-4 visible" : "form-group col-xs-4 invisible"}>
                    <label>email:</label>
                    <input name="email" type="text" className="form-control" id="email" value={this.state.email} onChange = {this.handleChange} />
                </div>
                </div>
                <input className = "btn btn-success" type = "button" onClick = {() => this.props.handleSubmit(this.state.username, this.state.password)} 
                    value = {this.state.register ? "Register" : "Login"} />
                <button className="btn btn-success" onClick = {this.handleRegister}>{this.state.register ? "Login Form" : "Register Form"}</button>
                </form>
                <br />
            </div>
        )
    }
}

export default Login
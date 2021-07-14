import {withRouter} from 'react-router-dom'
import React from 'react'
import axios from 'axios'
class Signup extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            mail: '',
            password: '',
            cpassword :''
        }
    }
    handleInfo = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleRegister = ()=>{
        if(this.state.password == this.state.cpassword)
        {
            axios.post('http://localhost:5000/user',{data: this.state}).then(
                res =>{
                    console.log(res);
                }
            )
            this.props.history.push('/');
        }
    }
    render()
    {
        return(
            <div style={{color:'whitesmoke',borderRadius:'10px',padding:'15px',backgroundColor:'grey',width:'40%',position:'absolute',top:'20%'}}>
                <div>
                    <h2>Register for Using G15 CHAT</h2>
                <form>
                    <div class="form-group">
                        <label for="umail">Email address</label>
                        <input onChange={this.handleInfo}  name="mail" type="email" class="form-control" id="umail" aria-describedby="emailHelp" placeholder="Enter email" required/>
                    </div>
                    <div class="form-group">
                        <label for="user">Username</label>
                        <input onChange={this.handleInfo} name="username" type="text" class="form-control" id="user" aria-describedby="emailHelp" placeholder="Enter Username" required/>
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password</label>
                        <input onChange={this.handleInfo} name="password" type="password" class="form-control" id="pwd" placeholder="Password" required/>
                    </div>
                    <div class="form-group">
                        <label for="cpwd">Confirm Password</label>
                        <input onChange={this.handleInfo} name="cpassword" type="password" class="form-control" id="cpwd" placeholder="Confirm Password" required/>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <button class="btn btn-primary" onClick={this.handleRegister}>Register</button>
                        <button class="btn btn-primary" onClick={()=>{this.props.history.push('/')}}> Go back to Login page</button>
                    </div>
                  </form>
                </div>
            </div>
        );
    }
}
export default withRouter(Signup);

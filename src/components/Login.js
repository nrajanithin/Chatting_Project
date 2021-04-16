import {withRouter} from 'react-router-dom'
import React from 'react'
import axios from 'axios';
class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            un : '',
            pwd : ''
        }
    }
    handleLogin = (e)=>{
        e.preventDefault();
            axios.post('https://ashacharan.azurewebsites.net/login',this.state).then(result=>{
                console.log(result);
                console.log(result.data.length);
                if(result.data.length > 0)
                {
                    this.props.history.push({pathname:'/msg', state:{ data: this.state.un }});
                }
            })
    }
    
    handleCred = (e)=>{
        this.setState({[e.target.name]:e.target.value});
        console.log(this.state);
    }
   render()
   {
    return(
        <div style={{color:'whitesmoke',borderRadius:'10px',padding:'15px',backgroundColor:'grey',width:'40%',position:'absolute',top:'20%'}}>
            <div>
            <form>
                <div class="form-group">
                    <label for="un">Username</label>
                    <input name="un" onChange={this.handleCred} class="form-control" id="un" aria-describedby="emailHelp" placeholder="Enter email" required/>
                </div>
                <div class="form-group">
                    <label for="pwd">Password</label>
                    <input onChange={this.handleCred} name="pwd" type="password" class="form-control" id="pwd" placeholder="Password" required/>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <button class="btn btn-primary" onClick={this.handleLogin}>Submit</button>
                    <button class="btn btn-primary" onClick={()=>{this.props.history.push('/signup')}}>Register</button>
                </div>
              </form>
            </div>
            
        </div>
    );
   }
}
export default withRouter(Login);

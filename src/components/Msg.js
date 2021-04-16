import axios from 'axios';
import React from 'react'
import {withRouter} from 'react-router-dom'
import fire from './fire'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import sound from '../sound.mp3';
class Msg extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ref:0,
            update:'',
            msg: '',
            user: this.props.location.state.data,
            database : '',
            li : [],
            chat:[],
            userslist:[],
            flag:''
        };
    }

    componentDidMount = ()=>{
        axios.post('https://ashacharan.azurewebsites.net/list',{data:this.state.user}).then(res=>{
            console.log(res);
            this.setState({li:res.data});
            console.log(this.state.li);
            axios.post('https://ashacharan.azurewebsites.net/userslist',{data:this.state.user}).then(result=>{
            this.setState({userslist:result.data})    
            console.log(result);

        })
        })
    }
    handleKeyPress = (e)=>{
        if(e.key === 'Enter'){
            console.log('enter press here! ')
            console.log(this.state.msg);
            fire.database().ref().child(this.state.database).push(
                {name:this.state.user,msg:this.state.msg},
                err=>
                {
                    if(err)
                    {
                        console.log(err);
                    }
                }
            )
            this.setState({msg:''})
            console.log("msg velli vundali");
          }
    }
    handleMessage = (e)=>{
        console.log(e.target.value); 
        this.setState({[e.target.name]:e.target.value});
    }
    handleDivClick = (x,i)=>{
        console.log("div click vachindhi msg");
        this.setState({ref:1})
        this.setState({database:x});
        if(this.state.flag != '')
        {
            var el = document.getElementById(this.state.flag);
            el.style.backgroundColor = 'red'
            console.log(this.state.flag);
        }
        var ele = document.getElementById(i)
        ele.style.backgroundColor = 'green'
        this.setState({flag:i})
        console.log(i);
        fire.database().ref().child(x).on('value',snapshot =>
        {
            console.log('msg snapshot loki vacham');
            this.setState({chat:[]})
            if(snapshot.val()!=null)
            {
                var x = Object.keys(snapshot.val())
                console.log(x.length);
                var chat_length = Object.keys(this.state.chat)
                console.log(chat_length.length)
                console.log(snapshot.val()[x[x.length-1]].name)
                console.log(snapshot.val())
                this.setState({chat: {...snapshot.val()}});
                console.log(this.state);
                
                let interval = window.setInterval(function(){
                    var elem = document.getElementById('chatt');
                    elem.scrollTop = elem.scrollHeight;
                    window.clearInterval(interval);
                },1000);
                if((x.length!=chat_length.length) && (this.state.ref!=1))
                {
                        console.log("bigileyyyyy");
                        this.playAudio();
                }
                this.setState({ref:0})
                this.forceUpdate();
            }
        });
        console.log("raja nithin flag");
    }
    handleDropChange=(x)=>
    {
        
        console.log(x);
        if(x!=null)
        {
            axios.post('https://ashacharan.azurewebsites.net/validate',{add:x,me:this.state.user}).then(res =>{
            console.log(res);
                axios.post('https://ashacharan.azurewebsites.net/list',{data:this.state.user}).then(res=>{
                    console.log(res);
                    this.setState({li:res.data});
                    console.log(this.state.li);
                    axios.post('https://ashacharan.azurewebsites.net/userslist',{data:this.state.user}).then(result=>{
                    this.setState({userslist:result.data})    
                    console.log(result);
                })
                })
            })
        }
        
    }
    playAudio() {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play()
      }
    getMostRecentUsers = ()=>{
        console.log("code for getting most recent users");
        axios.post('https://ashacharan.azurewebsites.net/userslist',{data:this.state.user}).then(result=>{
                    this.setState({userslist:result.data})    
                    console.log(result);
                })
    }
    render()
    {
        return(
            <div style={{marginTop:'3px',display:'inline-block',width:'100%'}}>
                <div style={{float:'left',width:'20%',borderStyle:'solid'}}>
                    <div onClick={this.getMostRecentUsers} style={{padding:'5px',backgroundColor:'whitesmoke'}}>
                    <Autocomplete
                        id="combo-box-demo"
                        
                        onChange={(event, newValue) => {
                            this.handleDropChange(newValue);
                          }}
                        options={this.state.userslist}
                        getOptionLabel={(option) => option.username}
                        style={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params}  label="Find Friends" variant="outlined" />}
                        />
                    </div>
                    <div  id="raju"  style={{height:'92.5vh',marginTop:'5px',padding:'5px'}}>
                        {
                            this.state.li.map((r,i)=>(
                                <div onClick={()=>this.handleDivClick(r.grp,r.rec)} id={r.rec} key={i} style={{marginTop:'5px',borderRadius:'5px',borderBottomRightRadius:'100px',borderTopRightRadius:'100px',padding:'2px',backgroundColor:'red'}}>
                                    <h3>{r.rec}</h3>
                                </div>
                            ))
                        }
                    </div>
                    <audio className="audio-element">
                      <source src={sound}></source>
                    </audio>
                </div>
                
                <div style={{borderTopRightRadius:'20px',borderTopLeftRadius:'20px',width:'79%',height:'99vh',marginRight:'3px',float:'right'}}>
                    {
                        this.state.database=='' ? <div style={{alignItems:'center',textAlign:'center',color:'red'}}>
                            <img style={{width:'80%'}} src="https://raw.githubusercontent.com/nrajanithin/mern-client/master/src/team.png" />
                            <h1>Welcome to DINESH-ASHA CHAT!!!</h1>
                        </div> : <div>
                        <div id="chatt" style={{height:'93vh',overflow:'scroll',overflowX:'hidden',scrollBehavior:'smooth'}}>
                        {
                                Object.keys(this.state.chat).map(id=>{
                                    if(this.state.chat[id].name == this.state.user)
                                    {
                                        return <div key={id} style={{textAlign:'justify',clear:'both',display:'block',float:'right',padding:'20px',marginBottom:'5px',backgroundColor:'red',flexWrap:'wrap',borderRadius:'12px',marginRight:'10px',marginLeft:'30%'}}>
                                        <h5 style={{color:'white'}}>{this.state.chat[id].msg}</h5>
                                        </div>
                                    }
                                    else{
                                        return <div key={id} style={{textAlign:'justify',display:'block',clear:'both',float:'left',padding:'20px',marginBottom:'5px',backgroundColor:'black',flexWrap:'wrap',borderRadius:'12px',marginRight:'30%'}}>
                                        <small style={{color:'white'}}>{this.state.chat[id].username}</small>
                                        <h5 style={{color:'white'}}>{this.state.chat[id].msg}</h5>
                                        </div>
                                    }
                                    
                                            
                                })
                            }
                        </div>
                        <div style={{display:'flex'}}>
                            <input value={this.state.msg} onKeyPress={this.handleKeyPress} name="msg" onChange={this.handleMessage} style={{width:'90%'}} class="form-control" placeholder="Your message here.." />
                            <button style={{width:'10%'}} class="btn btn-primary">Send</button>
                        </div>
                    </div>
                    }
                    
        
                </div>
            </div>
        );

    }
}
export default withRouter(Msg);
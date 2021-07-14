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
            snapshot:[],
            chat:[],
            userslist:[],
            temp1:[],
            temp2:[],
            flag:''
        };
    }

    componentDidMount = async()=>{
            axios.post('http://localhost:5000/list',{data:this.state.user}).then(async(res)=>{
            await this.setState({li:res.data});
            var x = this.state.li;
            var l=[];
            fire.database().ref().on('child_changed',snapshot=>{
                var x = snapshot.ref.path.pieces_[0];
                if(this.state.database != x)
                {
                    if(this.state.li.filter(ra => ra.grp == x).length > 0)
                    {
                        var ele = document.getElementById(this.state.li.filter(ra => ra.grp == x)[0].rec)
                        if(ele != null)
                        {
                            ele.style.backgroundColor = 'orange'
                        }
                    }
                    
                }
            })
            axios.post('http://localhost:5000/userslist',{data:this.state.user}).then(async(result)=>{
            await this.setState({userslist:result.data})    

        })
        })
        
    }
    handleKeyPress = (e)=>{
        if(e.key === 'Enter'){
            const timestamp = Date.now();
            const t = new Intl.DateTimeFormat('en-US', {month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(timestamp);
            fire.database().ref().child(this.state.database).push(
                {name:this.state.user,msg:this.state.msg,time:t},
                err=>
                {
                    if(err)
                    {
                        console.log(err);
                    }
                }
            )
            this.setState({msg:''})
          }
    }
    handleMessage = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleDivClick = async(x,i)=>{
        this.setState({ref:1})
        await this.setState({database:x});
        if(this.state.flag != '')
        {
            var el = document.getElementById(this.state.flag);
            el.style.backgroundColor = 'red'
        }
        var ele = document.getElementById(i)
        ele.style.backgroundColor = 'green'
        await this.setState({flag:i})
        await this.setState({chat:[]})
        fire.database().ref().child(this.state.database).on('value',async(snapshot) =>
        {
            if(snapshot.val()!=null)
            {
                var y = Object.keys(snapshot.val())
                var chat_length = Object.keys(this.state.chat)
                if(x == this.state.database)
                {
                    await this.setState({chat: {...snapshot.val()}});
                }
                let interval = window.setInterval(function(){
                    var elem = document.getElementById('chatt');
                    if(elem != null)
                    {
                        elem.scrollTop = elem.scrollHeight;
                    }
                    window.clearInterval(interval);
                },1000);
                if((x.length!=chat_length.length) && (this.state.ref!=1))
                {
                        this.playAudio();
                }
                await this.setState({ref:0})
            }
        });
    }
    handleDropChange=(x)=>
    {
        if(x!=null)
        {
            axios.post('http://localhost:5000/validate',{add:x,me:this.state.user}).then(res =>{
                axios.post('http://localhost:5000/list',{data:this.state.user}).then(res=>{
                    this.setState({li:res.data});
                    axios.post('http://localhost:5000/userslist',{data:this.state.user}).then(result=>{
                    this.setState({userslist:result.data})    
                })
                })
            })
        }
        
    }
    refreshRec()
    {
        axios.post('http://localhost:5000/list',{data:this.state.user}).then(async(res)=>{
            await this.setState({li:res.data});
        })
    }
    playAudio() {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play()
      }
    getMostRecentUsers = ()=>{
        axios.post('http://localhost:5000/userslist',{data:this.state.user}).then(result=>{
                    this.setState({userslist:result.data})    
                })
    }
    render()
    {
        return(
            <div style={{display:'inline-block',width:'100%'}}>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',height:'6vh',backgroundColor:'black',color:'whitesmoke',marginTop:'0px'}}>
                    <h4 style={{margin:'0px',paddingTop:'1%'}}>Welcome {this.state.user} !!</h4>
                    <button onClick={()=>this.props.history.push('/')} style={{float:'right'}} class="btn btn-warning">Logout</button>
                </div>
                <div style={{float:'left',width:'20%',borderStyle:'solid',height:'94vh'}}>
                    <div onClick={this.getMostRecentUsers} style={{display:'flex',padding:'5px',backgroundColor:'whitesmoke'}}>
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
                        <svg onClick={()=>this.refreshRec()} style={{backgroundColor:'grey',marginLeft:'1px',borderRadius:'100px'}} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </div>
                    <div  id="raju"  style={{marginTop:'5px',padding:'5px'}}>
                        {
                            this.state.li.map((r,i)=>(
                                <div onClick={()=>this.handleDivClick(r.grp,r.rec)} id={r.rec} key={i} style={{marginTop:'5px',borderRadius:'10px',padding:'2px',backgroundColor:'red',textAlign:'center'}}>
                                    <h3 style={{margin:'0',padding:'3px'}}>{r.rec}</h3>
                                </div>
                            ))
                        }
                    </div>
                    <audio className="audio-element">
                      <source src={sound}></source>
                    </audio>
                </div>
                
                <div style={{borderTopRightRadius:'20px',borderTopLeftRadius:'20px',width:'79%',marginRight:'3px',float:'right'}}>
                    {
                        this.state.database=='' ? <div style={{alignItems:'center',textAlign:'center',color:'red'}}>
                            <img style={{width:'80%'}} src="https://raw.githubusercontent.com/nrajanithin/mern-client/master/src/team.png" />
                            <h1>Welcome CHAT!!!</h1>
                        </div> : <div>
                        <div id="chatt" style={{height:'88vh',marginTop:'2px',overflow:'scroll',overflowX:'hidden',scrollBehavior:'smooth'}}>
                        {
                                Object.keys(this.state.chat).map(id=>{
                                    if(this.state.chat[id].name == this.state.user)
                                    {
                                        return <div key={id} style={{textAlign:'justify',clear:'both',display:'block',float:'right',padding:'20px',marginBottom:'5px',backgroundColor:'red',flexWrap:'wrap',borderRadius:'12px',marginRight:'10px',marginLeft:'30%'}}>
                                            <div>
                                              <h5 style={{color:'white'}}>{this.state.chat[id].msg}</h5>
                                            </div>
                                            <div style={{fontSize:'12px',float:'right',color:'white'}}>
                                                {this.state.chat[id].time}
                                            </div>
                                        </div>
                                    }
                                    else{
                                        return <div key={id} style={{textAlign:'justify',display:'block',clear:'both',float:'left',padding:'20px',marginBottom:'5px',backgroundColor:'black',flexWrap:'wrap',borderRadius:'12px',marginRight:'30%'}}>
                                            <div>
                                              <h5 style={{color:'white'}}>{this.state.chat[id].msg}</h5>
                                            </div>
                                            <div style={{fontSize:'12px',float:'right',color:'white'}}>
                                                {this.state.chat[id].time}
                                            </div>
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
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import Msg from './components/Msg'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
function App() {
  return (
    <div>
        <Router>
        <Switch>
          <Route exact path="/">
            <div style={{display:'flex',top:'50%',alignItems:'center',justifyContent:'center',height:'100%'}}>
               <Login />
            </div>
            
          </Route>
          <Route path="/signup">
          <div style={{display:'flex',top:'50%',alignItems:'center',justifyContent:'center',height:'100%'}}>
            <Signup />
            </div>
          </Route>
          <Route path="/msg">
          <div style={{width:'100%',height:'100%'}}>
            <Msg/>
            </div>
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;

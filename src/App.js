import './App.less';
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
  Link
} from 'react-router-dom';
import Index from './pages/index'
import UserLogin from './pages/user/login'
import UserReg from './pages/user/reg'
import UserFindPw from './pages/user/forgetpw'
import oauthloading from './pages/oauth/loading'

function App() {
  return (
    <Router>
    <Switch>
       <Route path='/' component={Index} exact/>
       <Route path='/user/login' component={UserLogin} />
       <Route path='/user/reg' component={UserReg} />
       <Route path='/user/forgetpassword' component={UserFindPw} />
       <Route path='/user/oauth/validating' component={oauthloading} />
       {/* <Route to='/auth_loading' component={Auth_loading} exact/> */}
    </Switch>
    {/* <Redirect to="/dashboard" /> : <PublicHomePage /> */}
    </Router>
  );
}

export default App;

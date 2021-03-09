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
import RegBind from './pages/user/regbind'
import UserFindPw from './pages/user/forgetpw'
import Oauthloading from './pages/oauth/loading.jsx'
import UserProfile from './pages/user/profile'
import NoMatch from './pages/404'
// // WebWorker helper class
// import WebWorker from './utils/webWorker';
// // Your web worker
// import LoopWorker from './worker/loopWorker';

function App() {
  // const workerInstance = new WebWorker(new LoopWorker('123'));
  // workerInstance.addEventListener("message", e => console.log(e.data), false);
  // workerInstance.postMessage("bar");  
  // workerInstance.onmessage = function(evt) {
  //     console.log('主收'+evt.data)
  // }
  return (
    <Router>
    <Switch>
       <Route path='/' component={Index} exact/>
       <Route path='/user/login' component={UserLogin} />
       <Route path='/user/reg' component={UserReg} exact/>
       <Route path='/user/reg/bindemail' component={RegBind} />
       <Route path='/user/forgetpassword' component={UserFindPw} />
       <Route path='/user/oauth/validating' component={Oauthloading} />
       <Route path='/user/profile' component={UserProfile} />
       {/* <Route to='/auth_loading' component={Auth_loading} exact/> */}
       <Route path="*" component={NoMatch} />
    </Switch>
    {/* <Redirect to="/dashboard" /> : <PublicHomePage /> */}
    </Router>
  );
}

export default App;

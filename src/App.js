import './App.less';
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
  Link
} from 'react-router-dom';
import Index from './pages/index'
import UserLogin from './pages/user/login'

function App() {
  return (
    <Router>
    <Switch>
       <Route path='/' component={Index} exact/>
       <Route path='/user/login' component={UserLogin} />
       {/* <Route to='/auth_loading' component={Auth_loading} exact/> */}
    </Switch>
    {/* <Redirect to="/dashboard" /> : <PublicHomePage /> */}
    </Router>
  );
}

export default App;

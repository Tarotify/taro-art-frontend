import './App.less';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Index from './pages/index'
import UserLogin from './pages/user/login'

function App() {
  return (
    <BrowserRouter>
    <Switch>
       <Route to='/' component={Index} exact/>
       <Route to='/user/login' component={UserLogin} exact/>
       {/* <Route to='/auth_loading' component={Auth_loading} exact/> */}
    </Switch>
    {/* <Redirect to="/dashboard" /> : <PublicHomePage /> */}
   </BrowserRouter> 
  );
}

export default App;

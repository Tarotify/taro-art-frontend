import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import {BrowserRouter, Route,Switch} from 'react-router-dom';

import Index from './pages/index'

function App() {
  return (
    <BrowserRouter>
    <Switch>
       <Route to='/' component={Index} exact/>
       {/* <Route to='/auth_loading' component={Auth_loading} exact/> */}
    </Switch>
    {/* <Redirect to="/dashboard" /> : <PublicHomePage /> */}
   </BrowserRouter> 
  );
}

export default App;

import { useSelector, useDispatch } from 'react-redux';
import './App.css';

import checkLoginState from './functions'

import {setto, selectGlobalPage} from './features/globalState/globalStateSlice';

//pages
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';

function App() {
  const globalState = useSelector(selectGlobalPage);
  const dispatch = useDispatch();


  checkLoginState().then(r => {
    return r.json();
  }).then(r => {
    if(r.authenticated === false) {
      dispatch(setto("login"));
    }
    
    else if(r.authenticated === true) {
      dispatch(setto("dashboard"));
    }
  }) 
  
  switch (globalState) {
    case 'dashboard':
      return (
        <Dashboard/>
      )
    case 'login':
      return (
        <LoginPage/>
      );
    default:
      return (
        <div className="App">
          <span>State {globalState} is undefined</span>
        </div>
      );
  }
}

export default App;

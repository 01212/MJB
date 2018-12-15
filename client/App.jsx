import React from 'react';
import Container from './Container.jsx';
import { runInThisContext } from 'vm';
import Login from './login.jsx';
import UploadPage from './uploadPage.jsx';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import Upload from './Upload.jsx';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            display: <Login />
        }
    }


    render() {
        return (
            <div>
    
              <BrowserRouter>
              <Switch>
                    <Route exact path='/' component={Login}></Route>
                    <Route exact path='/upload' component={UploadPage}></Route>
                </Switch>
              </BrowserRouter>
                {/* {this.state.display} */}
            </div>
        )
    }
}

export default App;
import React from 'react';
import Container from './Container.jsx';
import { runInThisContext } from 'vm';
import Login from './login.jsx';
import uploadPage from './uploadPage.jsx';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            display: <Login />
        }


    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                {this.state.display}
                <h1>HELLO</h1>
            </div>
        )
    }
}

export default App;
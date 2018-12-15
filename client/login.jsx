import React from 'react';
import Container from './Container.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            uploading: false
        }

      
    }


    render() {
        return (
            <div>
                <h1>LOGIN WITH GITHUB</h1>
                <button onClick = {(e) => this.login(e)}>LOGIN</button>
                <a href = "http://localhost:3000/api/auth/github">LINK</a>
            </div>
        )
    }
}

export default Login;
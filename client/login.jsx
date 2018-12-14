import React from 'react';
import Container from './Container.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            uploading: false,
        }

        this.addToState = this.addToState.bind(this);
        this.submit = this.submit.bind(this); 
    }

    login(){
        fetch('http://localhost:3000/auth')
        .then(result => {
            console.log(result);
          
        })
        .catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                <h1>LOGIN WITH GITHUB</h1>
                <button>LOGIN</button>
            </div>
        )
    }
}

export default Login;
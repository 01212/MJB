import React from 'react';
import Container from './Container.jsx';

class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            uploading: false,
            url: ''
        }

        this.addToState = this.addToState.bind(this);
        this.submit = this.submit.bind(this); 
        this.onInput = this.onInput.bind(this);
        this.removeImg = this.removeImg.bind(this);
    }

    addToState(image) {
        const img = this.state.images.slice();
        const holder = URL.createObjectURL(image);
        img.push(holder);
        this.setState({images: img});
    }

    submit(){
        let reqBody = new FormData();

        for (let i = this.state.images.length-1; i > -1; i--) {
            reqBody.append(`${i}`, this.state.images[i]);
        }

        reqBody.append('url', this.state.url)

        const reqObj = {
            method: 'POST',
            body: reqBody
        }

        // for(let key of reqBody.entries()) {
        //     console.log(key)
        // }

        this.setState({uploading: true});
 
        fetch('http://localhost:3000/', reqObj)
        .then(result => {
            console.log(result);
            this.setState({
                uploading: false,
                images:[]
            })
        })
        .catch(err => console.log(err))
    }

    onInput(text){
        this.setState({url: text})
    }

    removeImg(){
        const arr = this.state.images.slice();
        arr.pop();
        this.setState({images: arr})
    }

    render() {
        return (
            <Container images={this.state.images} addToState={this.addToState} submit={this.submit} input={this.onInput} remove={this.removeImg}/>
        )
    }
}

export default Upload;
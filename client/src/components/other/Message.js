import React, { Component } from 'react';

export default class Message extends Component {

  state = { message: '' }

  componentDidMount() { this.setState({ message: this.props.message }); }

  componentWillUnmount () {   this.setState({ message:''  }); }

  render(){
    return(
      <div className='message-container error success'>
        <span className='message'> {this.state.message} </span>
      </div>
    );
  }
}

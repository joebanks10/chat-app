import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      from: 'Joe',
      text: '',
      messages: []
    };
  }

  componentDidMount() {
    this.socket = window.io();

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('newMessage', (msg) => {
      console.log(this.state);

      this.setState({
        messages: this.state.messages.concat(msg)
      });
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server.');
    });
  }

  onSubmit() {
    const { from, text } = this.state;

    this.socket.emit('createMessage', { 
      from,
      text
    });

    this.setState({
      text: ''
    })
  }

  onTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
      
        <header className="App-header">
          <h1 className="App-title">Chat App</h1>
        </header>

        <ol id="messages">
          {this.state.messages.map((msg, i) => (
            <li className="msg" key={`msg-${i}`}>
              <span className="msg-from">{msg.from}:</span>&nbsp;
              <span className="msg-text">{msg.text}</span>
            </li>
          ))}
        </ol>

        <form id="message-form" onSubmit={e => {
          e.preventDefault();
          this.onSubmit();
        }}>
          <input
            type="text"
            value={this.state.text}
            placeholder="Message"
            onChange={e => this.onTextChange(e)}
          />
          <button type="submit">Send</button>
        </form>

      </div>
    );
  }
}

export default App;

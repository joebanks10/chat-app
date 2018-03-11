import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    const io = window.io;
    const socket = io();

    socket.on('connect', function () {
      console.log('Connected to server');
    });

    socket.on('newMessage', function (msg) {
      console.log(msg);
    });

    socket.on('disconnect', function () {
      console.log('Disconnected from server.');
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Chat App</h1>
        </header>
        <p>Hello World</p>
      </div>
    );
  }
}

export default App;

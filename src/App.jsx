import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './component/container.jsx';
// import SentimentComponent from './sentiment/sentiment.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="mainContainer">
          <Container />
        </div>
      </div>
      
    );
  }
}

export default App;

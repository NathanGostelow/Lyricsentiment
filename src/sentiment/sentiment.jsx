import React, { Component } from 'react';
import './sentiment.css';
import Sentiment from 'sentiment';

class SentimentComponent extends Component {
  render() {
  	const sentiment = new Sentiment();
  	const result = sentiment.analyze('cats are stupid');
  	console.log('result', result);
    return (
      <div className="sentimentContainer">
        <h3> Sentiment Analysis </h3>

      </div>
    );
  }
}

export default SentimentComponent;

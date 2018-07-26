import React, { Component } from 'react';
import './container.css';

import Sentiment from 'sentiment';

class Container extends Component {

  constructor(props){
    super(props);
    this.state = {
      lyrics: 'i have no lyrics right now',
      negativeWords: null,
      positiveWords: null, 
      score: 0
    };
  }

  componentDidMount(){
    console.log('hello world i am here ', 'for your pleasure');
    this.LyricCall();
  }

  LyricCall(band, song) {
      fetch('https://api.lyrics.ovh/v1/Britney Spears/Toxic')
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              lyrics: result.lyrics
            })
            this.checkSentiment(result.lyrics);
          }
        )
  }
  checkSentiment(lyrics){
    const sentiment = new Sentiment();
    const result = sentiment.analyze(lyrics);

    this.setState({
      negativeWords: result.negative,
      positiveWords: result.positive,
      score: result.score
    })

    console.log('result', result);

  }
  render() {
    const {lyrics, positiveWords, negativeWords, score} = this.state;

   
    return (
      <div className="mainContainer">
        <div className="lyricContainer">
          <h3> Lyrics: </h3>
          <pre className="lyrics">  {lyrics} </pre>
        </div>

          <div className="sentimentContainer">
            <h3> Sentiment Analysis </h3>
            <div> SCORE: {score} </div>
            !!TO DO!! add in positive and negative words 
          </div>
        </div>
    );
  }
}

export default Container;

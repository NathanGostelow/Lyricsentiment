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
      band: 'Wham!',
      song: 'Careless Whisper', 
      score: 0
    };

    this.handleSongChange = this.handleSongChange.bind(this);
    this.handleBandChange = this.handleBandChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){

    this.LyricCall(this.state.band, this.state.song);
  }

  LyricCall(band, song) {
      if(band.length < 1){
        return
      }
      fetch(`https://api.lyrics.ovh/v1/${band}/${song}`)
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

  handleSubmit(event){
    event.preventDefault();
    this.LyricCall(this.state.band, this.state.song);
  }

  handleBandChange(event){
    this.setState({
      band: event.target.value
    });
  }

  handleSongChange(event){
    this.setState({
      song: event.target.value
    });
  }

  render() {
    const {lyrics, positiveWords, negativeWords, score} = this.state;

   
    return (
      <div className="mainContainer">
        <div className="lyricSubmition">
          <form onSubmit={this.handleSubmit}>
            <label>
              Band:
              <input type="text" value={this.state.band} onChange={this.handleBandChange} />
            </label>
            <label>
              Song:
              <input type="text" value={this.state.song} onChange={this.handleSongChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="lyricContainer">
          <h3> Lyrics: </h3>
          <pre className="lyrics">  {lyrics} </pre>
        </div>

          <div className="sentimentContainer">
            <h3> Sentiment Analysis </h3>
            <div> SCORE: {score} </div>
          </div>
        </div>
    );
  }
}

export default Container;

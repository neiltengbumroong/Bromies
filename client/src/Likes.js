import React, { Component } from 'react';
import Emoji from './Emoji';
import axios from 'axios';

const LIKES_URL = 'http://localhost:5000/likes';

class Likes extends Component {

  constructor(props) {
    super(props);
    this.state = { likes: this.props.brote.likes,
                   updated: false
                 }
    this.incrementLikes = this.incrementLikes.bind(this);
  }

  incrementLikes() {
    /*if (!this.state.updated) {
      this.setState((prevState, props) => {
        return {    
          likes: this.state.likes + 1,
          updated: true
        };
      });
    } else {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          updated: false
        };
      });
    }*/

    axios.post(LIKES_URL, this.state.brote);

  }

  render() {
    return (
      <div className="like-button-div">
      <button className="like-button" onClick={this.incrementLikes}> <Emoji symbol="💯"label="one hunnid"/>{this.state.likes}</button>
      </div>
    )
  }
}

export default Likes;

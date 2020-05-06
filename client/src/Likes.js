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

  // increment by posting to URL with brote 
  incrementLikes() {
    // if state hasn't been updated then increment, send true
    if (!this.state.updated) {
       this.setState((prevState, props) => {
        return {    
          likes: this.state.likes + 1,
          updated: true
        };
      });
      axios.post(LIKES_URL, {
        id: this.props.brote._id,
        increment: true
      });
      this.props.incrementLikeCounter(1);
     
    } else {
      // else if state has already been updated we are disliking, send false
      axios.post(LIKES_URL, {
        id: this.props.brote._id,
        increment: false
      });
      this.props.incrementLikeCounter(-1);
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          updated: false
        };
      });
    } 

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

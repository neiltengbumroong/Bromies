import React, { Component } from 'react';
import Emoji from './Emoji';

class Likes extends Component {

  constructor(props) {
    super(props);
    this.state = { likes: this.props.likes,
                   updated: false
                 }
  }

  incrementLikes() {
    if (!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes + 1,
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

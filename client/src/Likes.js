import React, { Component } from 'react';

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
      <button onClick={this.incrementLikes}>Like {this.state.likes}</button>
    )
  }
}

export default Likes;

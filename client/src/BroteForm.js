import React, { Component } from 'react';
//import BroteList from './BroteList';
import axios from 'axios';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

const API_URL = 'http://localhost:5000/brotes';

class BroteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', content: ''};
    console.log(this.props.name);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleSubmit(event, props) {
    event.preventDefault();
    const brote = this.state;
    this.setState({name: '', content: ''});
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(brote),
      headers: {
        'content-type': 'application/json'
      }
    }).then(this.props.updateState(brote))
  }


  /*async displayBrotes() {
    console.log("called");
    fetch(API_URL)
      .then(res => res.json())
      .then(brotes => {
        brotes.reverse();
        this.setState({brotesElements: brotes});
      })
  }*/




  render() {
    return(
        <div>
          <form className="brote-form">
            <label htmlFor="name">Name</label>
            <input
              className="u-full-width"
              value={this.state.name}
              type="text"
              id="name"
              name="name"
              onChange={this.handleNameChange.bind(this)}
            />
            <label htmlFor="brote">Brote</label>
            <textarea
              className="u-full-width"
              value={this.state.content}
              type="text"
              id="content"
              name="content"
              onChange={this.handleContentChange.bind(this)}
            />
            <button
              onClick={this.handleSubmit.bind(this)}
              className="button-primary"
              type="submit">
              Full Send
            </button>
          </form>
        </div>
      );
  }

}

export default BroteForm;

import React, { Component } from 'react';
import axios from 'axios';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

const BROTE_URL = 'http://localhost:5000/brotes';
const maxContent = 200;
const maxName = 20;

class BroteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      nameChars: maxName, 
      content: '', 
      contentChars: maxContent, 
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handle name change
  handleNameChange(event) {
    this.setState({name: event.target.value});
    this.setState({nameChars: maxName - event.target.value.length});
  }
  // handle content change
  handleContentChange(event) {
    this.setState({content: event.target.value});
    this.setState({contentChars: maxContent - event.target.value.length});
  }
  // on submit, set state and update database with helper method
  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const content = this.state.content;
    const brote = {name, content};
    this.setState({name: '', content: '', nameChars: maxName, contentChars: maxContent});
    axios.post(BROTE_URL, brote)
    .then(this.props.fetchBrotes()); 
  }

  render() {
    console.log("form rendering");
    return (
      <form className="brote-form">
      <div className="brote-form-input-wrapper">
        <label htmlFor="name">Name</label>
        <input
          className="u-full-width"
          value={this.state.name}
          type="text"
          id="name"
          name="name"
          maxLength="20"
          onChange={this.handleNameChange}
        />
        <div className="name-chars"> <span>Characters remaining: {this.state.nameChars}</span></div>
        <label htmlFor="brote">Brote</label>
        <textarea
          className="u-full-width"
          value={this.state.content}
          // placeholder="what's good, brother?"
          type="text"
          id="content"
          name="content"
          maxLength="200"
          onChange={this.handleContentChange}
          wrap="hard"
        />
        <div className="content-chars"> <span>Characters remaining: {this.state.contentChars}</span></div>
        </div>
        <button
          onClick={this.handleSubmit}
          className="button-fullsend"
          type="submit">
          Full Send
        </button>
      </form>
    )
  }
}

export default BroteForm;
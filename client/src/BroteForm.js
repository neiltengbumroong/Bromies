import React, { Component } from 'react';
import BroteRow from './BroteRow';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

const API_URL = 'http://localhost:5000/brotes';

class BroteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', content: '', brotesElements: [] };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const brote = this.state;
    this.setState({name: '', content: ''});
    this.updateDatabase(brote);
  }

  componentDidMount() {
    this.updateBrotes();
  }


  // on update, post to database and use response to update page
  updateDatabase(brote) {
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(brote),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res=> res.json())
      .then(this.updateBrotes());
  }


  updateBrotes() {
    fetch(API_URL)
      .then(res => res.json())
      .then(brotes => {
        brotes.reverse();
        this.setState({brotesElements: brotes});
      })
  }




  render() {
    return(
      <>
        <div>
          <form className="brote-form">
            <label htmlFor="name">Name</label>
            <input
              className="u-full-width"
              value={this.state.name}
              type="text"
              id="name"
              name="name"
              onChange={this.handleNameChange}
            />
            <label htmlFor="brote">Brote</label>
            <textarea
              className="u-full-width"
              value={this.state.content}
              type="text"
              id="content"
              name="content"
              onChange={this.handleContentChange}
            />
            <button
              onClick={this.handleSubmit}
              className="button-fullsend"
              type="submit">
              Full Send
            </button>
          </form>
        </div>

        <div className="brote-list">
        <BroteRow brotesElements={this.state.brotesElements} />
        </div>
      </>
      );
  }

}

export default BroteForm;

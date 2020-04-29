import React, { Component } from 'react';
//import BroteList from './BroteList';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

const API_URL = 'http://localhost:5000/brotes';

class BroteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', content: '', brotesElements: [] };

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
    }).then(response => response.json())
      .then(fetch(API_URL)
        .then(res => res.json())
        .then(brotes => {
          brotes.reverse();
          this.setState({brotesElements: brotes});
        }));
  }

  componentDidMount() {
    this.displayBrotes();
  }


  async displayBrotes() {
    fetch(API_URL)
      .then(res => res.json())
      .then(brotes => {
        brotes.reverse();
        this.setState({brotesElements: brotes});
      })
  }




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
          {this.state.brotesElements.map(eachBrote =>
            <div key={eachBrote._id}>
             <h5>Brother {eachBrote.name}</h5>
             <p>{eachBrote.content}</p>
             <small>{eachBrote.created}</small>
             </div>
          )}
        </div>
      );
  }

}

export default BroteForm;

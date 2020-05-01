import React, { Component } from 'react';
import axios from 'axios';
import Likes from './Likes';
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
    this.updateDatabase = this.updateDatabase.bind(this);
    this.displayBrotes = this.displayBrotes.bind(this);

  }


  // handle name change
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  // handle content change
  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  // on submit, set state and update database with helper method
  handleSubmit(event) {
    event.preventDefault();
    const brote = this.state;
    this.setState({name: '', content: ''});
    this.updateDatabase(brote);
  }

  // as soon as component mounts, fetch data and display
  componentDidMount() {
    this.displayBrotes();
  }


  // on update, post to URL and use response to update page
  updateDatabase(brote) {
    axios.post(API_URL, brote)
    .then(this.displayBrotes());
  }


  // fetch brotes from URL and set state to force render
  displayBrotes() {
    axios.get(API_URL)
      .then(res => {
        const brotes = res.data;
        brotes.reverse();
        this.setState({brotesElements: brotes});
      })
  }

  updateLikes() {}




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
            <div className="full-send-button">
              <button
                onClick={this.handleSubmit}
                className="button-fullsend"
                type="submit">
                Full Send
              </button>
            </div>
          </form>
        </div>

        <div className="brote-list">
          {this.state.brotesElements.map(eachBrote => 
            <div key={eachBrote._id}>
              <div className="list-elem">
                <div className="text-elem">     
                <h6><b> Brother {eachBrote.name} • </b> <small>  {eachBrote.created} </small></h6>
                <p>{eachBrote.content}</p>
                <Likes brote={eachBrote} updateDatabase={this.updateDatabase}/>
                </div>
              </div>
            </div>
         )}
        </div>
      </>
      );
  }

}

export default BroteForm;

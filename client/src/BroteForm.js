import React, { Component } from 'react';
import BroteStats from './BroteStats';
import axios from 'axios';
import Likes from './Likes';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';


const BROTE_URL = 'http://localhost:5000/brotes';
const AGGREGATE_URL = 'http://localhost:5000/aggregate';
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
      brotesElements: [], 
      totalLikes: 0
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchBrotes = this.fetchBrotes.bind(this);
    this.loadAggregate = this.loadAggregate.bind(this);
  }

  // handle name change
  handleNameChange(event) {
    this.setState({name: event.target.value});
    this.setState({nameChars: maxName - event.target.value.length})
  }
  // handle content change
  handleContentChange(event) {
    this.setState({content: event.target.value});
    this.setState({contentChars: maxContent - event.target.value.length})
  }
  // on submit, set state and update database with helper method
  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const content = this.state.content;
    const brote = {name, content};
    this.setState({name: '', content: '', contentChars: maxContent});
    axios.post(BROTE_URL, brote)
    this.fetchBrotes();  
  }

  // as soon as component mounts, fetch data and display
  componentDidMount() {
    this.fetchBrotes();
    this.loadAggregate();
  }

  componentDidUpdate() {
    this.loadAggregate();
  }

  // fetch brotes from URL and set state to force render
  fetchBrotes() {
    axios.get(BROTE_URL)
      .then(res => {
        const brotes = res.data;
        brotes.reverse();
        this.setState({brotesElements: brotes});
      })
  }

  loadAggregate() {
    axios.get(AGGREGATE_URL)
      .then(res => {
        this.setState({totalLikes: res.data[0].total});
      })
  }



  render() {
    return(
      <>
        <div className="parent">
          <div className="left-side">   
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
            <div className="brote-list">
              {this.state.brotesElements.map(eachBrote => 
                <div key={eachBrote._id}>
                  <div className="list-elem">
                    <div className="text-elem">     
                      <h6><b> Brother {eachBrote.name} • </b> <small>  {eachBrote.created} </small></h6>
                      <p>{eachBrote.content}</p>
                    </div>
                    <Likes brote={eachBrote} loadAggregate={this.loadAggregate}/>
                  </div>
                </div>
              )}
            </div>        
          </div>
          
          <div className="right-side">
            <BroteStats totalBrotes={this.state.brotesElements.length} totalLikes={this.state.totalLikes}/> 
          </div>
        </div>
      </>
      );
  }
}
export default BroteForm;
import React, { Component } from 'react';
import BroteForm from './BroteForm';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

const API_URL = 'http://localhost:5000/brotes';

class BroteList extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'neil', brotesElements: [] };
    this.updateState.bind(this);
  }


  updateState(brotes) {
    this.setState({brotesElements: brotes})
  }
  async displayBrotes() {
    //console.log("called");
    fetch(API_URL)
      .then(res => res.json())
      .then(brotes => {
        brotes.reverse();
        this.setState({brotesElements: brotes});
      })
  }

  componentDidMount() {
    this.displayBrotes();
  }

  /*componentDidUpdate() {
    this.displayBrotes();
  }*/

  render() {
    return(
      <div className="brotelist">
      {this.state.brotesElements.map(eachBrote =>
        <div key={eachBrote._id}>
         <h5>Brother {eachBrote.name}</h5>
         <p>{eachBrote.content}</p>
         <small>{eachBrote.created}</small>
         </div>
      )}
      </div>
      <BroteForm name={this.name}, updateState={this.updateState}/>
    )
  }
}

export default BroteList;

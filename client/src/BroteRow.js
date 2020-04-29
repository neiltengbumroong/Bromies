import React, { Component } from 'react';
import Emoji from './Emoji';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

class BroteRow extends Component {
  render() {
    return (
      this.props.brotesElements.map(eachBrote =>
      <div key={eachBrote._id}>
       <h5>Brother {eachBrote.name}</h5>
       <p>{eachBrote.content}</p>
       <small>{eachBrote.created} </small>
       <br/>
       <small> <Emoji symbol="💯" label="likes"/>{eachBrote.likes}</small>
      </div>
      )
    );
  }
}

export default BroteRow;

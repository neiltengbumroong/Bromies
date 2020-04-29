import React, { Component } from 'react';
import Emoji from './Emoji';
import Likes from './Likes';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

class BroteRow extends Component {
  render() {
    return (
      this.props.brotesElements.map(eachBrote =>
      <div key={eachBrote._id}>
       <h6>Brother {eachBrote.name}</h6>
       <small>{eachBrote.content}</small>
       <br/>
       <small>{eachBrote.created} </small>
       <br/>
       <Likes likes={eachBrote.likes}/>
      </div>
      )
    );
  }
}

export default BroteRow;

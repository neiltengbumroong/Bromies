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
      <div className="list-elem">
        <div className="text-elem">
          <div key={eachBrote._id}>
           <h6>Brother {eachBrote.name}<small> &nbsp;<b> @{eachBrote.name} </b>• {eachBrote.created} </small></h6>
           <p>{eachBrote.content}</p>
           <Likes likes={eachBrote.likes}/>
          </div>
        </div>
      </div>
      )
    );
  }
}

export default BroteRow;

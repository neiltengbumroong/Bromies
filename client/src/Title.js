import React, {Component} from 'react';
import Emoji from './Emoji';

class Title extends Component {

  render(){
      return (
        <div className="top-nav">
        <h1 className="title">Bromies: Twitter for the Homies <Emoji symbol="👬" label="brothers"/> </h1>
        </div>
      )
  }
};

export default Title;

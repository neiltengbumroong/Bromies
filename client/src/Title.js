import React, {Component} from 'react';
import Emoji from './Emoji';

class Title extends Component {

  render(){
      return (
        <h1 className="title">Bromies: Twitter for the Homies {this.props.name} <Emoji symbol="👬" label="brothers"/> </h1>
      )
  }
};

export default Title;

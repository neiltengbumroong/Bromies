import React, {Component} from 'react';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

class BroteStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="stats-table">
        <thead><tr><td colSpan="2">Statistics</td></tr></thead>
        <tbody>
          <tr>
            <td>Total Brotes</td>
            <td>{this.props.totalBrotes}</td> 
          </tr>
          <tr>
            <td>Total Hunnids</td>
            <td>{this.props.totalLikes}</td> 
          </tr>
        </tbody> 
      </table>          
    )
  }
}


export default BroteStats;
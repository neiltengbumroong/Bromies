import React, {Component} from 'react';
import axios from 'axios';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

const AGGREGATE_URL = 'http://localhost:5000/aggregate';

class BroteStats extends Component {

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
            <td>Total Likes</td>
            <td>{this.props.totalLikes}</td> 
          </tr>
        </tbody> 
      </table>          
    )
  }
}


export default BroteStats;
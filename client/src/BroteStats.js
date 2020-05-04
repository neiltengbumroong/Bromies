import React, {Component} from 'react';
import axios from 'axios';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';

const AGGREGATE_URL = 'http://localhost:5000/aggregate';

class BroteStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalLikes: 0
    }

    this.loadAggregate = this.loadAggregate.bind(this);
  }

  loadAggregate() {
    // if (this.props.totalBrotes > 0) {
      axios.get(AGGREGATE_URL)
      .then(res => {
        this.setState({totalLikes: res.data[0].total});
      })
    // }   
  }

  componentDidMount() {
    this.loadAggregate();
  }

  // componentDidUpdate() {
  //   this.loadAggregate();
  // }

  render() {
    console.log("rendered");
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
            <td>{this.state.totalLikes}</td> 
          </tr>
        </tbody> 
      </table>          
    )
  }
}


export default BroteStats;
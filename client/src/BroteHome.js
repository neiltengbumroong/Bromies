import React, { Component } from 'react';
import BroteStats from './BroteStats';
import BroteForm from './BroteForm';
import axios from 'axios';
import Likes from './Likes';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';


const BROTE_URL = 'http://localhost:5000/brotes';
const AGGREGATE_URL = 'http://localhost:5000/aggregate';




class BroteHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brotesElements: [], 
      shownElements: [],
      totalLikes: 0
    }
    this.fetchBrotes = this.fetchBrotes.bind(this);
    this.incrementLikeCounter = this.incrementLikeCounter.bind(this);
    this.loadAggregate = this.loadAggregate.bind(this);
  }

  

  //as soon as component mounts, fetch data and display
  componentDidMount() {
    this.fetchBrotes();
    this.loadAggregate();
  }

  // componentDidUpdate() {
  //   this.loadAggregate();
  // }

  loadAggregate() {
    // if (this.props.totalBrotes > 0) {
      axios.get(AGGREGATE_URL)
      .then(res => {
        this.setState({totalLikes: res.data[0].total});
      })
    // }   
  }

  // fetch brotes from URL and set state to force render
  fetchBrotes() {
    axios.get(BROTE_URL)
    .then(res => {
      this.setState({
      brotesElements: res.data.reverse()
      });
    })
  }

  

  incrementLikeCounter(value) {
    this.setState((prevState) => {
      return {
        totalLikes: prevState.totalLikes + value
      }
    })
  }



  render() {
    console.log("home rendered");
    return(
      
      <>
        <div className="parent">
          <div className="left-side">   
            <BroteForm fetchBrotes={this.fetchBrotes}/>
            <div className="brote-list">
              {this.state.brotesElements.map(eachBrote => 
                <div key={eachBrote._id}>
                  <div className="list-elem">
                    <div className="text-elem">     
                      <h6><b> Brother {eachBrote.name} • </b> <small>  {eachBrote.created} </small></h6>
                      <p>{eachBrote.content}</p>
                    </div>
                    <Likes brote={eachBrote} incrementLikeCounter={this.incrementLikeCounter}/>
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
export default BroteHome;
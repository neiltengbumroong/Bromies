import React, { Component } from 'react';
import BroteStats from './BroteStats';
import BroteForm from './BroteForm';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import Likes from './Likes';
import './css/skeleton.css';
import './css/normalize.css';
import './css/styles.css';


const AGGREGATE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/aggregate' : 'https://bromies.herokuapp.com/aggregate';
const BROTE_URLV2 = window.location.hostname === 'localhost' ? 'http://localhost:5000/brotesv2' : 'https://bromies.herokuapp.com/brotesv2';
const AGGREGATEBROTES_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/aggregateBrotes' : 'https://bromies.herokuapp.com/aggregateBrotes';

const limit = 5;


class BroteHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brotesElements: [], 
      totalLikes: 0,
      totalElements: 0,
      skip: 0,
      hasMore: true
    }
    this.fetchBrotes = this.fetchBrotes.bind(this);
    this.incrementLikeCounter = this.incrementLikeCounter.bind(this);
    this.loadAggregate = this.loadAggregate.bind(this);
    this.resetBrotes = this.resetBrotes.bind(this);
  }

  
  //as soon as component mounts, fetch data and display
  componentDidMount() {
    this.loadAggregate();
  }

  loadAggregate() {
    axios.all([
      axios.get(AGGREGATE_URL),
      axios.get(AGGREGATEBROTES_URL)
    ])
    .then(res => {
      this.setState({
        totalBrotes: res === undefined ? 0 : res[1].data,
        totalLikes: res[0].data[0] === undefined ? 0 : res[0].data[0].totalLikes
      });
    }) 
  }

  // reset brotes and make soft refresh on form submission
  resetBrotes(callback) {
    this.setState({
      brotesElements: [],
      skip: 0,
      hasMore: true
    }, () => {
      this.fetchBrotes();
    });
  }

  // fetch brotes from URL and set state to force render
  fetchBrotes() {
    axios.get(BROTE_URLV2, { 
      params: {
        skip: this.state.skip,
        limit: limit
      }
    })
    .then(res => {
      this.setState((prevState) => {
        if (prevState.skip + limit >= this.state.totalBrotes) {
          return {
            hasMore: false,
            brotesElements: [...prevState.brotesElements, ...res.data]
          }
        } else {
          return {
            hasMore: true,
            skip: prevState.skip + limit,
            brotesElements: [...prevState.brotesElements, ...res.data]
          }
        }   
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
    const items = this.state.brotesElements.map((eachBrote, i) => 
       <div className="list-elem" key={eachBrote._id + i}>
         <div className="text-elem">     
           <h6><b> Brother {eachBrote.name} • </b> <small>  {eachBrote.created} </small></h6>
           <p>{eachBrote.content}</p>
         </div>
         <Likes brote={eachBrote} incrementLikeCounter={this.incrementLikeCounter}/>
      </div>
   )
    return(
      <>
        <div className="parent">
          <div className="left-side">   
            <BroteForm fetchBrotes={this.fetchBrotes} loadAggregate={this.loadAggregate} resetBrotes={this.resetBrotes}/>
            <InfiniteScroll
              loadMore={this.fetchBrotes}
              hasMore={this.state.hasMore}
            >
              <div className="brote-list">
                {items}    
              </div> 
            </InfiniteScroll>                       
          </div>      
          <div className="right-side">
            <BroteStats totalBrotes={this.state.totalBrotes} totalLikes={this.state.totalLikes}/> 
          </div>
        </div>
      </>
      );
  }
}
export default BroteHome;
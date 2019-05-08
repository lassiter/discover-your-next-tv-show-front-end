import React from 'react';
import SearchBar from './components/SearchBar';
import Poster from './components/Poster';
import Axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import styled from 'styled-components'


const StyledInfScroll = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
`

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hasMore: true,
      rateData: {
        remainingRequests: null,
        currentLimit: null,
        nextReset: null
      },
      popularTVShows: {
        lastPage: null,
        totalPages: null,
        shows: []
      }
    }
    this.getTVShows = (page = 1) => {
      Axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`)
        .then(response => {
          console.log(response)
          let rateData = {
            remainingRequests: parseInt(response.headers["x-ratelimit-remaining"]),
            currentLimit: parseInt(response.headers["x-ratelimit-limit"]),
            nextReset: parseInt(response.headers["x-ratelimit-reset"])
          }
          let popularTVShows = {
            lastPage: response.data.page,
            totalPages: response.data.total_pages,
            shows: this.state.popularTVShows.shows.concat(response.data.results)
          }
          this.setState({
            rateData: rateData,
            popularTVShows: popularTVShows
          })
        })
    }

    this.fetchMoreData = () => {
      if (
        this.state.popularTVShows.lastPage !== this.state.popularTVShows.totalPages 
        && this.state.popularTVShows.lastPage !== null 
        && this.state.popularTVShows.totalPages !== null
      ) {
        const nextPage = this.state.popularTVShows.lastPage + 1
        this.getTVShows(nextPage)

      } else {
        this.setState({
          hasMore: false
        })
      }
    }
  }
  componentDidMount() {
    console.log(process.env.REACT_APP_TMDB_API_KEY)
    this.getTVShows()
  };
  render() {
    console.log(this.state)

    return (
      <div className="App">
        <SearchBar/>
        <StyledInfScroll
          dataLength={this.state.popularTVShows.shows.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          >
          {this.state.popularTVShows.shows.map((show, index) => (
            <Poster
              key={index}
              showData={show}
            />
          ))}
        </StyledInfScroll>
      </div>
    );
  }
}

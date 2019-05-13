import React from 'react';
import Poster from './components/Poster';
import Axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SearchBar from './components/SearchBar';

const StyledInfScroll = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
`

const ErrorWrapper = styled.div`
  margin: 0 auto;
  width: fit-content;
`
const Masthead = styled.div`
  display: flex;

`

const BackToHome = styled.div`

  height: fit-content;
  width: fit-content;
  background: black;
  border-radius: 5px;
  padding: 2px 5px;
  margin: 5px 0 0 5px;

  & > a {
    color: white;
    text-decoration: none;
  }
`

export default class NotFound extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      loading: true,
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
      let request = Axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`)
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
      return request
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
      .then(() => {
        this.setState({
          loading: false
        })
      })
  };
  render() {
    console.log(this.state)
    if (this.state.loading) {
      return null
    }
    return (
      <div className="App">
        <Masthead>
          <BackToHome>
            <Link to={"/"}>← Home</Link>
          </BackToHome>
          <ErrorWrapper>
            <h1>Uhoh... we couldn't find that page!</h1>
            <h2>These are some of our favorites.</h2>
          </ErrorWrapper>
        </Masthead>
        <SearchBar/>
        <StyledInfScroll
          dataLength={this.state.popularTVShows.shows.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            <div className="inf-scroll-loader">
              <h4>Loading...</h4>
            </div>
          }
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

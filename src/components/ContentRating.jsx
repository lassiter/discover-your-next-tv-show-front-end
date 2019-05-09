import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';

const StyledRating = styled.div`

`
const InternalWrapper = styled.span`
  display: inline-flex;
`

export default class ContentRating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rating: null
    }
  }
  
  componentDidMount() {
    console.log(this.props)
    Axios.get(`https://api.themoviedb.org/3/${this.props.mediaType}/${this.props.id}/content_ratings?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`).then(response => {
      console.log(response.data)
      let usaRating = response.data.results.filter(result => result.iso_3166_1 === "US")[0].rating
      this.setState({
        rating: usaRating
      })
    })
  }

  render() {
    if ((this.props.id || this.props.mediaType) === (null || undefined) ) {
      return <></>
    } else {
      return (
        <>
          <h4>Content Rating</h4>
          <InternalWrapper>
            <img data-src="https://www.themoviedb.org/assets/2/flags_v2/24/US-e86237650fc6e4b6f2255f3266bab2099e441962200f2da54d1aa34a3205ee86.png" data-srcset="https://www.themoviedb.org/assets/2/flags_v2/24/US-e86237650fc6e4b6f2255f3266bab2099e441962200f2da54d1aa34a3205ee86.png 1x, https://www.themoviedb.org/assets/2/flags_v2/48/US-fc54af6e5c8237200d49fd6a49061fffeb8a7217bb9000acd1c02039b65b22ba.png 2x, https://www.themoviedb.org/assets/2/flags_v2/64/US-35bf08cd02d9c5ebef38cbfbd47c1c06f4d06203f8f0e5dce2d20c6cfb0281a7.png 3x" width="24" height="24" srcset="https://www.themoviedb.org/assets/2/flags_v2/24/US-e86237650fc6e4b6f2255f3266bab2099e441962200f2da54d1aa34a3205ee86.png 1x, https://www.themoviedb.org/assets/2/flags_v2/48/US-fc54af6e5c8237200d49fd6a49061fffeb8a7217bb9000acd1c02039b65b22ba.png 2x, https://www.themoviedb.org/assets/2/flags_v2/64/US-35bf08cd02d9c5ebef38cbfbd47c1c06f4d06203f8f0e5dce2d20c6cfb0281a7.png 3x" src="https://www.themoviedb.org/assets/2/flags_v2/24/US-e86237650fc6e4b6f2255f3266bab2099e441962200f2da54d1aa34a3205ee86.png"/>
            <StyledRating>{this.state.rating}</StyledRating>
          </InternalWrapper>
        </>
      )
    }
  }
}

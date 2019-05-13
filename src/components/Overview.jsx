import React, { Component } from 'react'
import Title from './Title'
import styled from 'styled-components'
import Rating from './Rating'
import Trailer from './Trailer';

const Wrapper = styled.article`
  max-width: 90%;
  min-width: 50%;
  margin: 0 auto;
  display: flex;
  & > div {
    flex: 1 1 auto;
    &:last-child {
      margin-left: 20px;
    }
  }
`

const Summary = styled.p`
  color: white;
`
const Genre = styled.ul`
  display: inline-flex;
  li {
    display: flex;
    color: white;
  }
  li:not(:last-child):after {
      content: '|';
      margin: 0px 5px 0px 5px;
  }

  list-style-type: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
`

const PosterImage = styled.img`
  max-width: 200px;
`
export default class Overview extends Component {
  render() {
    console.log(this.props)
    const posterImage = this.props.show.poster_path === null ? <></> : <div><PosterImage src={`https://image.tmdb.org/t/p/w500${this.props.show.poster_path}`}/></div>
    const genreInfo = this.props.show.genres.map((genre, index) => {
      return <li key={index} data-id={genre.id}>{genre.name}</li>
    })
    return (
      <Wrapper>
        {posterImage}
        <div>
          <Title name={this.props.show.name} originalName={this.props.show.original_name} firstAirDate={this.props.show.first_air_date}/>
          <Rating rating={this.props.show.vote_average} votes={this.props.show.vote_count}/><Trailer showID={this.props.show.id}/>
          <Summary>{this.props.show.overview}</Summary>
          <Genre>{genreInfo}</Genre>
        </div>
      </Wrapper>
    )
  }
}

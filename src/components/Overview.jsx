import React, { Component } from 'react'
import Title from './Title'
import styled from 'styled-components'
import SeriesInfo from './SeriesInfo'
import Trailer from './Trailer';

const Wrapper = styled.article`
  max-width: 50%;
  margin: 0 auto;
  flex: 2 1 auto;
`

const Summary = styled.p`

`
const Genre = styled.ul`
  display: inline-flex;
  li {
    display: flex;
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

export default class Overview extends Component {
  render() {
    console.log(this.props)

    const genreInfo = this.props.show.genres.map((genre, index) => {
      return <li key={index} data-id={genre.id}>{genre.name}</li>
    })
    return (
      <Wrapper>
        <Title name={this.props.show.name} originalName={this.props.show.original_name}/>
        {/* <Trailer showID={this.props.show.id}/> */}
        <Summary>{this.props.show.overview}</Summary>
        <Genre>{genreInfo}</Genre>
        <SeriesInfo show={this.props.show}/>
      </Wrapper>
    )
  }
}

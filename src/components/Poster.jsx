import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const InternalPoster = styled(Link)`
  display: block;
  position: relative;
  min-width: 300px;
  min-height: 450px;
  width: min-content;
  margin: auto;
`

const PosterImage = styled.img`
  max-width: 300px;
  min-width: 150px;
  min-height: 450px;
`

const PosterHeader = styled.h3`
  display: block;
  font-size: 2em;
  color: white;

  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`
const PosterOverview = styled.p`
  display: block;
  font-size: 1em;
  color: white;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

const HoverContainer = styled.div`
  &.null-poster {
    background: linear-gradient(180deg, rgba(0,0,0,1), rgba(0,0,0,0) 100%);
    width: 300px;
    height: 450px;
    position: absolute;
    top: 0;
  }
  &.hidden {
    display: none;
  }
  &:not(.null-poster) {
    background: linear-gradient(180deg, rgba(0,0,0,1), rgba(0,0,0,0) 100%);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
`

export default class Poster extends Component {
  constructor(props){
    super(props)
    this.hoverContainerRef = React.createRef();
    this.state = {
      className: "hidden",
      hoverIsActive: false
    }
    this.handleHover = () => {
      if (!this.state.hoverIsActive) {
        this.setState({
          hoverIsActive: true,
          className: ""
        })
      } else {
        this.setState({
          hoverIsActive: null,
          className: "hidden"
        })
      }
    }
  }
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }
  render() {
    if (this.props.showData.overview === "" && this.props.showData.poster_path === null) {
      return null
    }
    if (this.props.showData.poster_path === null) {
      return (
        <InternalPoster 
          alt={this.props.showData.name}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
          to={{
            pathname: `/${this.props.showData.name.split(" ").join('_')}`,
            state: {
              show: this.props.showData
            }
          }}
        >
          <HoverContainer className={"null-poster"} ref={this.hoverContainerRef}>
            <PosterHeader>{this.props.showData.name}</PosterHeader>
            <PosterOverview>{this.props.showData.overview}</PosterOverview>
          </HoverContainer>
        </InternalPoster>
      )
    } else {
      return (
        <InternalPoster 
          alt={this.props.showData.name}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
          to={{
            pathname: `/${this.props.showData.name.split(" ").join('_')}`,
            state: {
              show: this.props.showData
            }
          }}
        >
          <PosterImage src={`https://image.tmdb.org/t/p/w500${this.props.showData.poster_path}`}/>
          <HoverContainer className={this.state.className} ref={this.hoverContainerRef}>
            <PosterHeader>{this.props.showData.name}</PosterHeader>
            <PosterOverview>{this.props.showData.overview}</PosterOverview>
          </HoverContainer>
        </InternalPoster>
      )
    }
  }
}

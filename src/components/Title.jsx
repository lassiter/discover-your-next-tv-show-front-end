import React, { Component } from 'react'
import styled from 'styled-components'

const Header = styled.h1`
  color: white;
  display: inline-flex;
  margin-block-start: 0;
  margin-block-end: 0;
`
const SubHeader = styled.h3`
  color: white;
  display: inline-flex;
  margin-block-start: 0;
  margin-block-end: 0;
`
const Span = styled.span`
  display: flex;
  line-height: 1;
`
const StartDate = styled.h3`
  color: darkgray;
  display: inline-flex;
  margin-left: 15px;
  margin-block-start: 0;
  margin-block-end: 0;
`

export default class Title extends Component {
  render() {
    if (this.props.name === this.props.originalName) {
      return (
        <>
          <Span><Header>{this.props.originalName}</Header><StartDate>({this.props.firstAirDate.slice(0,4)})</StartDate></Span>
        </>
      )
    } else {
      return (
        <>
          <Span><Header>{this.props.originalName}</Header><StartDate>({this.props.firstAirDate.slice(0,4)})</StartDate></Span>
          <SubHeader>{this.props.name}</SubHeader>
        </>
      )
    }
  }
}

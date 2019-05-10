import React, { Component } from 'react'
import styled from 'styled-components'

const Header = styled.h1`
  color: white;
  display: inline-flex;
`
const SubHeader = styled.h3`
  color: white;
  display: inline-flex;
`
const Span = styled.span`

`
const StartDate = styled.h3`
  color: darkgray;
  display: inline-flex;
  margin-left: 15px;
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

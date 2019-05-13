import React, { Component } from 'react'
import styled from 'styled-components'
import star from '../img/star.png'

const Wrapper = styled.div`
  display: flex;
`

const Rate = styled.h1`
  color: white;
  display: flex;
  font-size: 50px;
  margin-block-start: 0em;
  margin-block-end: 00em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`
const Star = styled.img`
  margin-top: 10px;
  width: 15px;
  height: 15px;
`
const InternalWrapper = styled.div`
  display: flex;
  flex-flow: column;
  & > small {
    color: white;
    margin: auto;
  }
`

export default class Rating extends Component {
  render() {
    return (
      <Wrapper>
        <Rate>{this.props.rating}</Rate>
        <InternalWrapper>
          <Star src={star}/>
          <small>/10</small>
        </InternalWrapper>
      </Wrapper>
    )
  }
}

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

export default class Article extends Component {
  render() {
    return (
      <Wrapper>
        <SeriesInfo show={this.props.show}/>
      </Wrapper>
    )
  }
}

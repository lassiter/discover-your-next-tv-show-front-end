import React, { Component } from 'react'
import styled from 'styled-components'
import ContentRating from './ContentRating';

const Wrapper = styled.aside`
  max-width: 30%;
  flex: 1 1 auto;
  background-color: lightgray;
  padding: 1em 1em 1em 2em;
`
const ImageList = styled.ul`
  display: flex;
  flex-flow: row;
  list-style-type: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;

  li {
    width: min-content;
    margin-left: 15px;
  }
`

export default class Sidebar extends Component {
  render() {
    let networksTitle;
    this.props.show.networks.length > 1 ? networksTitle = "Networks" : networksTitle = "Network";
    let networks = this.props.show.networks.map((network, index) => {
      if (network.logo_path === null) {
        return (
          <li key={index}>
            {network.name}
          </li>
        )
      } else {
        return (
          <li key={index}>
            <img src={`https://image.tmdb.org/t/p/h30${network.logo_path}`} alt={network.name}/>
          </li>
        )
      }
    });

    let productionCompaniesTitle;
    this.props.show.production_companies.length > 1 ? productionCompaniesTitle = "Production Companies" : productionCompaniesTitle = "Production Company";
    let productionCompanies = this.props.show.production_companies.map((pc, index) => {
      if (pc.logo_path === null) {
        return (
          <li key={index}>
            {pc.name}
          </li>
        )
      } else {
        return (
          <li key={index}>
            <img src={`https://image.tmdb.org/t/p/h30${pc.logo_path}`} alt={pc.name}/>
          </li>
        )
      }
    });

    return (
      <Wrapper>
        <h4>{networksTitle}</h4>
        <ImageList>
          {networks}
        </ImageList>
        <h4>{productionCompaniesTitle}</h4>
        <ImageList>
          {productionCompanies}
        </ImageList>
        <ContentRating id={this.props.show.id} mediaType={"tv"}/>
      </Wrapper>
    )
  }
}

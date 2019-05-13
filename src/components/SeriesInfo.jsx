import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components'

// air_date: "2010-12-05"
// episode_count: 35
// id: 3627
// name: "Specials"
// overview: ""
// poster_path: "/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg"
// season_number: 0

const PosterImage = styled.img`
  max-height: 150px;
  margin: auto 15px auto auto;
`
const Detail = styled.small`
  display: inline-block;
  width: 100%;
`
const InfoContainer = styled.div`
  max-width: 600px;
  margin: auto auto auto 15px;
`
const StyledPanel = styled(ExpansionPanel)`
  max-width: 800px;
`

export default class SeriesInfo extends Component {
  render() {
    console.log(this.props)
    const seasons = this.props.show.seasons.filter(season => season.name !== "Specials").map((season, index) => {
      return <Season key={index} season={season}/>
    })
    return (
      <div>
        {seasons}
      </div>
    )
  }
}

class Season extends Component {
  render() {
    let overview
    if (this.props.season.overview !== "") {
      overview = <p>{this.props.season.overview}</p>
    } else {
      overview = <></>
    }
    console.log(this.props)
    const posterImage = this.props.season.poster_path === null ? <></> : <PosterImage src={`https://image.tmdb.org/t/p/w500${this.props.season.poster_path}`}/>
    return (
      <StyledPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h4>{this.props.season.name}</h4>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {posterImage}
          <InfoContainer>
            {overview}
            <Detail>Episodes This Season: {this.props.season.episode_count}</Detail>
            <Detail>Air Date: {this.props.season.air_date}</Detail>
          </InfoContainer>

        </ExpansionPanelDetails>
      </StyledPanel>
    )
  }
}
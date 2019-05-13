import React, { Component } from 'react'
import ModalVideo from 'react-modal-video'
import Axios from 'axios';
import styled from 'styled-components'
import { isNotNullOrUndefined } from '../helpers/typeChecker'

const Button = styled.button`
  border-color: black;
  color: white;
  background: black;
`

export default class Trailer extends Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      isOpen: false,
      youTubeKey: null
    }
    this.openModal = () => {
      this.setState({isOpen: true})
    }
  }

  componentDidMount(){
    Axios.get(`https://api.themoviedb.org/3/tv/${this.props.showID}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`).then(response => {
      if (response.data.results.length >= 1) {
        this.setState({
          youTubeKey: response.data.results[0].key
        })
      }
      console.log(response.data)
    })
  }



  render () {
    console.log(this.props, this.state)
    if (isNotNullOrUndefined(this.props.showID) || isNotNullOrUndefined(this.state.youTubeKey)) {
      return <></>
    } else {
      return (
        <div>
          <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.state.youTubeKey} onClose={() => this.setState({isOpen: false})} />
          <Button onClick={this.openModal}>► View Trailer</Button>
        </div>
      )
    }
  }
}

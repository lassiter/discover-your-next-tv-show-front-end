import React, { Component } from 'react'
import ModalVideo from 'react-modal-video'
import Axios from 'axios';


export default class Trailer extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = () => {
      this.setState({isOpen: true})
    }
  }

  componentDidMount(){
    Axios.get(`https://api.themoviedb.org/3/tv/${this.props.showID}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`).then(response => {
      this.setState({
        show: response.data
      })
      console.log(response.data)
    })
  }



  render () {
    console.log(this.props)
    if (this.props.showID === null) {
      return <></>
    } else {
      return (
        <div>
          <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='L61p2uyiMSo' onClose={() => this.setState({isOpen: false})} />
          <button onClick={this.openModal}>Open</button>
        </div>
      )
    }
  }
}

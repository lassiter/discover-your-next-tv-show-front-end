import React from 'react';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar'
import Axios from 'axios';
import styled from 'styled-components'
import { API_ROOT } from './constants';
import Overview from './components/Overview'

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
`
const InternalWrapper = styled.section`
  display: flex;
`
const Masthead = styled.div`
  width: 100vw;
  height: 350px;
  background: url(${props => props.backDrop}) no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 350px;
    background: linear-gradient(0deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,1) 100%);
  }
`

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: null
    }
  }

  componentDidMount(){
    const { slug } = this.props.match.params
    console.log('mounted page', slug, this.props.location.state)
    if (this.props.location.state === undefined) {
      Axios.get(`${API_ROOT}/search?q=${slug}&by=slug&class=TvShow`).then(response => {
        this.setState({
          show: response.data
        })
        console.log(response.data)
      })
    } else {
      this.setState({
        show: this.props.location.state.show
      })
    }
  }

  render() {
    if (this.state.show === null) {
      return <></>
    } else {
      return (
        <Wrapper>
          <Masthead backDrop={`https://image.tmdb.org/t/p/w1400_and_h450_face${this.state.show.backdrop_path}`}/>
          <InternalWrapper>
            <Overview show={this.state.show}/>
            <Sidebar show={this.state.show}/>
          </InternalWrapper>
        </Wrapper>
      )
    }
  }
}


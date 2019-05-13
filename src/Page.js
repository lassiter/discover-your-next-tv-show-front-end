import React from 'react';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar'
import Axios from 'axios';
import styled from 'styled-components'
import { API_ROOT } from './constants';
import Article from './components/Article'
import Overview from './components/Overview'
import { Redirect } from 'react-router-dom'

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
`
const InternalWrapper = styled.section`
  display: flex;
`
const Masthead = styled.div`
  width: 100vw;
  height: 450px;

  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 450px;
    z-index: -1;
    display: block;
    background-image: radial-gradient(circle at 20% 50%, rgba(22.35%, 23.92%, 24.31%, 0.98) 0%, rgba(1.96%, 5.49%, 9.02%, 0.88) 100%), url(${props => props.backDrop});
    background-repeat: no-repeat;
    background-size: 100vw 450px;
    filter: opacity(1) grayscale(100%) contrast(130%);
  }
`
const InternalMasthead = styled.div`
  background: transparent;
  width: 70vw;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
  z-index: 0;
`


export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: null,
      show: null,
      loading: true
    }
  }

  componentDidMount(){
    const { slug } = this.props.match.params
      Axios.get(`${API_ROOT}/search?q=${slug}&by=slug&class=TvShow`, { validateStatus: false }).then(response => {
        if (response.status === 404) {
          this.setState({
            status: response.status
          })
        } else {
          this.setState({
            show: response.data
          })
        }
      }).then(()=>{
        console.log(this.state)
        this.setState({
          loading: false
        })
      })
  }

  render() {
    console.log(this.state)
    if (this.state.status === 404) {
      return <Redirect to='/404' />
    }
    if (this.state.loading) {
      return null
    }
      return (
        <Wrapper className={"loader"}>
          <Masthead backDrop={`https://image.tmdb.org/t/p/w1400_and_h450_face${this.state.show.backdrop_path}`}>
            <InternalMasthead>
              <Overview show={this.state.show}/>
            </InternalMasthead>
          </Masthead>
          <InternalWrapper>
            <Article show={this.state.show}/>
            <Sidebar show={this.state.show}/>
          </InternalWrapper>
        </Wrapper>
      )
  }
}


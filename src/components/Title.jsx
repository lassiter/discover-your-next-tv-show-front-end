import React, { Component } from 'react'

export default class Title extends Component {
  render() {
    if (this.props.name === this.props.originalName) {
      return (
        <>
          <h1>{this.props.name}</h1>
        </>
      )
    } else {
      return (
        <>
          <h1>{this.props.originalName}</h1>
          <h3>{this.props.name}</h3>
        </>
      )
    }
  }
}

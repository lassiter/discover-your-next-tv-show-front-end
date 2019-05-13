import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components'
import toJson from 'enzyme-to-json'

import Trailer from './Trailer'

describe('App', function() {
  it('renders correctly with id value', function() {
    const wrap = shallow(
      <Trailer showID={1399}/>
    )
    wrap.setState({
      youTubeKey: "Dv0UBTfnqdI"
    })
    expect(toJson(wrap)).toMatchSnapshot()
  });

  it('renders correctly with id value', function() {
    const wrap = shallow(
      <Trailer showID={null}/>
    )
    expect(toJson(wrap)).toMatchSnapshot()
  });
});


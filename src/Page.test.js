import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import testJSON from './testJSON/got_sample_data.json'

import Page from './Page'

describe('Page', function() {
  it('should render without throwing an error', function() {
    const wrap = shallow(
      <Page
        match={{params: {slug: "Game-Of-Thrones"}, isExact: true, path: "", url: ""}}
      />
    )
    wrap.setState({ 
      status: null,
      show: JSON.parse(testJSON),
      loading: false
    })
    let match = {
      params: {
        slug: "Game-of-Thrones"
      }
    }
    wrap.setProps({ match: match })
    expect(toJson(wrap)).toMatchSnapshot()
  });
});
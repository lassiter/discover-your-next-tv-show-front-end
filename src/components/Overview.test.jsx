import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import testJSON from '../testJSON/got_sample_data.json'

import Overview from './Overview';

describe('Overview', function() {
  it('should render without throwing an error', function() {
    const wrap = shallow(
      <Overview show={JSON.parse(testJSON)}/>
    )
    expect(toJson(wrap)).toMatchSnapshot()
  });
});
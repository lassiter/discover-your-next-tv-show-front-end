import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import testJSON from '../testJSON/got_sample_data.json'

import Article from './Article';

describe('Article', function() {
  it('should render without throwing an error', function() {
    const wrap = shallow(
      <Article show={JSON.parse(testJSON)}/>
    )
    expect(toJson(wrap)).toMatchSnapshot()
  });
});
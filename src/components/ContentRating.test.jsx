import React from 'react';
import { shallow} from 'enzyme';
import 'jest-styled-components'
import toJson from 'enzyme-to-json'

import ContentRating from './ContentRating'

describe('Content Rating', function() {
  it('should render without throwing an error', function() {
    const wrap = shallow(
      <ContentRating id={63174} mediaType={"tv"}/>
    )
    wrap.setState({ rating: "TV-14" })
    expect(toJson(wrap)).toMatchSnapshot()
  });
});
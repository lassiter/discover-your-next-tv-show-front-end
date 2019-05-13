import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import testJSON from './testJSON/popular_sample_data.json'

import NotFound from './404'

describe('App', function() {
  it('should render without throwing an error', function() {
    const wrap = shallow(
      <NotFound/>
    )
    let response = JSON.parse(testJSON)
    let rateData = {
      remainingRequests: parseInt(response.headers["x-ratelimit-remaining"]),
      currentLimit: parseInt(response.headers["x-ratelimit-limit"]),
      nextReset: parseInt(response.headers["x-ratelimit-reset"])
    }
    let popularTVShows = {
      lastPage: response.data.page,
      totalPages: response.data.total_pages,
      shows: response.data.results
    }
    wrap.setState({
      rateData: rateData,
      popularTVShows: popularTVShows
    })
    expect(toJson(wrap)).toMatchSnapshot()
  });
});
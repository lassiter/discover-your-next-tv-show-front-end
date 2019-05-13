import React from 'react';
import Poster from './Poster';
import renderer from 'react-test-renderer';
import jsonTestData from '../testJSON/got_sample_data.json'
import { StaticRouter } from 'react-router'


it('renders correctly', () => {
  const voteAverage = 8.2
  const voteCount = 100
  const tree = renderer
    .create(
    <StaticRouter location="/">
      <Poster showData={JSON.parse(jsonTestData)}/>
    </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
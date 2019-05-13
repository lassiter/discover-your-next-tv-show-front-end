import React from 'react';
import SeriesInfo from './SeriesInfo';
import renderer from 'react-test-renderer';
import jsonTestData from '../testJSON/got_sample_data.json'

it('renders correctly with data', () => {
  console.log(jsonTestData)
  const tree = renderer
    .create(<SeriesInfo show={JSON.parse(jsonTestData)}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
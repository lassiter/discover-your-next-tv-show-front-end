import React from 'react';
import Sidebar from './Sidebar';
import renderer from 'react-test-renderer';
import jsonTestData from '../testJSON/got_sample_data.json'

it('renders correctly with data', () => {
  console.log(jsonTestData)
  const tree = renderer
    .create(<Sidebar show={JSON.parse(jsonTestData)}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
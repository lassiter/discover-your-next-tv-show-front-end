import React from 'react';
import Rating from './Rating';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const voteAverage = 8.2
  const voteCount = 100
  const tree = renderer
    .create(<Rating rating={voteAverage} votes={voteCount}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
import React from 'react';
import Title from './Title';
import renderer from 'react-test-renderer';

it('renders correctly with unmatching original name and name', () => {
  const name = "Ghost in the Shell"
  const originalName = "攻殻機動隊"
  const firstAirDate = "2002_10_1"
  const tree = renderer
    .create(<Title name={name} originalName={originalName} firstAirDate={firstAirDate}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with matching original name and name', () => {
  const name = "Ghost in the Shell"
  const originalName = "攻殻機動隊"
  const firstAirDate = "2002_10_1"
  const tree = renderer
    .create(<Title name={name} originalName={originalName} firstAirDate={firstAirDate}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
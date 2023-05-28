// TODO: test for WorldMap
import React from 'react';
import { render } from '@testing-library/react';
import WorldMap from './WorldMap';

test('[Dummy] renders WorldMap component', () => {
  render(<WorldMap y={null} x={null} />);
  expect(true).toBe(true);
});

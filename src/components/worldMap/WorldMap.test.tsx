import React from 'react';
import { render } from '@testing-library/react';
import WorldMap from './WorldMap';

describe('WorldMap', () => {
  it('renders the world map image', () => {
    const { getByAltText } = render(<WorldMap y={null} x={null} />);
    const worldMapImage = getByAltText('World Map');
    expect(worldMapImage).toBeInTheDocument();
  });

  it('does not render the circle if x and y are null', () => {
    const { queryByTestId } = render(<WorldMap y={null} x={null} />);
    const circle = queryByTestId('circle');
    expect(circle).not.toBeInTheDocument();
  });

  it('renders the circle if x and y are not null', () => {
    const { getByTestId } = render(<WorldMap y={0.5} x={0.5} />);
    const circle = getByTestId('circle');
    expect(circle).toBeInTheDocument();
  });

  it('sets the circle position based on x and y props', () => {
    const { getByTestId } = render(<WorldMap y={0.25} x={0.75} />);
    const circle = getByTestId('circle');
    expect(circle).toHaveStyle('top: 25%;');
    expect(circle).toHaveStyle('left: 75%;');
  });
});

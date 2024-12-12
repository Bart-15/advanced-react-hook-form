import { cleanup, render, screen } from '@testing-library/react';

import SampleComponent from '@/components/SampleComponent';

describe('SampleComponent test suite', () => {
  afterEach(() => {
    cleanup();
  });

  it('SampleComponent should display properly', () => {
    render(<SampleComponent />);

    const actual = screen.getByText('Hello this is a sample component');

    expect(actual).toBeInTheDocument();
  });
});

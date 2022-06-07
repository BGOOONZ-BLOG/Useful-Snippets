import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Composition from 'src/lib/Composition';

const TestComp = ({ text }: { text: string }) => {
  return <div>{text}</div>;
};

// A simple Composition function to simulate the scenario where we would encounter a rendering error
const { component: Component } = Composition(TestComp)<{
  fields: { text: string };
  throwError?: boolean;
}>(props => {
  if (props.throwError) {
    throw new Error('Test Error');
  }
  return { text: props.fields.text };
});

const data = { text: 'Hello World', errorText: 'This functionality is currently unavailable.' };
describe('Client: withErrorBoundary', () => {
  const { text, errorText } = data;

  it('renders the component successfully', () => {
    render(<Component fields={{ text }} />);
    expect(screen.queryByText(text)).toBeInTheDocument();
    expect(screen.queryByText(errorText)).not.toBeInTheDocument();
  });

  it('it catches an error and renders the ErrorComponent', () => {
    render(<Component fields={{ text }} throwError={true} />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
    expect(screen.queryByText(errorText)).toBeInTheDocument();
  });
});

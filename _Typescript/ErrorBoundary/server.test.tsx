/**
 * @jest-environment node
 */
// 👆 Note that we have to set the environment to be node rather than jsdom
// We can only set one enviroment per file so we test server and client separately
import Composition from 'src/lib/Composition';
import ReactDOMServer from 'react-dom/server';

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

describe('Server: withErrorBoundary', () => {
  const { text, errorText } = data;

  it('renders the component successfully', () => {
    const html = ReactDOMServer.renderToString(<Component fields={{ text }} />);
    expect(html.includes('Hello World')).toBe(true);
  });

  it('catches an error and renders the ErrorComponent', () => {
    const html = ReactDOMServer.renderToString(<Component fields={{ text }} throwError={true} />);

    expect(html.includes('Hello World')).toBe(false);
    expect(html.includes(errorText)).toBe(true);
  });
});

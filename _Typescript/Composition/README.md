# Composition

> Takes the Component, and infers the result of the compositionFunction must match the expected props of the Component.

- The first argument is the Component.
- The second argument is the compositionFunction.
- The application of those two arguments returns an object containing the compositionFunction and a function called component that will be exported as the default to be used by sitecore-react-jss Placeholder when it renders that default export from ComponentFactory.

## Example

```tsx
const ExampleComponent = ({
  headline,
  subhead,
  items,
}: {
  headline?: JSS.TextField;
  subhead?: JSS.TextField;
  items?: { image: JSS.ImageField; text: JSS.TextField }[];
}) => {
  return (
    <section>
      <div className="py-32 px-16 xl:py-48 xl:px-24">
        <header>
          {headline && <Text field={headline} tag="h2" />}
          {subhead && <RichText field={subhead} tag="p" />}
        </header>
        {items &&
          items.map((item, i) => (
            <div key={i}>
              {item.text && <Text field={item.text} />}
              <Image field={item.image} />
            </div>
          ))}
      </div>
    </section>
  );
};

const { compositionFunction, component } = Composition(ExampleComponent)(props => {
  type Curr = { TileImage: JSS.ImageField; TileTitle: JSS.TextField };
  type Acc = { image: Curr['TileImage']; text: Curr['TileTitle'] }[];

  const reduceItems = (Tiles: typeof props['fields']): Acc | undefined => {
    return Tiles?.reduce(
      (acc: Acc, curr: Curr) => [...acc, { image: curr.TileImage, text: curr.TileTitle }],
      []
    );
  };
  return {
    headline: props.fields?.Headline,
    subhead: props.fields?.Subhead,
    items: reduceItems(props.fields?.Tiles),
  };
});

export default component;
```

You could also have the reduce types be 'any' and it will still be fine. Its only as strict as you want it to be.

```tsx
const { compositionFunction, component } = Composition(ExampleComponent)(props => {
  const reduceItems = (Tiles: any) => {
    return Tiles?.reduce(
      (acc: any, curr: any) => [...acc, { image: curr.TileImage, text: curr.TileTitle }],
      []
    );
  };
  return {
    headline: props.fields?.Headline,
    subhead: props.fields?.Subhead,
    items: reduceItems(props.fields?.Tiles),
  };
});
```

Also it's useful to know that - if you have different requirements - you can pass in alternate Fields type at the callsite...

```tsx
const { compositionFunction, component } = Composition(ExampleComponent)<{
  fields: {
    Tiles?: { TileImage: JSS.ImageField; TileTitle: JSS.TextField }[];
    Headline: JSS.TextField;
    Subhead: JSS.TextField;
  };
}>(props => {
  return {
    headline: props.fields.Headline,
    subhead: props.fields.Subhead,
    items: props.fields.Tiles?.reduce(
      (acc: any, curr: any) => [...acc, { image: curr.TileImage, text: curr.TileTitle }],
      []
    ),
  };
});
```

## Using with Storybook, tests, etc

The default export is perfect for the app, but in your stories or tests where you leverage the _actual_ component rather than that default export, it will make sense to alter the approach slightly.

Export the compositionFunction as a named export, in addition to the default `component` export

```tsx
const { compositionFunction, component } = Composition(ExampleComponent)(props => {
  const reduceItems = (Tiles: any) => {
    return Tiles?.reduce(
      (acc: any, curr: any) => [...acc, { image: curr.TileImage, text: curr.TileTitle }],
      []
    );
  };
  return {
    headline: props.fields?.Headline,
    subhead: props.fields?.Subhead,
    items: reduceItems(props.fields?.Tiles),
  };
});

export { compositionFunction };
export default component;
```

Then import the compositionFunction to your test or story and pass the sitecore data as the argument.

```tsx
import { ExampleComponent, compositionFunction } from './index';
import data from './data';

const props = compositionFunction(data);

export default {
  title: 'Components/ExampleComponent',
  component: ExampleComponent,
};

const Template = args => <ExampleComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = props;
```

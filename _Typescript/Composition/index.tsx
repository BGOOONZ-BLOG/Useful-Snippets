import React from 'react';
import withErrorBoundary from 'src/lib/ErrorBoundary/withErrorBoundary';
import sitecoreMap from './sitecoreMap';

// Slightly better than just saying any...
// We know there will probably be a property called 'fields' but it could contain anything.
type JssObject = { [Key in string]?: any };
type JssLayout = {
  fields?: JssObject;
  params?: JssObject;
  placeholders?: JssObject;
  props?: any;
  id?: string;
  rendering?: Pick<JssLayout, 'fields'> & {
    componentName?: string;
    dataSource?: string;
    uid?: string;
  };
} & Record<string, any>;

/** Transforms props from Sitecore JSS layout response */
const Composition =
  <Props extends {} = any>(Component: (props: Props) => JSX.Element | null) =>
  <Fields extends JssLayout>(compositionFunction: (props: Fields) => Props) => ({
    compositionFunction,
    /** Using a HOC catches errors in the composition.tsx and index.tsx */
    component: withErrorBoundary(function CompositionComponent(jssProps: Fields) {
      if (!jssProps.fields) {
        throw new Error(
          `No fields returned for ${jssProps.rendering?.componentName}. Please ensure JSS component dataSource is set.`
        );
      }
      const newProps = compositionFunction(jssProps);
      return <Component {...newProps} />;
    }),
  });

export type { JssLayout, JssObject };
export { Composition as default, sitecoreMap };

import { useContext } from 'react';
import { SitecoreContextFactory } from '@sitecore-jss/sitecore-jss-react';
// @ts-ignore: We define our own typings for this so don't fuss about the module not being declared
import { SitecoreContextReactContext } from '@sitecore-jss/sitecore-jss-react/dist/components/SitecoreContext';
import { SitecoreContextReactContextType } from 'src/types/sitecore-jss';

/*
  The SitecoreContextFactory stores the current Sitecore context for the app.
  For example, whether the page is currently being edited, or the current language.
  Note that the export makes this essentially a singleton, so we can store state in it.

  The Sitecore context is generally updated on route change (/src/index.js).
  The `withSitecoreContext()` higher order component from `sitecore-jss-react`
  can be used to access the context from within a component.
*/
const contextFactory = new SitecoreContextFactory();

const useSitecoreContext = () => {
  // There will be an "official" hook in v16, https://github.com/Sitecore/jss/pull/508
  const { context } = useContext<SitecoreContextReactContextType>(SitecoreContextReactContext);

  // search for a component that could be inside any of the root placeholders
  const getComponent = (name: string) => {
    const placeholders = Object.values(context?.route?.placeholders || {}).flat();
    return placeholders?.filter(({ componentName }) => componentName === name);
  };

  return { context, getComponent };
};

export { contextFactory as default, useSitecoreContext };

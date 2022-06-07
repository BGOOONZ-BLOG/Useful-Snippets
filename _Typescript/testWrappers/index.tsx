import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { SitecoreContextProvider } from 'src/AppRoot';

const AppContext: FC = ({ children }) => {
  const formMethods = useForm({ mode: 'onChange' });
  return (
    <SitecoreContextProvider>
      <FormProvider {...formMethods}>
        <MemoryRouter>{children}</MemoryRouter>
      </FormProvider>
    </SitecoreContextProvider>
  );
};

// testing-library wrapper using above context
const renderWithCTX = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AppContext, ...options });

export * from '@testing-library/react';
export { renderWithCTX };

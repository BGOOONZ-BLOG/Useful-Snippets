import React, { createContext, useContext, useReducer } from 'react';
import Transition from 'src/lib/Transition';
import { SetNextSlideAction, SetSlideIndexAction, SlideContextType, State } from './types';

const initialState = {
  activeSlide: 0,
  slideData: {},
  slideDirection: -100,
};

const SlideContext = createContext<SlideContextType>({
  dispatch: () => {},
  state: initialState,
});

const SlideReducer = (state: State, action: SetNextSlideAction | SetSlideIndexAction) => {
  const automaticDirection = (slideIndex: number) => (slideIndex > state.activeSlide ? 100 : -100);

  switch (action.type) {
    case 'setNextSlide':
      return {
        ...state,
        activeSlide: state.activeSlide + action.payload.moveSlide,
        slideData: action.payload.slideData,
        slideDirection: automaticDirection(state.activeSlide + action.payload.moveSlide),
      };
    case 'setSlideIndex':
      return {
        ...state,
        activeSlide: action.payload.slideIndex,
        slideData: action.payload.slideData,
        slideDirection:
          typeof action.payload.slideDirection !== 'undefined'
            ? action.payload.slideDirection
            : automaticDirection(action.payload.slideIndex),
      };
    default:
      throw new Error();
  }
};

const SlideContextProvider = ({
  children,
  slides,
}: React.PropsWithChildren<{ slides: React.ReactElement }>) => {
  const [state, dispatch] = useReducer(SlideReducer, initialState);
  const { activeSlide, slideDirection } = state;

  return (
    <SlideContext.Provider value={{ state, dispatch }}>
      <Transition.Slide className="h-full w-full" from={slideDirection} key={activeSlide}>
        {React.Children.toArray(slides.props.children)[activeSlide]}
      </Transition.Slide>
      {children}
    </SlideContext.Provider>
  );
};

const useSlideContext = () => {
  return useContext(SlideContext);
};

export { SlideContextProvider, useSlideContext };

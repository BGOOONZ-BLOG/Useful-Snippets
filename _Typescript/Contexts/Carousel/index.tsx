import React, { createContext, useContext, useEffect, useReducer } from 'react';
import CurrentSlideIndicator from 'src/components/ModalSlideshow/components/CurrentSlideIndicator';
import {
  CarouselContextProviderType,
  CarouselContextType,
  SetNextSlideAction,
  SetSlideIndexAction,
  State,
} from './types';

const initialState: State = {
  activeSlide: 0,
  slideDirection: 'forward',
  totalSlides: 0,
};

const CarouselContext = createContext<CarouselContextType>({
  dispatch: () => {},
  state: initialState,
});

const CarouselReducer = (state: State, action: SetNextSlideAction | SetSlideIndexAction) => {
  switch (action.type) {
    case 'setNextSlide':
      return {
        ...state,
        activeSlide: state.activeSlide + action.payload.moveSlide,
        slideDirection: action.payload.slideDirection,
      };
    case 'setSlideIndex':
      return {
        ...state,
        activeSlide: action.payload.slideIndex,
        slideDirection: action.payload.slideDirection,
      };
    default:
      throw new Error();
  }
};

const CarouselContextProvider = ({
  buttons: Buttons,
  children,
  controls,
  totalSlides,
  onChange,
}: React.PropsWithChildren<CarouselContextProviderType>) => {
  const [state, dispatch] = useReducer(CarouselReducer, initialState, () => ({
    ...initialState,
    totalSlides,
  }));
  const { activeSlide, slideDirection } = state;
  // A sample from our available durations. Anything faster or slower than these
  // didn't feel right
  const durations = {
    100: 'duration-100',
    150: 'duration-150',
    200: 'duration-200',
    300: 'duration-300',
    500: 'duration-500',
  };

  // helpers
  const isForward = slideDirection === 'forward';
  const lastSlide = totalSlides - 1;

  // slide classes
  const activeClass = 'js-active-slide left-0';
  const previousClass = `js-previous-slide invisible ${isForward ? '-left-full' : 'left-full'}`;
  const nextClass = `js-next-slide invisible ${isForward ? 'left-full' : '-left-full'}`;
  const classVariantOne = isForward ? nextClass : previousClass;
  const classVariantTwo = isForward ? previousClass : nextClass;
  const durationClass = durations[controls?.delay || 300];

  // the slide after the active slide but ignored if we're at the end of the stack
  const slideIsNextButNotLast = (index: number) => index === activeSlide + 1 && index <= lastSlide;

  // the slide before the active slide but ignored if we're at the beginning of the stack
  const slideIsPreviousButNotFirst = (index: number) => index === activeSlide - 1 && index >= 0;

  // first slide, activeSlide is last
  const slideIsFirstAndActiveIsLast = (index: number) => index === 0 && activeSlide === lastSlide;

  // last slide, activeSlide is first
  const slideIsLastAndActiveIsFirst = (index: number) => index === lastSlide && activeSlide === 0;

  // We need to intercept the children passed in to the context and apply certain styles to them
  // based on where they are in relation to the active slide
  const styledChildren = React.Children.map<React.ReactNode, React.ReactNode>(
    children,
    (child, index) => {
      if (React.isValidElement(child)) {
        // the current active slide
        if (index === activeSlide) {
          return React.cloneElement(child, {
            className: `${child.props.className} ${activeClass} ${durationClass}`,
          });
        }
        if (slideIsNextButNotLast(index) || slideIsFirstAndActiveIsLast(index)) {
          return React.cloneElement(child, {
            className: `${child.props.className} ${classVariantOne} ${durationClass}`,
          });
        }
        if (slideIsPreviousButNotFirst(index) || slideIsLastAndActiveIsFirst(index)) {
          return React.cloneElement(child, {
            className: `${child.props.className} ${classVariantTwo} ${durationClass}`,
          });
        }
        // any slide that's either not the active slide or before or after the active slide
        return React.cloneElement(child, {
          className: `${child.props.className} invisible ${durationClass}`,
        });
      }
      return child;
    }
  );

  useEffect(() => {
    if (onChange) {
      onChange({ activeSlide, slideDirection });
    }
  }, [activeSlide]);

  return (
    <CarouselContext.Provider value={{ state, dispatch }}>
      <div className="js-carousel relative">
        <Buttons />
        <div className="mx-auto w-full md:w-4/5">
          <ul
            className="js-carousel-slides relative flex overflow-hidden"
            style={{ height: controls?.height }}
          >
            {styledChildren}
          </ul>
          <CurrentSlideIndicator isHidden={controls?.hideSlideIndicator} />
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

const useCarouselContext = () => {
  return useContext(CarouselContext);
};

export { CarouselContextProvider, useCarouselContext };

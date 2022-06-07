interface State {
  activeSlide: number;
  slideData?: any;
  slideDirection?: number;
}

interface SetNextSlideAction {
  type: "setNextSlide";
  payload: {
    moveSlide: number;
    slideData?: any;
  };
}

interface SetSlideIndexAction {
  type: "setSlideIndex";
  payload: {
    slideData?: any;
    slideIndex: number;
    slideDirection?: number;
  };
}

interface SlideContextType {
  dispatch(action: SetNextSlideAction): void;
  dispatch(action: SetSlideIndexAction): void;
  state: State;
}

export type {
  SetNextSlideAction,
  SetSlideIndexAction,
  SlideContextType,
  State,
};

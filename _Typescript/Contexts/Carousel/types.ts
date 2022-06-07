import { CarouselProps, TotalSlides } from 'src/components/Carousel/types';

type CarouselContextProviderType = CarouselProps &
  TotalSlides & {
    buttons: React.ElementType<any>;
    onChange?: ({
      activeSlide,
      slideDirection,
    }: {
      activeSlide: number;
      slideDirection: string;
    }) => void;
  };

interface CarouselContextType {
  dispatch(action: SetNextSlideAction): void;
  dispatch(action: SetSlideIndexAction): void;
  state: State;
}

interface SetNextSlideAction {
  payload: SetNextSlidePayload;
  type: 'setNextSlide';
}

interface SetNextSlidePayload {
  moveSlide: number;
  slideDirection: State['slideDirection'];
}

interface SetSlideIndexAction {
  payload: SetSlideIndexPayload;
  type: 'setSlideIndex';
}

interface SetSlideIndexPayload {
  slideDirection: State['slideDirection'];
  slideIndex: number;
}

interface State {
  activeSlide: number;
  slideDirection: 'forward' | 'backward';
  totalSlides: number;
}

export type {
  CarouselContextProviderType,
  CarouselContextType,
  SetNextSlideAction,
  SetSlideIndexAction,
  State,
};

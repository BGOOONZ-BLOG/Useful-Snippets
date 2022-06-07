import React from "react";
import Button from "src/components/Button";
import { useSlideContext } from "src/lib/Contexts/Slide";

const Template = ({
  first,
  last,
  special,
  title,
}: {
  first?: boolean;
  last?: boolean;
  special?: boolean;
  title: string;
}) => {
  const { dispatch } = useSlideContext();

  return (
    <div className="p-24">
      <h2 className="pb-24">{title}</h2>
      <div className="flex justify-between">
        {!first && (
          <Button
            size="sm"
            onClick={() =>
              dispatch({ type: "setNextSlide", payload: { moveSlide: -1 } })
            }
          >
            previous
          </Button>
        )}
        {!last && (
          <Button
            size="sm"
            onClick={() =>
              dispatch({ type: "setNextSlide", payload: { moveSlide: 1 } })
            }
          >
            next
          </Button>
        )}
      </div>
      {special && (
        <Button
          size="sm"
          variant="text"
          onClick={() =>
            dispatch({ type: "setSlideIndex", payload: { slideIndex: 2 } })
          }
        >
          Go to the third slide
        </Button>
      )}
    </div>
  );
};

const SlideOne = () => <Template first title="This is the first slide" />;
const SlideTwo = () => <Template title="This is the second slide" />;
const SlideThree = () => <Template title="This is the third slide" />;
const SlideFour = () => <Template title="This is the fourth slide" />;
const SlideFive = () => <Template title="This is the fifth slide" />;
const SlideSix = () => (
  <Template last special title="This is the sixth slide" />
);

export { SlideOne, SlideTwo, SlideThree, SlideFour, SlideFive, SlideSix };

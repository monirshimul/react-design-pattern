"use client";

import MousePositionOne from "./MousePositionOne";
import MousePositionTwo from "./MousePositionTwo";
import withMousePosition from "./withMousePosition";

const CombineWithHoc = () => {
  const HocMousePositionOne = withMousePosition(MousePositionOne);
  const HocMousePositionTwo = withMousePosition(MousePositionTwo);
  return (
    <div className="bg-sky-50 p-10 rounded-2xl shadow w-6/12">
      <h1 className="font-bold text-8xl text-neutral-600 my-5">
        Combine With Hoc
      </h1>
      <p className="text-gray-600">
        A higher-order component also known as a HOC is an advanced pattern that
        emerges from React's compositional nature. Specifically, a higher-order
        component is a function that takes a component and returns a new
        component. Whereas a component transforms props into UI, a higher-order
        components transforms a component into another component. In other
        words, it enhances or extends the capabilities of the component
        provided.
      </p>
      <div className="flex justify-around items-center rounded-2xl p-10 bg-orange-50 shadow my-3">
        <HocMousePositionOne />
        <HocMousePositionTwo />
      </div>
    </div>
  );
};

export default CombineWithHoc;

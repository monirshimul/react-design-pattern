"use client";
import { useEffect, useState } from "react";

const withMousePosition = (WrappedComponent) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMousePositionChange = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMousePositionChange);

    return () => {
      window.removeEventListener("mousemove", handleMousePositionChange);
    };
  }, []);

  return (props) => {
    return <WrappedComponent {...props} mousePosition={mousePosition} />;
  };
};

export default withMousePosition;

"use client";

const Button = ({ children, ...rest }) => (
  <button
    className="bg-amber-400 px-10 py-3 m-10 cursor-pointer shadow "
    onClick={() => console.log("ButtonClick")}
    {...rest}
  >
    {children}
  </button>
);

const withClick = (Component) => {
  const handleClick = () => {
    console.log("WithClick");
  };
  return (props) => {
    console.log("in the hoc props", props);
    return <Component {...props} onClick={handleClick} />;
  };
};

const MyButton = withClick(Button);

const HocExampleTwo = () => {
  return <MyButton onClick={() => console.log("AppClick")}>Submit</MyButton>;
};

export default HocExampleTwo;

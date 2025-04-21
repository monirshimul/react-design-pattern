const MousePositionTwo = ({ mousePosition }) => {
  if (!mousePosition) {
    return null;
  }
  return (
    <div className="bg-cyan-100 p-10 rounded-2xl shadow">
      <h1>MousePositionTwo</h1>
      <div className="flex justify-between items-center">
        <span>x: {mousePosition.x}</span>
        <span>y: {mousePosition.y}</span>
      </div>
    </div>
  );
};

export default MousePositionTwo;

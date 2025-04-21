"use client";

import DataFetchRenderProps from "./DataFetchRenderProps";

const DessertCount = () => {
  const renderFunc = (data) => {
    return (
      <div>
        {data.map((item, ind) => (
          <p key={ind}>
            Dessert item {ind + 1} : {item}
          </p>
        ))}
      </div>
    );
  };

  return <DataFetchRenderProps url={"desserts"} render={renderFunc} />;
};

export default DessertCount;

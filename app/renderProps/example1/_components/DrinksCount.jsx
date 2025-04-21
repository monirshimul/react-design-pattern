"use client";

import DataFetchRenderProps from "./DataFetchRenderProps";

const DrinksCount = () => {
  const renderFunc = (data) => {
    return (
      <div>
        {data.map((item, ind) => (
          <p key={ind}>
            Drinks item {ind + 1} : {item}
          </p>
        ))}
      </div>
    );
  };
  return <DataFetchRenderProps url={"drinks"} render={renderFunc} />;
};

export default DrinksCount;

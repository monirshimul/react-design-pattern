"use client";

import { useEffect, useState } from "react";

const DataFetchRenderProps = ({ render, url }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (url.includes("desserts")) {
      setData(["cake", "ice-cream", "pie"]);
    } else {
      setData(["water", "soda", "juice"]);
    }
  }, []);
  return render(data);
};

export default DataFetchRenderProps;

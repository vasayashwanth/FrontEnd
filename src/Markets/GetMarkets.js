import React, { useEffect, useState } from "react";
import JsonResult from "../JsonResult";
import * as requestUrls from "../RequestUrls";
import fetchData from "../FetchData";

const pipelines = [
  "p0",
  "p0u",
  "p1",
  "p2",
  "universalp0",
  "universalp1",
  "universalp2"
];

export default function GetMarkets() {
  const [state, setState] = useState("p0");
  const [resultState, setResultState] = useState(null);

  useEffect(() => {
    if (state)
      fetchData({ pipeline: state }, setResultState, requestUrls.GetMarketsUrl);
  }, [state]);

  return (
    <div>
      <br />
      {pipelines.map((pipeline) => (
        <span key={pipeline}>
          <input
            type="radio"
            id={pipeline}
            checked={state === pipeline}
            onChange={() => {
              setState(pipeline);
            }}
          />
          <label className="headings" htmlFor={pipeline}>
            {pipeline}
          </label>
        </span>
      ))}
      <br />
      <hr />
      <JsonResult resultState={resultState} />
    </div>
  );
}

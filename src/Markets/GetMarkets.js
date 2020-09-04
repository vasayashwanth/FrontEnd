import React, { useEffect, useState } from "react";
import JsonResult from "../JsonResult";
import * as constants from "../Constants";
import * as requestUrls from "../RequestUrls";

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
  const [waitingState, setWaitingState] = useState(null);

  useEffect(() => {
    function fetchData() {
      let data = {
        AccessToken: constants.accessToken,
        GitParameters: {
          gitRepoName: constants.defaultRepo
        },
        pipeline: state
      };

      setResultState(null);
      setWaitingState("Submitting...");

      fetch(requestUrls.GetMarketsUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => {
          setWaitingState(null);
          setResultState(json);
        });
    }
    if (state) fetchData();
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
      <JsonResult waitingState={waitingState} resultState={resultState} />
    </div>
  );
}

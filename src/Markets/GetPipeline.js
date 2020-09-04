import React, { useEffect, useState } from "react";
import JsonResult from "../JsonResult";
import * as constants from "../Constants";
import * as requestUrls from "../RequestUrls";

export default function GetPipeline() {
  const [state, setState] = useState("");
  const [resultState, setResultState] = useState(null);
  const [waitingState, setWaitingState] = useState(null);

  const textRef = React.useRef();

  useEffect(() => {
    function fetchData() {
      let data = {
        AccessToken: constants.accessToken,
        GitParameters: {
          gitRepoName: constants.defaultRepo
        },
        market: state
      };
      setResultState(null);
      setWaitingState("Submitting...");

      fetch(requestUrls.GetPipelineUrl, {
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
    <>
      <br />
      <div className="configLine">
        <label>Market:</label>
        <input ref={textRef} className="input-text-field" type="text" />
        <button
          className="btn btn-primary"
          onClick={() => {
            setState(textRef.current.value);
          }}
        >
          GetPipeline
        </button>
      </div>
      <br />
      <hr />
      <JsonResult waitingState={waitingState} resultState={resultState} />
    </>
  );
}

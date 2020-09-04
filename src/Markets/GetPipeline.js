import React, { useEffect, useState } from "react";
import JsonResult from "../JsonResult";

import * as requestUrls from "../RequestUrls";
import fetchData from "../FetchData";

export default function GetPipeline() {
  const [state, setState] = useState("");
  const [resultState, setResultState] = useState(null);

  const textRef = React.useRef();

  useEffect(() => {
    if (state)
      fetchData({ market: state }, setResultState, requestUrls.GetPipelineUrl);
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
      <JsonResult resultState={resultState} />
    </>
  );
}

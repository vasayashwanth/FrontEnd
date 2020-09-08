import React, { useState } from "react";
import JsonResult from "./JsonResult";

export default function History() {
  const [selectState, setSelectState] = useState("All");
  const [historyState] = useState(
    JSON.parse(window.localStorage.getItem("historyState")) ?? []
  );

  function clear() {
    window.localStorage.setItem("historyState", JSON.stringify([]));
    window.location.reload(false);
  }
  function renderSelectedHistory(e) {
    if (selectState.toLowerCase() === "all") {
      return historyState
        .slice()
        .reverse()
        .map((item, index) => (
          <React.Fragment key={index}>
            <JsonResult resultState={item} />
            <hr />
          </React.Fragment>
        ));
    } else {
      return historyState
        .filter((item) => {
          console.log(item.result);
          return (
            item.result.status &&
            item.result.status.toLowerCase() === selectState.toLowerCase()
          );
        })
        .slice()
        .reverse()
        .map((item, index) => (
          <React.Fragment key={index}>
            <JsonResult resultState={item} />
            <hr />
          </React.Fragment>
        ));
    }
  }
  return (
    <div>
      <>
        <div className="buttonAnddropdown">
          <label className="headings">Status:</label>
          <select
            className="dropdown"
            onChange={(e) => {
              // console.log(e.target.value);
              setSelectState(e.target.value);
            }}
          >
            <option>All</option>
            <option>Success</option>
            <option>Error</option>
          </select>

          <button className="btn btn-primary" onClick={clear}>
            Clear
          </button>
        </div>
        <hr />
        {renderSelectedHistory()}
      </>
    </div>
  );
}

import React from "react";
import capitalize from "capitalize-first-letter";
import { ProgressBar } from "react-bootstrap";

export default function JsonResult({ waitingState, resultState }) {
  function renderSwitch(param) {
    if (Array.isArray(param)) {
      return (
        <>
          <ol className="list-group">
            {param.map((item) => {
              return (
                <li key={item} className="list-group-item">
                  {item}
                </li>
              );
            })}
          </ol>
        </>
      );
    } else if (param.startsWith("http")) {
      return <a href={param}>{param}</a>;
    } else {
      return <label>{capitalize(param)}</label>;
    }
  }
  return (
    <div>
      {waitingState ? (
        <>
          <div>{waitingState}</div>
          <ProgressBar animated now={60} />
        </>
      ) : null}

      {resultState
        ? Object.keys(resultState).map((key) => (
            <div key={key}>
              <label>
                <b>{capitalize(key)} : </b>
              </label>
              {renderSwitch(resultState[key])}
            </div>
          ))
        : null}
    </div>
  );
}

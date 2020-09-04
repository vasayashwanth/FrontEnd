import React from "react";
import capitalize from "capitalize-first-letter";
import { ProgressBar } from "react-bootstrap";

export default function JsonResult({ resultState }) {
  function renderSwitch(param) {
    if (Array.isArray(param)) {
      return (
        <>
          <hr />
          <div className="container">
            <div className="row">
              {param.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {index % 4 === 0 ? (
                      <div key={index + "break"} className="w-100"></div>
                    ) : null}
                    <div key={index + item} className="col border">
                      {item}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </>
      );
    } else if (param.startsWith("http")) {
      return <a href={param}>{param}</a>;
    } else {
      return <label>{capitalize(param)}</label>;
    }
  }
  return resultState ? (
    <div>
      {resultState.waiting ? (
        <>
          <div>{resultState.waiting}</div>
          <ProgressBar animated now={60} />
        </>
      ) : null}

      {resultState.result
        ? Object.keys(resultState.result).map((key) => (
            <div key={key}>
              <label>
                <b>{capitalize(key)} : </b>
              </label>
              {renderSwitch(resultState.result[key])}
            </div>
          ))
        : null}
    </div>
  ) : null;
}

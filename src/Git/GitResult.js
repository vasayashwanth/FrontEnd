import capitalize from "capitalize-first-letter";
import React from "react";
import { ProgressBar } from "react-bootstrap";

export default function GitResult(props) {
  return (
    <>
      {props.state.waitingResult ? (
        <>
          <div>{props.state.waitingResult}</div>
          <ProgressBar animated now={60} />
        </>
      ) : null}
      <div>
        {props.state.commitResult ? (
          <>
            {Object.keys(props.state.commitResult).map((key) => (
              <div key={key}>
                <label>
                  <b>{capitalize(key)} : </b>
                </label>
                {props.state.commitResult[key].startsWith("http") ? (
                  <a href={props.state.commitResult[key]}>
                    {props.state.commitResult[key]}
                  </a>
                ) : (
                  <label>{capitalize(props.state.commitResult[key])}</label>
                )}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

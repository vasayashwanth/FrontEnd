import React, { useState, useEffect } from "react";
import GitParams from "./GitParams";
import JsonResult from "../JsonResult";
import * as constants from "../Constants";
import * as requestUrls from "../RequestUrls";

export default function Git({ state, gitState, setGitState }) {
  const [resultState, setResultState] = useState(null);
  const [waitingState, setWaitingState] = useState(null);

  useEffect(() => {
    function fetchData() {
      if (gitState.isCommited) {
        let data = {
          AccessToken: constants.accessToken,
          GitParameters: {
            gitRepoName: gitState.gitRepoName,
            branchName: gitState.branchName,
            createPullRequest: gitState.isPullRequestNeeded,
            commitMessage: gitState.commitMessage
          },
          ContextConfidenceConfig: {
            configLines: state
          }
        };

        setResultState(null);
        setWaitingState("Submitting...");
        fetch(requestUrls.CommitToGitUrl, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then((json) => {
            setGitState({
              ...gitState,
              isCommited: false
            });
            setWaitingState(null);
            setResultState(json);
          });
      }
    }
    if (state) fetchData();
  }, [gitState.isCommited]);

  return (
    <>
      <GitParams state={gitState} setState={setGitState} />
      <hr />
      <JsonResult waitingState={waitingState} resultState={resultState} />
    </>
  );
}

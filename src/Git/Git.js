import React, { useState, useEffect } from "react";
import GitParams from "./GitParams";
import JsonResult from "../JsonResult";
import fetchData from "../FetchData";
import * as requestUrls from "../RequestUrls";
import * as Utility from "../Utilities/Utility";

export default function Git({ rowState, gitParamsState, setGitParamsState }) {
  const [resultState, setResultState] = useState(null);
  const [rowStateOnSubmit, setRowStateOnSubmit] = useState(null);
  const [historyState, setHistoryState] = Utility.useLocalStorageState(
    "historyState",
    []
  );
  useEffect(() => {
    if (rowStateOnSubmit) {
      let data = {
        GitParameters: {
          gitRepoName: rowStateOnSubmit.gitParams.gitRepoName,
          branchName: rowStateOnSubmit.gitParams.branchName,
          createPullRequest: rowStateOnSubmit.gitParams.isPullRequestNeeded,
          commitMessage: rowStateOnSubmit.gitParams.commitMessage
        },
        ContextConfidenceConfig: {
          configLines: rowStateOnSubmit.rows
        }
      };
      fetchData(data, setResultState, requestUrls.CommitToGitUrl);
    }
  }, [rowStateOnSubmit]);

  useEffect(() => {
    if (resultState && resultState.result !== null)
      setHistoryState((currentState) => [...currentState, resultState]);
  }, [resultState, setHistoryState]);

  return (
    <>
      <GitParams
        rowState={rowState}
        gitParamsState={gitParamsState}
        setGitParamsState={setGitParamsState}
        setRowStateOnSubmit={setRowStateOnSubmit}
      />
      <hr />
      <JsonResult resultState={resultState} />
    </>
  );
}

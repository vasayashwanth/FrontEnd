import React, { useState, useEffect } from "react";
import GitParams from "./GitParams";
import JsonResult from "../JsonResult";
import fetchData from "../FetchData";
import * as requestUrls from "../RequestUrls";

export default function Git({ rowState, gitParamsState, setGitParamsState }) {
  const [resultState, setResultState] = useState(null);
  const [rowStateOnSubmit, setRowStateOnSubmit] = useState(null);

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

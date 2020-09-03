import React, { useEffect } from "react";
// import * as constants from "./ContextConfidenceConstants";

import GitResult from "./GitResult";
import GitParams from "./GitParams";

export default function GitCommit({ state, gitState, setGitState }) {
  useEffect(() => {
    function fetchData() {
      if (gitState.isCommited) {
        let data = {
          AccessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiJlODcyNTZjZi04ZDAyLTYyMzMtODZkNS0xMWZjNDBlMTIyYmQiLCJzY3AiOiJ2c28uY29kZV9tYW5hZ2UiLCJhdWkiOiI3NzFhMWMxNS1jYWQ2LTQ0NmYtOWM1NC1iMTFjMjY0ZjVjMmEiLCJhcHBpZCI6ImUxN2Q2ZmQ3LTc3YzItNDBlZS1iNzg3LWJiNjI1ZGNhOTU0OCIsImlzcyI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJhdWQiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwibmJmIjoxNTk5MTA5Mzg2LCJleHAiOjE1OTkxMTI5ODZ9.bhxCxFrEPlo6cGdbA4GV7AIRYmwOHzkW4sUCyLKwVX7PFVFkGwIGNMDUR8-ktVlkpO_78Aiig01RVJX7eSQsPM_uEk3Sur0i5Ok-vIWiCU7xUlFtlRRNBUT2-3HhWtYTCUrWkhzRxSEPuYDhfDV8Na-wSaDsfrkwszOzaK69C86PdKwYC5UzDm8jdxOJ4uBpOAGYeOlN7R1hUcxhZZBlK7-xeT8Q-0UBZ2JUsnKBDpmTAjloGtbhJvTysDjvXMU2qvTIJZYBbHk7DqpZA6uA7bKGXkkciZjvvY1-DbN67opG_8ncWQNHSrINFq__knsXDP8Y2aPf7EsqGr4yVDhXsA",
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

        setGitState({ ...gitState, waitingResult: "Submitting..." });
        fetch("https://rankingselfserve.azurewebsites.net/Git/CommitToGit", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then((json) => {
            setGitState({ ...gitState, waitingResult: null });
            setGitState({ ...gitState, commitResult: json });
          });
      }
    }
    fetchData();
  }, [gitState.isCommited]);

  return (
    <>
      <GitParams state={gitState} setState={setGitState} />
      <hr />
      <GitResult state={gitState} />
    </>
  );
}

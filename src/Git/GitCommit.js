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
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiJlODcyNTZjZi04ZDAyLTYyMzMtODZkNS0xMWZjNDBlMTIyYmQiLCJzY3AiOiJ2c28uY29kZV9tYW5hZ2UiLCJhdWkiOiI3Y2RlMGRlYi0xYmZjLTQyYjctOTAwNi0xNDQwZjk3OGNmNWYiLCJhcHBpZCI6ImUxN2Q2ZmQ3LTc3YzItNDBlZS1iNzg3LWJiNjI1ZGNhOTU0OCIsImlzcyI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJhdWQiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwibmJmIjoxNTk5MTUwMDE0LCJleHAiOjE1OTkxNTM2MTR9.dx448_9Ihi_hkE5LjlXxJp7GuVbcvNFwslHUnIEaYgPJQqEFVu1dnPDktrpzZZHYQqUgZ6ocKoQs1x2ERm447ADODhJx0VhDWv8PQ6MkI_jK9jLNBDIoP7BQ08zp5oAm3pf8G98T7qjdEHnxbVVnSVWhkO9p9POPoLGQgbsrzfdnSHsJDGk7AtKska_wi15-FypyD1dT2yV1MlsNXQPn7I3-JX4AT43CXUwu032hWsl547GyNr33lTwg4VynEUs6X-i7NirDcqZeRMCxDQUHRmEdIuX_NPt0J0MeQzRrxvcwOGGfmpWWgKbh_Q4tY2E9W569K5uAwieL57Renbl4Yw",
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

        setGitState({
          ...gitState,
          waitingResult: "Submitting...",
          commitResult: null
        });

        fetch("https://rankingselfserve.azurewebsites.net/Git/CommitToGit", {
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
              waitingResult: null,
              commitResult: json,
              isCommited: false
            });
            // setGitState({ ...gitState });
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

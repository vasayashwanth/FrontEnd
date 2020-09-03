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
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiJlODcyNTZjZi04ZDAyLTYyMzMtODZkNS0xMWZjNDBlMTIyYmQiLCJzY3AiOiJ2c28uY29kZV9tYW5hZ2UiLCJhdWkiOiIwODQzODcxOS0xYTQ0LTQ3ZjItODQ1ZC1hNzc3YjRmZWQxMzAiLCJhcHBpZCI6ImUxN2Q2ZmQ3LTc3YzItNDBlZS1iNzg3LWJiNjI1ZGNhOTU0OCIsImlzcyI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJhdWQiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwibmJmIjoxNTk5MTEwODkxLCJleHAiOjE1OTkxMTQ0OTF9.IwsHgCZ-xOP3Z1GcwwxP2oA_GE9D4bHrCgaFmxeRw1x5of7ab2M0zJHS0PH8avwgPdvYV04-1DeR47JdqCLjSLfeWiV2yrtxWEBZhiHlwWbAZz-j3hCSTelBKIjHUNcprpeK7kX65W_uqllZGkXWqGYJQi88iRuzMAG9W4dVoKxZzLHCEwom4aD9QqoonbeKFqGfo5OFD2f0JIKAlD1lQT9k_PuI9GORqVzhMD8GtwAraNTANtpg12gRfdVbDFBt6VpSrbDR7By_FJV4GqWA6osN0t1abp27IOEwA__q4BadChMhUT418DAHUncjNXWRToFRKmq8tqjQ6K8AMDHXCw",
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

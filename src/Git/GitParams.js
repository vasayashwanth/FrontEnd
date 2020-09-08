import React from "react";

export default function GitParams({
  rowState,
  gitParamsState,
  setGitParamsState,
  setRowStateOnSubmit
}) {
  return (
    <>
      <div className="configLine">
        <label htmlFor="commitMessage">Commit Message</label>
        <input
          className="input-text-field"
          type="text"
          id="commitMessage"
          size={
            gitParamsState.commitMessage === null
              ? 10
              : Math.max(10, gitParamsState.commitMessage.length + 1)
          }
          onChange={(e) =>
            setGitParamsState({
              ...gitParamsState,
              commitMessage: e.target.value
            })
          }
          value={gitParamsState.commitMessage}
        />
        <label htmlFor="branch">Branch Name</label>
        <input
          className="input-text-field"
          type="text"
          id="branch"
          size={
            gitParamsState.branchName === null
              ? 10
              : Math.max(10, gitParamsState.branchName.length + 1)
          }
          onChange={(e) =>
            setGitParamsState({ ...gitParamsState, branchName: e.target.value })
          }
          value={gitParamsState.branchName}
        />
      </div>
      <div className="configLine">
        <button
          className="btn btn-primary"
          // disabled={gitParamsState.isCommited}
          onClick={() => {
            //setGitParamsState({ ...gitParamsState, isCommited: true });
            setRowStateOnSubmit({ gitParams: gitParamsState, rows: rowState });
          }}
        >
          Commit
        </button>
        <div className="custom-control custom-switch">
          <input
            className="custom-control-input"
            id={"pr"}
            name={"pr"}
            type="checkbox"
            onChange={() =>
              setGitParamsState({
                ...gitParamsState,
                isPullRequestNeeded: !gitParamsState.isPullRequestNeeded
              })
            }
            checked={gitParamsState.isPullRequestNeeded}
          />

          <label className="custom-control-label" htmlFor={"pr"}>
            Create a Pull Request
          </label>
        </div>

        <div className="custom-control custom-switch">
          <input
            className="custom-control-input"
            id={"repo"}
            name={"repo"}
            type="checkbox"
            onChange={() =>
              gitParamsState.gitRepoName === "ConfigDataDummy"
                ? setGitParamsState({
                    ...gitParamsState,
                    gitRepoName: "SatoriData"
                  })
                : setGitParamsState({
                    ...gitParamsState,
                    gitRepoName: "ConfigDataDummy"
                  })
            }
            checked={gitParamsState.gitRepoName === "ConfigDataDummy"}
          />

          <label className="custom-control-label" htmlFor={"repo"}>
            Repo : {gitParamsState.gitRepoName}
          </label>
        </div>
      </div>
    </>
  );
}

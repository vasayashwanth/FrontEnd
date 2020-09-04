import * as constants from "./Constants";
export default function fetchData(data, setResultState, requestUrl) {
  let defaultData = {
    AccessToken: constants.accessToken,
    GitParameters: {
      gitRepoName: constants.defaultRepo
    }
  };
  setResultState({ result: null, waiting: "Submitting..." });

  fetch(requestUrl, {
    method: "POST",
    body: JSON.stringify({ ...defaultData, ...data }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json())
    .then((json) => {
      setResultState({ result: json, waiting: null });
    });
}

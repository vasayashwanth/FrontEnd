import React, { useEffect, useState } from "react";
const pipelines = [
  "p0",
  "p1",
  "p2",
  "universalp0",
  "universalp1",
  "universalp2"
];

export default function GetMarkets() {
  const [state, setState] = useState("p0");
  const [resultState, setResultState] = useState([]);
  useEffect(() => {
    function fetchData() {
      let data = {
        AccessToken:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiJlODcyNTZjZi04ZDAyLTYyMzMtODZkNS0xMWZjNDBlMTIyYmQiLCJzY3AiOiJ2c28uY29kZV9tYW5hZ2UiLCJhdWkiOiI2NjdkN2E1MS04YWZiLTQ5NTYtODI5My1jMDQxMTQzMWE2YjgiLCJhcHBpZCI6ImUxN2Q2ZmQ3LTc3YzItNDBlZS1iNzg3LWJiNjI1ZGNhOTU0OCIsImlzcyI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJhdWQiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwibmJmIjoxNTk5MTUzOTk5LCJleHAiOjE1OTkxNTc1OTl9.igvA58CE2w72SIpiJMUncAxztaTMreqDIxbweD54WTkvEiGOvwVBuDm8mbVM0fGJuH7leiVmy9sLXim8cxoX5OOexFKmm1I6_SiMo1X_hkCgYidCENGWJ1eW6EsHDCgDacdXJqD4Zg9zftVmjCpZ5hqIWkEt94n_vYZR4SSRS6w_ozG85Rmhq8suJgxwWJYPo63UjfNm2FC9IoQk0oC9SD79XkGEm7HHuEHVDYLIkG8EMHkAYTycZvuV1TCI_5FkKoN_kBcITc5kOEDYBtSKHn2SyRGOSg6RiwfJQQv-mSX7RVdH0EKYXJ0y9IGnQqDY46B40puPDpeWSEpcLjK_nw",
        GitParameters: {
          gitRepoName: "ConfigDataDummy"
        },
        pipeline: state
      };

      fetch("https://rankingselfserve.azurewebsites.net/Git/GetMarkets", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => {
          setResultState((currentState) => [
            ...currentState,
            { pipeline: state, markets: [...json] }
          ]);
        });
    }
    if (!resultState.filter((item) => item.pipeline === state).length >= 1) {
      fetchData();
    }
  }, [state]);

  return (
    <div>
      <br />
      {pipelines.map((pipeline) => (
        <span key={pipeline}>
          <input
            type="radio"
            id={pipeline}
            checked={state === pipeline}
            onChange={() => {
              setState(pipeline);
            }}
          />{" "}
          <label className="headings" htmlFor={pipeline}>
            {pipeline}
          </label>
        </span>
      ))}
      <br />
      <br />
      {resultState.filter((item) => item.pipeline === state).length >= 1 ? (
        <label>
          {resultState
            .filter((item) => item.pipeline === state)[0]
            .markets.map((item) => (
              <div className="headings" key={item}>
                {item}
              </div>
            ))}
        </label>
      ) : // ? resultState.map((market) => <label key={market}>{market}</label>)
      null}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import capitalize from "capitalize-first-letter";

export default function GetPipeline() {
  const [state, setState] = useState("");
  const [resultState, setResultState] = useState(null);
  const textRef = React.useRef();
  useEffect(() => {
    function fetchData() {
      let data = {
        AccessToken:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiJlODcyNTZjZi04ZDAyLTYyMzMtODZkNS0xMWZjNDBlMTIyYmQiLCJzY3AiOiJ2c28uY29kZV9tYW5hZ2UiLCJhdWkiOiI2NjdkN2E1MS04YWZiLTQ5NTYtODI5My1jMDQxMTQzMWE2YjgiLCJhcHBpZCI6ImUxN2Q2ZmQ3LTc3YzItNDBlZS1iNzg3LWJiNjI1ZGNhOTU0OCIsImlzcyI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJhdWQiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwibmJmIjoxNTk5MTUzOTk5LCJleHAiOjE1OTkxNTc1OTl9.igvA58CE2w72SIpiJMUncAxztaTMreqDIxbweD54WTkvEiGOvwVBuDm8mbVM0fGJuH7leiVmy9sLXim8cxoX5OOexFKmm1I6_SiMo1X_hkCgYidCENGWJ1eW6EsHDCgDacdXJqD4Zg9zftVmjCpZ5hqIWkEt94n_vYZR4SSRS6w_ozG85Rmhq8suJgxwWJYPo63UjfNm2FC9IoQk0oC9SD79XkGEm7HHuEHVDYLIkG8EMHkAYTycZvuV1TCI_5FkKoN_kBcITc5kOEDYBtSKHn2SyRGOSg6RiwfJQQv-mSX7RVdH0EKYXJ0y9IGnQqDY46B40puPDpeWSEpcLjK_nw",
        GitParameters: {
          gitRepoName: "ConfigDataDummy"
        },
        market: state
      };

      fetch("https://rankingselfserve.azurewebsites.net/Git/GetPipeline", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => {
          setResultState(json);
        });
    }
    if (state) fetchData();
  }, [state]);

  return (
    <>
      <br />
      <div className="configLine">
        <label>Market:</label>
        <input
          ref={textRef}
          className="input-text-field class2"
          type="text"
          // onChange={(e) => setState(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            // console.log(textRef.current);
            // console.log(textRef.current.value);
            setState(textRef.current.value);
          }}
        >
          GetPipeline
        </button>
      </div>
      <br />
      <hr />
      <div>
        {resultState ? (
          <>
            {Object.keys(resultState).map((key) => (
              <div key={key}>
                <label>
                  <b>{capitalize(key)} : </b>
                </label>
                <label>{capitalize(resultState[key])}</label>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import StructuredEditor from "./StructuredEditor";
import TextEditor from "./TextEditor";
// import $ from "jquery";
import * as constants from "./ContextConfidenceConstants";
import GitCommit from "../Git/GitCommit";

// import Cookie from "js-cookie";

function CreateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function useLocalStorageState(key, defaultValue = "") {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
function getCurrentTimeStamp() {
  let d = new Date();
  let current_timestamp =
    d.getDate() +
    "-" +
    d.getMonth() +
    "-" +
    d.getFullYear() +
    "_" +
    d.getHours() +
    "_" +
    d.getMinutes() +
    "_" +
    d.getSeconds();
  return current_timestamp;
}
export default function AddNew() {
  const initialRowState = [
    { ...constants.defaultRowValues, id: CreateUUID(), iscomment: true },
    { ...constants.defaultRowValues, id: CreateUUID() }
  ];
  const initialGroupState = [
    {
      ...constants.defaultGroupValues,
      id: CreateUUID(),
      lines: [{ ...constants.defaultGroupLine, id: CreateUUID() }]
    }
  ];
  const initialGitState = {
    ...constants.gitParams,
    branchName: constants.gitParams.branchName + getCurrentTimeStamp()
  };
  const [groupState, setGroupState] = useLocalStorageState("groupState", [
    ...initialGroupState
  ]);
  const [rowState, setRowState] = useLocalStorageState("rowState", [
    ...initialRowState
  ]);
  const [structured, setStructured] = useLocalStorageState("structured", true);

  const [gitState, setGitState] = useState(initialGitState);
  //For tabs in textarea
  useEffect(() => {
    var textareas = document.getElementsByTagName("textarea");
    var count = textareas.length;
    for (var i = 0; i < count; i++) {
      textareas[i].onkeydown = function (e) {
        if (e.keyCode === 9 || e.which === 9) {
          e.preventDefault();
          var s = this.selectionStart;
          this.value =
            this.value.substring(0, this.selectionStart) +
            "\t" +
            this.value.substring(this.selectionEnd);
          this.selectionEnd = s + 1;
        }
      };
    }
  }, [groupState]);

  function rowToGroup(row) {
    let final = [];
    let prevRowPipelines = [];
    let temp = null;
    row.forEach((element, i) => {
      if (compare(element.pipelines, prevRowPipelines)) {
        temp.lines = [...temp.lines, { ...element }];
      } else {
        if (temp) final = [...final, temp];
        temp = {
          ...constants.defaultGroupValues,
          id: CreateUUID(),
          lines: [{ ...element }],
          pipelines: [...element.pipelines]
        };
      }
      prevRowPipelines = [...element.pipelines];
    });
    if (temp) final = [...final, temp];
    return final;
  }
  //maintain prev row pipelines and group them
  // function overrideTextEditor() {}

  function grouptoRow(group) {
    let final = [];
    group.forEach((item) => {
      let temp = item.lines.map((item2) => {
        return {
          ...item2,
          pipelines: item.pipelines
        };
      });
      final = [...final, ...temp];
    });
    return final;
  }
  // function overrideStructuredEditor() {}
  function getIndex(items, value, property = "id") {
    for (let i = 0; i < items.length; i++) {
      if (
        items[i][property].toString().toLowerCase() ===
        value.toString().toLowerCase()
      )
        return i;
    }
    return -1;
  }

  function deserialize(item, prevLines) {
    let lines = item.split("\n");
    return lines.map((item, index) => {
      let lineItems = item.split("\t"); //.filter((item) => item);
      //console.log(lineItems);
      let obj = {
        ...constants.defaultGroupLine,
        id: index >= prevLines.length ? CreateUUID() : prevLines[index].id
      };
      if (item[0] !== constants.commentIdentifier) {
        for (let i = 0; i < constants.textBoxes.length; i++) {
          if (lineItems[i] != null) obj[constants.textBoxes[i]] = lineItems[i];
        }
      } else {
        obj.iscomment = true;
        for (let i = 0; i < constants.commentTextBoxes.length; i++) {
          if (lineItems[i] != null)
            obj[constants.commentTextBoxes[i]] = lineItems[i];
        }
      }

      return obj;
    });
  }

  function getParentId(event) {
    //console.log(event.target.id);
    return event.target.id.split(">")[0];
  }
  function compare(array1, array2) {
    return (
      array1.length === array2.length &&
      array1.sort().every(function (value, index) {
        return value === array2.sort()[index];
      })
    );
  }
  //Group functions
  function handleAddGroup() {
    setGroupState([
      ...groupState,
      {
        ...constants.defaultGroupValues,
        id: CreateUUID(),
        lines: [{ ...constants.defaultGroupLine, id: CreateUUID() }]
      }
    ]);
  }

  function handleDuplicateGroup(event) {
    let currentid = getParentId(event);
    if (currentid == null) throw console.error("No parent id found");

    let items = [...groupState];
    let index = getIndex(items, currentid, "id");

    setGroupState([
      ...items,
      {
        ...items[index],
        id: CreateUUID(),
        lines: items[index].lines.map((line) => {
          return { ...line, id: CreateUUID() };
        })
      }
    ]);
  }

  function handleChangeGroup(event) {
    let currentid = getParentId(event);
    if (currentid == null) throw console.error("No parent id found");

    let items = [...groupState];
    let index = getIndex(items, currentid, "id");
    if (index <= -1) {
      throw console.error("No group with given id found");
    }

    let item = { ...items[index] };
    const parsedValues = deserialize(event.target.value, item.lines);
    item[
      event.target.getAttribute("name").toString().toLowerCase()
    ] = parsedValues;
    items[index] = item;
    setGroupState(items);
  }

  function handleDeleteGroup(event) {
    let currentid = getParentId(event);
    setGroupState(
      groupState.filter((item) => item.id.toString() !== currentid.toString())
    );
  }

  function handleChangeGroupCheckBox(event) {
    let currentid = getParentId(event);
    let prop = event.target.getAttribute("name").toString().toLowerCase();
    let items = [...groupState];
    let index = getIndex(items, currentid, "id");
    if (index <= -1) {
      throw console.error("No row with given id found");
    }
    let item = { ...items[index] };
    var index2 = item.pipelines.indexOf(prop);
    if (index2 > -1) {
      item.pipelines = item.pipelines.filter(
        (item) => item.toLowerCase() !== prop
      );
    } else {
      item.pipelines = [...item.pipelines, prop];
    }
    items[index] = item;
    setGroupState(items);
  }
  function handleReset() {
    setGroupState([...initialGroupState]);
    setRowState([...initialRowState]);
    setStructured(true);
    setGitState(initialGitState);
  }

  //Row handlers
  function handleAddRow() {
    setRowState([
      ...rowState,
      {
        ...constants.defaultRowValues,
        id: CreateUUID()
      }
    ]);
  }
  function handleAddRowComment() {
    setRowState([
      ...rowState,
      {
        ...constants.defaultRowValues,
        id: CreateUUID(),
        iscomment: true
      }
    ]);
  }
  function handleDuplicateRow(event) {
    let currentid = getParentId(event);
    if (currentid == null) throw console.error("No parent id found");
    let items = [...rowState];
    let index = getIndex(items, currentid, "id");
    setRowState([...items, { ...items[index], id: CreateUUID() }]);
  }

  function handleChangeRowElement(event) {
    let currentid = getParentId(event);
    let prop = event.target.getAttribute("name").toString();
    let items = [...rowState];
    let index = getIndex(items, currentid, "id");
    let item = { ...items[index] };
    //console.log(item);
    //console.log(prop);
    if (
      prop.toLowerCase() === "comment" &&
      event.target.value[0] !== constants.commentIdentifier
    ) {
      //console.log("came here");
      item[prop.toLowerCase()] =
        constants.commentIdentifier + event.target.value;
    } else {
      //console.log("came here2");
      //console.log(event.target.value);
      if (event.target.value === "") item[prop.toLowerCase()] = null;
      else item[prop.toLowerCase()] = event.target.value;
    }

    items[index] = item;
    //console.log(items);
    setRowState(items);
  }
  function handleDeleteRow(event) {
    let currentid = getParentId(event);
    setRowState(
      rowState.filter((item) => item.id.toString() !== currentid.toString())
    );
  }
  function handleChangeRowCheckBox(event) {
    let currentid = getParentId(event);
    let prop = event.target.getAttribute("name").toString().toLowerCase();
    let items = [...rowState];
    let index = getIndex(items, currentid, "id");
    if (index <= -1) {
      throw console.error("No row with given id found");
    }
    let item = { ...items[index] };
    var index2 = item.pipelines.indexOf(prop);
    if (index2 > -1) {
      item.pipelines = item.pipelines.filter(
        (item) => item.toLowerCase() !== prop
      );
    } else {
      item.pipelines = [...item.pipelines, prop];
    }
    items[index] = item;
    setRowState(items);
  }

  return (
    <>
      <div>
        <button onClick={handleReset} className="btn btn-primary">
          Reset
        </button>
      </div>
      <div>
        <div>
          <input
            type="radio"
            id="structured"
            checked={structured}
            onChange={() => {
              setStructured((c) => true);
              setRowState(grouptoRow(groupState));
            }}
          />
          <label className="headings" htmlFor="structured">
            Structured Editor
          </label>
        </div>
        {structured ? (
          <StructuredEditor
            data={rowState}
            handleDuplicateRow={handleDuplicateRow}
            handleChangeRowElement={handleChangeRowElement}
            handleDeleteRow={handleDeleteRow}
            handleChangeRowCheckBox={handleChangeRowCheckBox}
            handleAddRow={handleAddRow}
            handleAddRowComment={handleAddRowComment}
          />
        ) : null}
      </div>
      <hr />
      <div>
        <div>
          <input
            type="radio"
            id="unstructured"
            checked={!structured}
            onChange={() => {
              setStructured((c) => false);
              setGroupState(rowToGroup(rowState));
            }}
          />
          <label className="headings" htmlFor="unstructured">
            Text Editor
          </label>
        </div>

        {structured ? null : (
          <>
            <TextEditor
              data={groupState}
              handleDuplicateGroup={handleDuplicateGroup}
              handleChangeGroup={handleChangeGroup}
              handleDeleteGroup={handleDeleteGroup}
              handleChangeGroupCheckBox={handleChangeGroupCheckBox}
            />
            <button onClick={handleAddGroup} className="btn btn-primary">
              Add new group
            </button>
          </>
        )}
      </div>
      <br />

      <hr />
      <GitCommit
        state={structured ? rowState : grouptoRow(groupState)}
        gitState={gitState}
        setGitState={setGitState}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <React.Fragment>{JSON.stringify(rowState, null, 2)}</React.Fragment>  */}
    </>
  );
}
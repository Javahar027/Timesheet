import { useEffect, useState } from "react";
import "../App.css";
import Axios from "axios";
import UserNavbar from "../components/userNavBar";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "../../node_modules/react-calendar/dist/Calendar.css";
import Icon from "react-crud-icons";
// import "react-crud-icons/dist/css/react-crud-icons.css";
import Modal from 'react-modal';
import indiaHolidays from "../data/indiaHolidays.json"

function UserLandPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Current week
  let curr = new Date();
  let week = [];
  let prevWeek = [];
  let nextWeek = [];

  console.log(indiaHolidays[0].date);

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    let res = "";
    let date = day.slice(8, 10);
    let month = day.slice(5, 7) + "-";
    let year = day.slice(0, 4) + "-";
    res = year + month + date;
    week.push(res);
  }

  let startdate = week[0];
  let enddate = week[4];

  // Previous weeek

  Date.prototype.subtractDays = function (d) {
    this.setDate(this.getDate() - d);
    return this;
  };

  let a = new Date();
  a.subtractDays(6 + a.getDay());

  let prevCurr = a;

  for (let i = 1; i <= 7; i++) {
    let first = prevCurr.getDate() - prevCurr.getDay() + i;
    let day = new Date(prevCurr.setDate(first)).toISOString().slice(0, 10);
    let res = "";
    let date = day.slice(8, 10);
    let month = day.slice(5, 7) + "-";
    let year = day.slice(0, 4) + "-";
    res = year + month + date;
    prevWeek.push(res);
  }

  let prevStartDate = prevWeek[0];
  let prevEndDate = prevWeek[4];

  // nextweek

  Date.prototype.addDays = function (d) {
    this.setDate(this.getDate() + d);
    return this;
  };

  let b = new Date();

  b.addDays(7 - b.getDay());

  let nextCurr = b;

  for (let i = 1; i <= 7; i++) {
    let first = nextCurr.getDate() - nextCurr.getDay() + i;
    let day = new Date(nextCurr.setDate(first)).toISOString().slice(0, 10);
    let res = "";
    let date = day.slice(8, 10);
    let month = day.slice(5, 7) + "-";
    let year = day.slice(0, 4) + "-";
    res = year + month + date;
    nextWeek.push(res);
  }

  let nextStartDate = nextWeek[0];
  let nextEndDate = nextWeek[4];

  // console.log(week);

  const [data, setData] = useState([]);
  const [userCheck, setUserCheck] = useState(true);
  const [prevHead, setPrevHead] = useState(false);
  const [nextHead, setNextHead] = useState(false);

  const [currButton, setcurrButton] = useState(true);
  const [prevButton, setprevButton] = useState(false);
  const [nextButton, setnextButton] = useState(false);
  const [editButton, setEditButton] = useState(false);

  const [mondaywork, setMondayWork] = useState("");
  const [tuesdaywork, setTuesdayWork] = useState("");
  const [wednesdaywork, setWednesdayWork] = useState("");
  const [thursdaywork, setThursdayWork] = useState("");
  const [fridaywork, setFridayWork] = useState("");

  const [editIdRow, setEditIdRow] = useState(false);
  const [valId, setValId] = useState(false);
  const [cancelSave, setCancelSave] = useState(false);

  let updateId = [];

  useEffect(() => {
    if (user[0].type === "E") {
      setEditButton(false);
    } else if (user[0].type === "M") {
      setEditButton(true);
    }
    Axios.get(
      `http://localhost:3001/api/user/read?condition1=${user[0].managerid}&condition2=${startdate}&condition3=${enddate}`
    )
      .then((res) => {
        // console.log(res);
        if (res.data.length > 0) {
          // console.log("data fund");
          setData(res.data);
        } else {
          // console.log("no data");
        }
      })
      .catch((err) => console.log(err));

    Axios.get(
      `http://localhost:3001/api/userCheck/read?condition1=${user[0].managerid}&condition2=${startdate}&condition3=${user[0].id}`
    )
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          // console.log("Data found");
          setUserCheck(false);
        } else {
          // console.log("Data need to be entered");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNewData = () => {
    Axios.post("http://localhost:3001/api/userWeekdata", {
      gedid: user[0].gedid,
      name: user[0].name,
      managerid: user[0].managerid,
      managername: user[0].managername,
      team: user[0].team,
      mondaydate: week[0],
      tuesdaydate: week[1],
      wednesdaydate: week[2],
      thursdaydate: week[3],
      fridaydate: week[4],
      mondaywork: mondaywork,
      tuesdaywork: tuesdaywork,
      wednesdaywork: wednesdaywork,
      thursdaywork: thursdaywork,
      fridaywork: fridaywork,
    }).then((response) => {
      if (response) {
        setUserCheck(false);
        Axios.get(
          `http://localhost:3001/api/user/read?condition1=${user[0].managerid}&condition2=${startdate}&condition3=${enddate}`
        )
          .then((res) => {
            // console.log(res);
            if (res.data.length > 0) {
              // console.log("data fund");
              setData(res.data);
            } else {
              console.log("no data");
            }
          })
          .catch((err) => console.log(err));
      } else {
        console.log("failed");
      }
    });
  };

  const handleNewDataNext = () => {
    Axios.post("http://localhost:3001/api/userWeekdata", {
      gedid: user[0].gedid,
      name: user[0].name,
      managerid: user[0].managerid,
      managername: user[0].managername,
      team: user[0].team,
      mondaydate: nextWeek[0],
      tuesdaydate: nextWeek[1],
      wednesdaydate: nextWeek[2],
      thursdaydate: nextWeek[3],
      fridaydate: nextWeek[34],
      mondaywork: mondaywork,
      tuesdaywork: tuesdaywork,
      wednesdaywork: wednesdaywork,
      thursdaywork: thursdaywork,
      fridaywork: fridaywork,
    }).then((response) => {
      if (response) {
        setUserCheck(false);
        Axios.get(
          `http://localhost:3001/api/user/read?condition1=${user[0].managerid}&condition2=${nextStartDate}&condition3=${nextEndDate}`
        )
          .then((res) => {
            // console.log(res);
            if (res.data.length > 0) {
              // console.log("data fund");
              setData(res.data);
            } else {
              console.log("no data");
            }
          })
          .catch((err) => console.log(err));
      } else {
        console.log("failed");
      }
    });
  };

  const handlePreviousWeek = () => {
    setUserCheck(false);
    setPrevHead(true);

    setprevButton(true);
    setnextButton(false);
    setcurrButton(false);

    Axios.get(
      `http://localhost:3001/api/user/read?condition1=${user[0].managerid}&condition2=${prevStartDate}&condition3=${prevEndDate}`
    )
      .then((res) => {
        // console.log(res);
        if (res.data.length > 0) {
          setData(res.data);
        } else {
          console.log("no data");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCurrentWeek = () => {
    setprevButton(false);
    setnextButton(false);
    setcurrButton(true);
    window.location.reload();
  };

  const handleNextWeek = () => {
    setData([]);
    setUserCheck(true);
    setPrevHead(false);
    setNextHead(true);

    setprevButton(false);
    setnextButton(true);
    setcurrButton(false);

    Axios.get(
      `http://localhost:3001/api/user/read?condition1=${user[0].managerid}&condition2=${nextStartDate}&condition3=${nextEndDate}`
    )
      .then((res) => {
        // console.log(res);
        if (res.data.length > 0) {
          // console.log("data fund");
          setData(res.data);
          console.log(res.data);
        } else {
          console.log("no data");
        }
      })
      .catch((err) => console.log(err));

    Axios.get(
      `http://localhost:3001/api/userCheck/read?condition1=${user[0].managerid}&condition2=${nextStartDate}&condition3=${user[0].id}`
    )
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          console.log("Data found");
          setUserCheck(false);
        } else {
          // console.log("Data need to be entered");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEditButton = (e, id) => {
    console.log(id);
    setEditIdRow(true);
    setCancelSave(true);
    updateId.push(id);
    setValId(id);
  };

  const handleCancel = () => {
    setCancelSave(false);
    // setEditButton(false);
    setEditIdRow(false);
  };

  const handleSave = () => {
    setCancelSave(false);
    Axios.put("http://localhost:3001/api/update", {
      mondaywork: mondaywork,
      tuesdaywork: tuesdaywork,
      wednesdaywork: wednesdaywork,
      thursdaywork: thursdaywork,
      fridaywork: fridaywork,
      id:valId
    }).then((response) => {
      window.location.reload();
      // setData(
      //   data.map((val) => {
      //     return val.id == valId
      //       ? {
      //           gedid:val.gedid,
      //           name:val.name,
      //           managername:val.managername,
      //           team:val.team,
      //           mondaywork:val.mondaywork,
      //           tuesdaywork:val.tuesdaywork,
      //           wednesdaywork:val.wednesdaywork,
      //           thursdaywork:val.thursdaywork,
      //           mondaywork:val.mondaywork,
      //           fridaywork:val.fridaywork,
              
      //         }
      //       : val;
      //   })
      // );
    });
  };

  // console.log(editButton);



  return (
    <div>
      <UserNavbar />


      <div className="userContainer">
        <div className="topContainer">
          <div className="fontBlack">
            <h3>Welcome {user[0].name}, </h3>
          </div>

          {cancelSave ? (
            <div className="topButtonContainer">
              <div>
                {" "}
                <button onClick={handleCancel}>Cancel</button>
              </div>
              <div>
                {" "}
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="topButtonContainer">
          <div>
            <button
              className="buttonBottom"
              style={{
                backgroundColor: prevButton ? "rgba(14, 86, 193, 0.929)" : "",
                color: prevButton ? "white" : "",
              }}
              onClick={handlePreviousWeek}
            >
              Previous Week
            </button>
          </div>

          <div>
            <button
              className="buttonBottom"
              style={{
                backgroundColor: currButton ? "rgba(14, 86, 193, 0.929)" : "",
                color: currButton ? "white" : "",
              }}
              onClick={handleCurrentWeek}
            >
              Current Week
            </button>
          </div>

          <div>
            <button
              className="buttonBottom"
              style={{
                backgroundColor: nextButton ? "rgba(14, 86, 193, 0.929)" : "",
                color: nextButton ? "white" : "",
              }}
              onClick={handleNextWeek}
            >
              Next Week
            </button>
          </div>
        </div>

        <div className="tableContainer">
          <div className="table">
            <table className="styled-table">
              {prevHead ? (
                <thead>
                  <tr>
                    <th>GED_ID</th>
                    <th>NAME</th>
                    <th>MANAGER NAME</th>
                    <th>TEAM</th>

                    <th>{prevWeek[0]}</th>
                    <th>{prevWeek[1]}</th>
                    <th>{prevWeek[2]}</th>
                    <th>{prevWeek[3]}</th>
                    <th>{prevWeek[4]}</th>
                  </tr>
                </thead>
              ) : nextHead ? (
                <thead>
                  <tr>
                    {editButton ? <th></th> : null}
                    <th>GED_ID</th>
                    <th>NAME</th>
                    <th>MANAGER NAME</th>
                    <th>TEAM</th>

                    <th>{nextWeek[0]}</th>
                    <th>{nextWeek[1]}</th>
                    <th>{nextWeek[2]}</th>
                    <th>{nextWeek[3]}</th>
                    <th>{nextWeek[4]}</th>
                  </tr>
                </thead>
              ) : (
                <thead>
                  <tr>
                    {editButton ? <th></th> : null}
                    <th>GED_ID</th>
                    <th>NAME</th>
                    <th>MANAGER NAME</th>
                    <th>TEAM</th>

                    <th>{week[0]}</th>
                    <th>{week[1]}</th>
                    <th>{week[2]}</th>
                    <th>{week[3]}</th>
                    <th>{week[4]}</th>
                  </tr>
                </thead>
              )}

              <tbody>
                {userCheck ? (
                  <tr>
                    {editButton ? <th></th> : null}
                    <td>{user[0].id}</td>
                    <td>{user[0].name}</td>
                    <td>{user[0].managername}</td>
                    <td>{user[0].team}</td>
                    <td>
                      <select
                        required="true"
                        onChange={(e) => {
                          setMondayWork(e.target.value);
                        }}
                      >
                        <option name="" value="Select type"></option>
                        <option value="WFH">WFH</option>
                        <option value="ITEC">ITEC</option>
                        <option value="LEAVE">LEAVE</option>
                        <option value="HW">HW</option>
                        <option value="SHIFT">SHIFT</option>
                        <option value="C-OFF">C-OFF</option>
                        <option value="HOLIDAY">HOLIDAY</option>
                        <option value="OD">OD</option>
                      </select>
                    </td>
                    <td>
                      <select
                        required="true"
                        onChange={(e) => {
                          setTuesdayWork(e.target.value);
                        }}
                      >
                        <option name="" value="Select type"></option>
                        <option value="WFH">WFH</option>
                        <option value="ITEC">ITEC</option>
                        <option value="LEAVE">LEAVE</option>
                        <option value="HW">HW</option>
                        <option value="SHIFT">SHIFT</option>
                        <option value="C-OFF">C-OFF</option>
                        <option value="HOLIDAY">HOLIDAY</option>
                        <option value="OD">OD</option>
                      </select>
                    </td>
                    <td>
                      <select
                        required="true"
                        onChange={(e) => {
                          setWednesdayWork(e.target.value);
                        }}
                      >
                        <option name="" value="Select type"></option>
                        <option value="WFH">WFH</option>
                        <option value="ITEC">ITEC</option>
                        <option value="LEAVE">LEAVE</option>
                        <option value="HW">HW</option>
                        <option value="SHIFT">SHIFT</option>
                        <option value="C-OFF">C-OFF</option>
                        <option value="HOLIDAY">HOLIDAY</option>
                        <option value="OD">OD</option>
                      </select>
                    </td>
                    <td>
                      <select
                        required="true"
                        onChange={(e) => {
                          setThursdayWork(e.target.value);
                        }}
                      >
                        <option name="" value="Select type"></option>
                        <option value="WFH">WFH</option>
                        <option value="ITEC">ITEC</option>
                        <option value="LEAVE">LEAVE</option>
                        <option value="HW">HW</option>
                        <option value="SHIFT">SHIFT</option>
                        <option value="C-OFF">C-OFF</option>
                        <option value="HOLIDAY">HOLIDAY</option>
                        <option value="OD">OD</option>
                      </select>
                    </td>
                    <td>
                      <select
                        required="true"
                        onChange={(e) => {
                          setFridayWork(e.target.value);
                        }}
                      >
                        <option name="" value="Select type"></option>
                        <option value="WFH">WFH</option>
                        <option value="ITEC">ITEC</option>
                        <option value="LEAVE">LEAVE</option>
                        <option value="HW">HW</option>
                        <option value="SHIFT">SHIFT</option>
                        <option value="C-OFF">C-OFF</option>
                        <option value="HOLIDAY">HOLIDAY</option>
                        <option value="OD">OD</option>
                      </select>
                    </td>
                    {/* <td><button>Submit</button></td> */}
                  </tr>
                ) : null}

                {data.map((val) => (
                  <tr key={val.id}>
                    {/* {editButton && !prevHead ?  <td><input value="test" type="checkbox"  onChange={e => checkboxChange(e,val.id)}/> </td>:null} */}

                    {editButton && !prevHead ? (
                      <Icon
                        name="edit"
                        // tooltip="Edit"
                        theme="dark"
                        size="medium"
                        onClick={(e) => handleEditButton(e, val.id)}
                      />
                    ) : null}

                    <td>{val.gedid}</td>
                    <td>{val.name}</td>
                    <td>{user[0].managername}</td>
                    <td>{user[0].team}</td>

                    {editIdRow && val.id == valId ? (
                      <td>
                        <select
                          required="true"
                          onChange={(e) => {
                            setMondayWork(e.target.value);
                          }}
                        >
                          <option name="" value="Select type"></option>
                          <option value="WFH">WFH</option>
                          <option value="ITEC">ITEC</option>
                          <option value="LEAVE">LEAVE</option>
                          <option value="HW">HW</option>
                          <option value="SHIFT">SHIFT</option>
                          <option value="C-OFF">C-OFF</option>
                          <option value="HOLIDAY">HOLIDAY</option>
                          <option value="OD">OD</option>
                        </select>
                      </td>
                    ) : (
                      <td>{val.mondaywork}</td>
                    )}

                    {editIdRow && val.id == valId ? (
                      <td>
                        <select
                          required="true"
                          onChange={(e) => {
                            setTuesdayWork(e.target.value);
                          }}
                        >
                          <option name="" value="Select type"></option>
                          <option value="WFH">WFH</option>
                          <option value="ITEC">ITEC</option>
                          <option value="LEAVE">LEAVE</option>
                          <option value="HW">HW</option>
                          <option value="SHIFT">SHIFT</option>
                          <option value="C-OFF">C-OFF</option>
                          <option value="HOLIDAY">HOLIDAY</option>
                          <option value="OD">OD</option>
                        </select>
                      </td>
                    ) : (
                      <td>{val.tuesdaywork}</td>
                    )}

                    {editIdRow && val.id == valId ? (
                      <td>
                        <select
                          required="true"
                          onChange={(e) => {
                            setWednesdayWork(e.target.value);
                          }}
                        >
                          <option name="" value="Select type"></option>
                          <option value="WFH">WFH</option>
                          <option value="ITEC">ITEC</option>
                          <option value="LEAVE">LEAVE</option>
                          <option value="HW">HW</option>
                          <option value="SHIFT">SHIFT</option>
                          <option value="C-OFF">C-OFF</option>
                          <option value="HOLIDAY">HOLIDAY</option>
                          <option value="OD">OD</option>
                        </select>
                      </td>
                    ) : (
                      <td>{val.wednesdaywork}</td>
                    )}

                    {editIdRow && val.id == valId ? (
                      <td>
                        <select
                          required="true"
                          onChange={(e) => {
                            setThursdayWork(e.target.value);
                          }}
                        >
                          <option name="" value="Select type"></option>
                          <option value="WFH">WFH</option>
                          <option value="ITEC">ITEC</option>
                          <option value="LEAVE">LEAVE</option>
                          <option value="HW">HW</option>
                          <option value="SHIFT">SHIFT</option>
                          <option value="C-OFF">C-OFF</option>
                          <option value="HOLIDAY">HOLIDAY</option>
                          <option value="OD">OD</option>
                        </select>
                      </td>
                    ) : (
                      <td>{val.thursdaywork}</td>
                    )}

                    {editIdRow && val.id == valId ? (
                      <td>
                        <select
                          required="true"
                          onChange={(e) => {
                            setFridayWork(e.target.value);
                          }}
                        >
                          <option name="" value="Select type"></option>
                          <option value="WFH">WFH</option>
                          <option value="ITEC">ITEC</option>
                          <option value="LEAVE">LEAVE</option>
                          <option value="HW">HW</option>
                          <option value="SHIFT">SHIFT</option>
                          <option value="C-OFF">C-OFF</option>
                          <option value="HOLIDAY">HOLIDAY</option>
                          <option value="OD">OD</option>
                        </select>
                      </td>
                    ) : (
                      <td>{val.fridaywork}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {userCheck ? (
              <div className="submitButton">
                <button onClick={nextHead ? handleNewDataNext : handleNewData}>
                  Submit
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserLandPage;

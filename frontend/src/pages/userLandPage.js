import { useEffect, useState } from "react";
import "../App.css";
import API from "../service";
import UserNavbar from "../components/userNavBar";
import Calendar from "react-calendar";
import "../../node_modules/react-calendar/dist/Calendar.css";
import Icon from "react-crud-icons";
import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import indiaHolidays from "../data/indiaHolidays.json";
import { redirect } from "react-router-dom";

function UserLandPage() {
  const user = JSON.parse(localStorage.getItem("user"));

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

  const [mondayworkUpdate, setMondayWorkUpdate] = useState("");
  const [tuesdayworkUpdate, setTuesdayWorkUpdate] = useState("");
  const [wednesdayworkUpdate, setWednesdayWorkUpdate] = useState("");
  const [thursdayworkUpdate, setThursdayWorkUpdate] = useState("");
  const [fridayworkUpdate, setFridayWorkUpdate] = useState("");

  const [editIdRow, setEditIdRow] = useState(false);
  const [valId, setValId] = useState(false);
  const [cancelSave, setCancelSave] = useState(false);
  const [changeIcons, setChangeIcons] = useState(false);

  const [monthTable, setMonthTable] = useState(false);
  const [month, setMonth] = useState("");
  const [monthID, setMonthID] = useState("");

  let indiaHoliday = indiaHolidays;
  let indiaHolidayDate = [];

  for (let i = 0; i < indiaHoliday.length; i++) {
    indiaHolidayDate.push(indiaHoliday[i].date);
  }

  // Current week
  let curr = new Date();
  let week = [];
  let prevWeek = [];
  let nextWeek = [];

  let currMonth =  curr.getMonth();


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

  let updateId = [];

  let fullWeek = prevWeek.concat(week, nextWeek);

  let redHoliday = [];

  for (let i = 0; i < fullWeek.length; i++) {
    if (indiaHolidayDate.includes(fullWeek[i])) {
      redHoliday.push(fullWeek[i]);
    }
  }

  // console.log(redHoliday);

  const checkIndiaHoliday = (day) => {
    if (redHoliday.length > 0) {
      for (let i = 0; i < redHoliday.length; i++) {
        if (redHoliday[i] == day) {
          return true;
        }
      }
      return false;
    }
  };

  useEffect(() => {
    if (user.type === "E") {
      setEditButton(false);
    } else if (user.type === "M") {
      setEditButton(true);
    }
    API.get(
      `/api/user/read?condition1=${user.managerid}&condition2=${startdate}&condition3=${enddate}`
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

    API.get(
      `/api/userCheck/read?condition1=${user.managerid}&condition2=${startdate}&condition3=${user.id}`
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
    API.post("/api/userWeekdata", {
      gedid: user.gedid,
      name: user.name,
      managerid: user.managerid,
      managername: user.managername,
      team: user.team,
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
        API.get(
          `/api/user/read?condition1=${user.managerid}&condition2=${startdate}&condition3=${enddate}`
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
    API.post("/api/userWeekdata", {
      gedid: user.gedid,
      name: user.name,
      managerid: user.managerid,
      managername: user.managername,
      team: user.team,
      mondaydate: nextWeek[0],
      tuesdaydate: nextWeek[1],
      wednesdaydate: nextWeek[2],
      thursdaydate: nextWeek[3],
      fridaydate: nextWeek[4],
      mondaywork: mondaywork,
      tuesdaywork: tuesdaywork,
      wednesdaywork: wednesdaywork,
      thursdaywork: thursdaywork,
      fridaywork: fridaywork,
    }).then((response) => {
      if (response) {
        setUserCheck(false);
        API.get(
          `/api/user/read?condition1=${user.managerid}&condition2=${nextStartDate}&condition3=${nextEndDate}`
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

    API.get(
      `/api/user/read?condition1=${user.managerid}&condition2=${prevStartDate}&condition3=${prevEndDate}`
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
    window.location.reload();
  };

  const handleNextWeek = () => {
    setData([]);
    setUserCheck(true);
    setPrevHead(false);
    setNextHead(true);
    setnextButton(true);
    setprevButton(false);

    API.get(
      `/api/user/read?condition1=${user.managerid}&condition2=${nextStartDate}&condition3=${nextEndDate}`
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

    API.get(
      `/api/userCheck/read?condition1=${user.managerid}&condition2=${nextStartDate}&condition3=${user.id}`
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

  const handleEditButton = (
    e,
    id,
    mondaywork,
    tuesdaywork,
    wednesdaywork,
    thursdaywork,
    fridaywork
  ) => {
    setChangeIcons(true);
    setEditIdRow(true);
    setCancelSave(true);
    updateId.push(id);
    setValId(id);
    setMondayWorkUpdate(mondaywork);
    setTuesdayWorkUpdate(tuesdaywork);
    setWednesdayWorkUpdate(wednesdaywork);
    setThursdayWorkUpdate(thursdaywork);
    setFridayWorkUpdate(fridaywork);
  };

  const handleCancel = () => {
    // setCancelSave(false);
    setEditButton(true);
    setEditIdRow(true);
    setChangeIcons(false);
    setValId(false);
  };

  const handleSave = () => {
  
    setCancelSave(false);
    setEditIdRow(true);
    API.put("/api/update", {
      mondaywork: mondayworkUpdate,
      tuesdaywork: tuesdayworkUpdate,
      wednesdaywork: wednesdayworkUpdate,
      thursdaywork: thursdayworkUpdate,
      fridaywork: fridayworkUpdate,
      id: valId,
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

  const handleMonthData = () => {
    setMonthTable(!monthTable);
  };

  const handleMonthId = (e) =>{
    setMonthID(e.target.value);

  }

  const submitMonthData = () =>{

    API.get(
      `/api/monthData/read?condition1=${monthID}&condition2=${month}`
    )
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <UserNavbar />

      <div className="userContainer">
        <div className="topContainer">
          <div className="fontBlack">
            <h3>Welcome {user.name}, </h3>
          </div>

          {monthTable && editButton ? (
            <div>
              <button onClick={handleMonthData}>Timesheet Data</button>
            </div>
          ) : !monthTable && editButton ? (
            <div>
              <button onClick={handleMonthData}>Monthly Data</button>
            </div>
          ) : null}

          {/* {monthTable  ? <div>
          <button onClick={handleMonthData}>Timesheet Data</button> 
          </div>:<div>
          <button onClick={handleMonthData}>Monthly Data</button> 
          </div>} */}
        </div>

        {monthTable && editButton ? (
          <div>
            <div className="rowItems">
              <label className="fontBlue">ID</label>
              <input type="text" placeholder="Enter ID" required="true" name="id" value={monthID} onChange={handleMonthId}></input>

              <label className="fontBlue">Month</label>
              <select
                className="selectMonth"
                required="true"
                onChange={(e) => {
                  setMonth(e.target.value);
                }}
              >
                <option name="" value="Select type">
                  Select Month
                </option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>

              <button onClick={submitMonthData}>Submit</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="topButtonContainer">
              <div>
                <h2 className="fontHead">{nextButton}</h2>
                <Icon
                  name="arrow-right"
                  tooltip="Next Week"
                  theme="light"
                  size="medium"
                  onClick={handleNextWeek}
                  disabled={nextButton}
                />
              </div>

              <div>
                <button onClick={handleCurrentWeek} className="buttonCurrent">
                  Current Week
                </button>
              </div>

              <div>
                <h2 className="fontHead">{nextButton}</h2>
                <Icon
                  name="arrow-left"
                  tooltip="Previous Week"
                  theme="light"
                  size="medium"
                  onClick={handlePreviousWeek}
                  disabled={prevButton}
                />
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

                        <th
                          className={
                            checkIndiaHoliday(week[0]) && "indiaHolidays"
                          }
                        >
                          {week[0]}
                        </th>
                        <th
                          className={
                            checkIndiaHoliday(week[1]) && "indiaHolidays"
                          }
                        >
                          {week[1]}
                        </th>
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
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.managername}</td>
                        <td>{user.team}</td>
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
                        {editButton && !prevHead && val.id != valId ? (
                          <Icon
                            name="edit"
                            tooltip="Edit"
                            theme="light"
                            size="small"
                            onClick={(e) =>
                              handleEditButton(
                                e,
                                val.id,
                                val.mondaywork,
                                val.tuesdaywork,
                                val.wednesdaywork,
                                val.thursdaywork,
                                val.fridaywork
                              )
                            }
                          />
                        ) : changeIcons &&
                          val.id == valId &&
                          editIdRow &&
                          !prevHead ? (
                          <div>
                            <Icon
                              name="close"
                              tooltip="Close"
                              theme="light"
                              size="small"
                              onClick={handleCancel}
                            />

                            <Icon
                              name="check"
                              tooltip="Save"
                              theme="light"
                              size="small"
                              onClick={handleSave}
                            />
                          </div>
                        ) : null}

                        <td>{val.gedid}</td>
                        <td>{val.name}</td>
                        <td>{user.managername}</td>
                        <td>{user.team}</td>

                        {editIdRow && val.id == valId ? (
                          <td>
                            <select
                              required="true"
                              onChange={(e) => {
                                setMondayWorkUpdate(e.target.value);
                              }}
                            >
                              <option value="">{val.mondaywork}</option>
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
                                setTuesdayWorkUpdate(e.target.value);
                              }}
                            >
                              <option value="">{val.tuesdaywork}</option>
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
                                setWednesdayWorkUpdate(e.target.value);
                              }}
                            >
                              <option value="">{val.wednesdaywork}</option>
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
                                setThursdayWorkUpdate(e.target.value);
                              }}
                            >
                              <option value="">{val.thursdaywork}</option>
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
                                setFridayWorkUpdate(e.target.value);
                              }}
                            >
                              <option value="">{val.fridaywork}</option>
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
                    <button
                      onClick={nextHead ? handleNewDataNext : handleNewData}
                    >
                      Submit
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLandPage;

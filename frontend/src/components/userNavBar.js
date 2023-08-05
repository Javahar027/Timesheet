import React, { useRef, useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "../../node_modules/react-calendar/dist/Calendar.css";
import Modal from "react-modal";

import { useNavigate } from "react-router-dom";
import "../App.css";
import "../CalendarCustom.css";
import indiaHolidays from "../data/indiaHolidays.json";
import finlandHolidays from "../data/finlandHolidays.json";
import chinaHolidays from "../data/chinaHolidays.json";

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenHol, setIsOpenHol] = useState(false);

  const [holidayTable, setHolidayTable] = useState(false);
  const [country, setCountry] = useState("");
  const [tableData, setTableData] = useState();

  function openModal() {
    setIsOpen(true);
  }

  function openModalHol() {
    setIsOpenHol(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "white";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModalHol() {
    setIsOpenHol(false);
    setHolidayTable(false);
  }

  const handleCountry = () => {
    setHolidayTable(true);
    if (country == "India") {
      setTableData(indiaHolidays);
    } else if (country == "Finland") {
      setTableData(finlandHolidays);
    } else if (country == "China") {
      setTableData(chinaHolidays);
    }
  };

  return (
    <>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="header">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Calendar</h2>
            <button onClick={closeModal}>close</button>
          </div>

          <div>
            <h1>Calendar</h1>
            <Calendar
            // onChange={onChange}
            // value={value}
            />
          </div>
        </Modal>

        <Modal
          // className="holidayModel"
          isOpen={modalIsOpenHol}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalHol}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="header">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Holidays</h2>
            <button onClick={closeModalHol}>close</button>
          </div>

          <div className="holidayContainer">
            <label className="countryLabel">Select Country</label>
            <select
              className="countryDropDown"
              required="true"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              <option value="">Select a Country</option>
              <option value="India">India</option>
              <option value="Finland">Finland</option>
              <option value="China">China</option>
            </select>
            <button onClick={handleCountry}>Submit</button>

            {holidayTable ? (
              <div className="fixTableHead">
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Holiday Detail</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tableData.map((val) => (
                      <tr key={val.id}>
                        <td>{val.date}</td>
                        <td>{val.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </Modal>
      </div>
      <header className="header">
        <div>
          <h2>KONE</h2>
        </div>

        <div>
          <h2>TIMESHEET</h2>
        </div>

        <div>
          <button className="buttonNavBar" onClick={openModalHol}>
            Holiday
          </button>
          <button className="buttonNavBar" onClick={openModal}>
            Calender
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
    </>
  );
};

export default UserNavbar;

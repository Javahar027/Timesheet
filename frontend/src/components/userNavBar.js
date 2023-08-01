import React, { useRef, useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "../../node_modules/react-calendar/dist/Calendar.css";
import Modal from "react-modal";

import { useNavigate } from "react-router-dom";
import "../App.css";
import "../CalendarCustom.css";
import indiaHolidays from "../data/indiaHolidays.json"

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
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
  }

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

          <div>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Holiday Detail</th>
                  
                </tr>
              </thead>

              <tbody>

                {indiaHolidays.map((indiaHolidays) =>
                    <tr key={indiaHolidays.id}>
                      <td>{indiaHolidays.date}</td>
                      <td>{indiaHolidays.name}</td>


                    </tr>

                )}
                {/* <tr>
                  <td>{indiaHolidays[1].date}</td>
                  <td>{indiaHolidays[1].name}</td>
                </tr> */}
              </tbody>
            </table>
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
          <button onClick={openModalHol}>Holiday</button>
          <button onClick={openModal}>Calender</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
    </>
  );
};

export default UserNavbar;

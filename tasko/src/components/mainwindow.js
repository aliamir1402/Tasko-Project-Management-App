import React, { useState, useEffect } from "react";
import Select from "react-select";
import hollow from "../images/icons8-hollow-red-circle-96.png";
import searchlogo from "../images/search.svg";
import listlogo from "../images/list.svg";
import tablelogo from "../images/table.svg";
import filterlogo from "../images/filter.svg";
import settinglogo from "../images/settings.svg";
import sharelogo from "../images/share.svg";
import addlogo from "../images/add.svg";
import Accordion from "./accodation.js";
import CancelIcon from "../images/cancelicon.svg";

export default function Mainwindow() {
  var projectName = "Project ABCD";
  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState("");
  const [selectedVal, setselectedVal] = useState("-1");
  const [PriorityVal, setPriorityVal] = useState("-2");
  const [TaskSectionVal, setTaskSectionVal] = useState("-3");

  // Handler function for when the dropdown value changes
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handlePriorityVal = (event) => {
    setPriorityVal(event.target.value);
  };
  const handleTaskSectionVal = (event) => {
    setTaskSectionVal(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [Value, setValue] = useState([
    {
      id: "123456",
      title: "Complete Project Proposal",
      description: "Write and finalize the project proposal document.",
      priority: "High",
      startDate: "2024-02-15",
      deadline: "2024-02-20",
      section: "Planning",
      tags: ["project", "planning", "documentation"],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("http://localhost:5000/api/display");
        const data1 = await response1.json();
        await setValueAsync(data1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Date Construction

  // Fetch current date
  const currentDate = new Date();

  // Extract year, month, and day
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month starts from 0
  const day = currentDate.getDate();

  // Format month and day to have leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Concatenate year, month, and day to form the date string in YYYY-MM-DD format
  const dateString = `${year}-${formattedMonth}-${formattedDay}`;

  // Fetch current time
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format hours, minutes, and seconds to have leading zeros if needed
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Concatenate hours, minutes, and seconds to form the time string in HH:MM:SS format
  const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  const SendDataInsert = async () => {
    try {
      const DataInsert = {
        id: dateString + "-" + timeString,
        title: document.getElementById("task-title").value,
        description: document.getElementById("task-description").value,
        priority: PriorityVal,
        startDate: dateString,
        deadline: document.getElementById("task-deadline").value,
        section: TaskSectionVal,
        tags: document.getElementById("task-tags").value.split(","),
        status: "IP",
      };

      if (
        !document.getElementById("task-title").value ||
        !document.getElementById("task-description").value ||
        !PriorityVal ||
        !document.getElementById("task-deadline").value ||
        !TaskSectionVal ||
        document.getElementById("task-tags").value.split(",").length === 0
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DataInsert),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);
      alert("Data sent successfully!");
      togglePopup();
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Please try again.");
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const setValueAsync = (data) => {
    return new Promise((resolve, reject) => {
      setValue(data);
      resolve();
    });
  };

  // Render loading state if data is still being fetched
  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          justifyItems: "center",
          fontFamily: "monospace",
          fontSize: "30px",
        }}
      >
        Loading...
      </p>
    );
  }

  return (
    <>
      <div id="main" className="main App-item bor">
        <div className="bor App-container">
          <div className="bor App-container App-item title-main-margin">
            <div className="image-title bor">
              <img src={hollow} alt="icon" height={20} width={20} />
            </div>
            <div className="title-main-1">{projectName}</div>
          </div>
          <div className="title-main-2 bor App-item">
            <button
              className="App-container"
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
            >
              <span
                style={{ fontSize: "20px", margin: "2px", marginTop: "7px" }}
              >
                <img src={sharelogo} alt="share"></img>
              </span>
              <span
                style={{ fontSize: "15px", margin: "2px", marginTop: "7px" }}
              >
                Share
              </span>
            </button>
          </div>
          <div className="title-main-2 bor App-item">
            <button
              className="App-container"
              onClick={togglePopup}
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
            >
              <span
                style={{ fontSize: "20px", margin: "2px", marginTop: "7px" }}
              >
                <img src={addlogo} alt="add"></img>
              </span>
              <span
                style={{ fontSize: "15px", margin: "2px", marginTop: "7px" }}
              >
                New Task
              </span>
            </button>
          </div>
        </div>

        <hr className="space-2" />
        {/*------------------------------------------------------------------------------- */}
        <div className="bor App-container x">
          <div className="App-container y submain">
            <div className="App-container subsubsection">
              <div className="row2-div">
                <img src={listlogo} alt="LogoList"></img>
              </div>
              <div className="row2-div row2-div-name">List</div>
            </div>
            <div className="App-container subsubsection">
              <div className="row2-div">
                <img src={tablelogo} alt="LogoList"></img>
              </div>
              <div className="row2-div row2-div-name">Table</div>
            </div>
            <div className="App-container subsubsection">
              <div className="separator">..</div>
              <div className="row2-div">
                <img src={filterlogo} alt="TableLogo"></img>
              </div>
              <div className="row2-div row2-div-name">Filter</div>
            </div>
          </div>

          <div className="App-container y">
            <div className="row2-div">
              <input
                type="text"
                className="search-bar-2"
                placeholder="Search..."
              />
            </div>
            <div className="row2-div">
              <button className="search-button-2">
                <img src={searchlogo} alt="#" />
              </button>
            </div>
            <div className="row2-div">
              <button className="search-button-2">
                <img src={settinglogo} alt="#" />
              </button>
            </div>

            <div className="row2-div">
              <select
                className="dropdown"
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value="January">January</option>
                <option value="Feburary">Feburary</option>
                <option value="March">March</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-3"></div>
        {/**************************************************************************************** */}
        <Accordion></Accordion>
        {/*************************************************************************************** */}
      </div>

      {
        //***********POP-UP-ADD-BOX******** */
      }
      {isOpen && (
        <div id="popupContainer">
          <div className="popup">
            <div className="popup-inner">
              <div className="section-0-size m-12">
                <div className="App-container items-center">
                  <div className="add-section-1-title">Add Task</div>
                  <div>
                    <button
                      className="add-section-1-button"
                      onClick={togglePopup}
                    >
                      <img src={CancelIcon} alt="CancelIcon" />
                    </button>
                  </div>
                </div>

                <div className="App-container">
                  <div className="App-item">
                    <div className="add-section-2-title">Task Title</div>
                    <div>
                      <input
                        className="add-section-2-input"
                        type="text"
                        name=""
                        id="task-title"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="App-container">
                  <div className="mr-8">
                    <div className="add-section-3-title">Description</div>
                    <div>
                      <textarea
                        className="add-section-3-input"
                        type="text"
                        name=""
                        id="task-description"
                      />
                    </div>
                  </div>

                  <div className="App-container">
                    <div>
                      <div>
                        <div className="add-section-3-title">Priority</div>
                        <div className="add-section-2-div">
                          <select
                            className="add-section-2-dropdown"
                            id="task-priority"
                            value={PriorityVal}
                            onChange={handlePriorityVal}
                            required
                          >
                            <option value="" selected>
                              Choose Option
                            </option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className="add-section-3-title">Deadline</div>
                        <div className="add-section-2-div">
                          <input
                            type="date"
                            className="datebox"
                            id="task-deadline"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="add-section-3-title">Section</div>
                      <div className="add-section-2-div">
                        <select
                          class="add-section-2-dropdown"
                          id="task-section"
                          value={TaskSectionVal}
                          onChange={handleTaskSectionVal}
                          required
                        >
                          <option value="" selected>
                            Choose Option
                          </option>
                          <option value="Section-1">Section-1</option>
                          <option value="Section-2">Section-2</option>
                          <option value="Section-3">Section-3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="add-section-3-title">Tags</div>
                    <div>
                      <input
                        className="add-section-2-input"
                        type="text"
                        id="task-tags"
                        placeholder="Input Format e.g. tag-1, tag2, tag3"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="App-container flex justify-end">
                  <div>
                    <button
                      className="add-section-1-button-cancel"
                      onClick={togglePopup}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      className="add-section-1-button-save"
                      onClick={SendDataInsert}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        //********************************* */
      }
    </>
  );
}

import React, { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  space,
} from "@chakra-ui/react";
import lowFlag from "../images/low-flag.png";
import mediumFlag from "../images/medium-flag.png";
import highFlag from "../images/high-flag.png";
import CancelIcon from "../images/cancelicon.svg";
import DeleteIcon from "../images/delete.svg";
import UpdateIcon from "../images/update.svg";
import ghostPreLoader from "../images/Ghost.gif";

export default function Accodation() {
  const [isRowVisible, setRowVisible] = useState(true);
  const [updateisOpen, setupdateIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedVal, setselectedVal] = useState("");
  const [UpdatePriorityVal, setUpdatePriorityVal] = useState("");
  const [TaskSectionVal, setTaskSectionVal] = useState("");
  const [SectionCountValue, setSectionCountValue] = useState([]);
  const [TaskPerSection, setTaskPerSection] = useState([]);
  const [taskNumberLength, setTaskNumberLength] = useState([]);

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

  useEffect(() => {
    dataFetchFunc();
  }, []);

  const handlePriorityVal = (event) => {
    setUpdatePriorityVal(event.target.value);
  };

  const handleTaskSectionVal = (event) => {
    setTaskSectionVal(event.target.value);
  };

  const UpdateData = async () => {
    try {
      const DataInsert = {
        id: dateString + "-" + timeString,
        title: document.getElementById("task-title").value,
        description: document.getElementById("task-description").value,
        priority: UpdatePriorityVal,
        startDate: dateString,
        deadline: document.getElementById("task-deadline").value,
        section: TaskSectionVal,
        tags: document.getElementById("task-tags").value.split(","),
        status: "IP",
      };

      if (
        !document.getElementById("task-title").value ||
        !document.getElementById("task-description").value ||
        !UpdatePriorityVal ||
        !document.getElementById("task-deadline").value ||
        !TaskSectionVal ||
        document.getElementById("task-tags").value.split(",").length === 0
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DataInsert),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);
      alert("Data sent successfully!");
      updatetogglePopup();
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Please try again.");
    }
  };

  const DeleteData = async () => {
    try {
      const DataInsert = {
        id: dateString + "-" + timeString,
        title: document.getElementById("task-title").value,
        description: document.getElementById("task-description").value,
        priority: UpdatePriorityVal,
        startDate: dateString,
        deadline: document.getElementById("task-deadline").value,
        section: TaskSectionVal,
        tags: document.getElementById("task-tags").value.split(","),
        status: "IP",
      };

      if (
        !document.getElementById("task-title").value ||
        !document.getElementById("task-description").value ||
        !UpdatePriorityVal ||
        !document.getElementById("task-deadline").value ||
        !TaskSectionVal ||
        document.getElementById("task-tags").value.split(",").length === 0
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DataInsert),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);
      alert("Data sent successfully!");
      updatetogglePopup();
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Please try again.");
    }
  };

  var dataFetchFunc = () => {
    const fetchDataSection = async () => {
      try {
        const response2 = await fetch(
          "http://localhost:5000/api/section-count"
        );
        const data2 = await response2.json();
        await setSectionCountValueAsync(data2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchTaskPerSection = async () => {
      try {
        const response3 = await fetch(
          "http://localhost:5000/api/TaskPerSection"
        );
        const data3 = await response3.json();
        await setTaskPerSectionAsync(data3);
        console.log("Data: " + TaskPerSection.title);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchDataSection();
    fetchTaskPerSection();
  };

  const setSectionCountValueAsync = (data) => {
    return new Promise((resolve, reject) => {
      setSectionCountValue(data);
      resolve();
    });
  };

  const setTaskPerSectionAsync = (data) => {
    return new Promise((resolve, reject) => {
      setTaskPerSection(data);
      resolve();
    });
  };

  const handleDropdown = (event) => {
    setselectedVal(event.target.value);
  };

  const handleButtonClick = () => {
    setRowVisible(false);
  };

  const updatetogglePopup = () => {
    setupdateIsOpen(!updateisOpen);
  };

  // Check if the checkbox is checked
  var checkedboxcheck = (idd, classs) => {
    var checkbox = document.getElementById(idd);
    var task_row = document.getElementsByClassName(classs);
    if (checkbox.checked) {
      console.log("Entered");
      for (let i = 0; i < task_row.length; i++) {
        task_row[i].style.textDecoration = "line-through";
        task_row[i].style.color = "#888888";
      }
    } else {
      console.log("Entered1");
      for (let i = 0; i < task_row.length; i++) {
        task_row[i].style.textDecoration = "none";
        task_row[i].style.color = "black";
      }
    }
  };

  if (loading) {
    const x = [".", ".", "."];
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          textAlign: "center", // Center any text content
          fontFamily: "monospace",
          fontSize: "30px",
        }}
      >
        <img src={ghostPreLoader} alt="Loader" />
      </div>
    );
  }

  return (
    <>
      <div className="">
        <Accordion defaultIndex={[0]} allowMultiple>
          <div id="itemss">
            {SectionCountValue.map((item, index) => (
              <>
                <AccordionItem className="acc-item">
                  <h2>
                    <AccordionButton className="z">
                      <div>
                        <Box as="span" flex="1" textAlign="left">
                          <span className="pl-3 text-lg">
                            {SectionCountValue[index]}
                          </span>
                          <span
                            id={`num-` + (index + 1)}
                            className="pl-3 text-gray-600 font-mono text-md"
                          >
                            ({TaskPerSection[index].length})
                          </span>
                        </Box>
                      </div>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} className="p-2 text-base">
                    <div className="bor">
                      <div className="flex text-sm">
                        <div className="inline-flex items-center mr-2">
                          <input
                            type=""
                            id="checkboxButton"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded"
                          />
                        </div>
                        <div className="p-2 width-row">Name</div>
                        <div className="p-2 width-row-des">Description</div>
                        <div className="p-2 width-row-subs">Start Date</div>
                        <div className="p-2 width-row-subs">Due Date</div>
                        <div className="p-2 width-row-subs">Time Left</div>
                        <div className="p-2 width-row-subs">Priority</div>
                        <div className="p-2 pl-3 pr-3">
                          <button>
                            <img src={UpdateIcon} alt="updateicon" />
                          </button>
                        </div>
                        <div className="p-2 pl-3 pr-3">
                          <button>
                            <img src={DeleteIcon} alt="deleteicon" />
                          </button>
                        </div>
                      </div>
                      <hr />
                      {TaskPerSection[index].map((item, index_task) => (
                        <div class="bor flex text-sm">
                          <div class="inline-flex items-center mr-2">
                            <input
                              type="checkbox"
                              id={"task-row-" + (index + 1) + (index_task + 1)}
                              className="form-checkbox h-5 w-5 text-blue-600 rounded"
                              onChange={checkedboxcheck.bind(
                                null,
                                "task-row-" + (index + 1) + (index_task + 1),
                                "x-" + (index + 1) + (index_task + 1)
                              )}
                            />{" "}
                          </div>{" "}
                          <div
                            class={
                              "x-" +
                              (index + 1) +
                              (index_task + 1) +
                              " width-row p-2"
                            }
                          >
                            {TaskPerSection[index][index_task].title}{" "}
                          </div>{" "}
                          <div
                            class={
                              "x-" +
                              (index + 1) +
                              (index_task + 1) +
                              " width-row-des p-2"
                            }
                          >
                            {TaskPerSection[index][index_task].description}
                          </div>{" "}
                          <div
                            class={
                              "x-" +
                              (index + 1) +
                              (index_task + 1) +
                              " width-row-subs p-2"
                            }
                          >
                            {TaskPerSection[index][index_task].startDate}
                          </div>{" "}
                          <div
                            class={
                              "x-" +
                              (index + 1) +
                              (index_task + 1) +
                              " width-row-subs p-2"
                            }
                          >
                            {TaskPerSection[index][index_task].deadline}
                          </div>{" "}
                          <div
                            class={
                              "x-" +
                              (index + 1) +
                              (index_task + 1) +
                              " width-row-subs p-2"
                            }
                          >
                            {new Date(
                              TaskPerSection[index][index_task].deadline
                            ) -
                              new Date() >
                            0
                              ? Math.floor(
                                  (new Date(
                                    TaskPerSection[index][index_task].deadline
                                  ) -
                                    new Date()) /
                                    (1000 * 60 * 60 * 24)
                                ) + " Days"
                              : "Time Passed"}
                          </div>{" "}
                          <div
                            class={
                              "x-" +
                              (index + 1) +
                              (index_task + 1) +
                              " width-row-subs p-2"
                            }
                          >
                            {TaskPerSection[index][index_task].priority}
                          </div>{" "}
                          <div class="p-2 pl-3 pr-3">
                            <button onClick={updatetogglePopup}>
                              <img src={UpdateIcon} alt="" />
                            </button>{" "}
                          </div>{" "}
                          <div class="p-2 pl-3 pr-3">
                            <button>
                              <img src={DeleteIcon} alt="" />
                            </button>{" "}
                          </div>{" "}
                        </div>
                      ))}
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </>
            ))}
          </div>
          <hr />
        </Accordion>
      </div>
      {
        //***********POP-UP-UPDATE-BOX******** */
      }
      {updateisOpen && (
        <div id="popupContainer">
          <div className="popup">
            <div className="popup-inner">
              <div className="section-0-size m-12">
                <div className="App-container items-center">
                  <div className="add-section-1-title">Update Task</div>
                  <div>
                    <button
                      className="add-section-1-button"
                      onClick={updatetogglePopup}
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
                            value={UpdatePriorityVal}
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
                      onClick={updatetogglePopup}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      className="add-section-1-button-save"
                      onClick={UpdateData}
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

import React, { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import lowFlag from "../images/low-flag.png";
import mediumFlag from "../images/medium-flag.png";
import highFlag from "../images/high-flag.png";
import CancelIcon from "../images/cancelicon.svg";
import DeleteIcon from "../images/delete.svg";
import UpdateIcon from "../images/update.svg";

export default function Accodation() {
  var count = 2;

  const [isRowVisible, setRowVisible] = useState(true);
  const [updateisOpen, setupdateIsOpen] = useState(false);
  const [loading, setLoading] = useState("");
  const [selectedVal, setselectedVal] = useState("");
  const [UpdatePriorityVal, setUpdatePriorityVal] = useState("");
  const [UpdateDeadlineVal, setUpdateDeadlineVal] = useState("");
  const [UpdateSectionVal, setUpdateSectionVal] = useState("");
  const [SectionCountValue, setSectionCountValue] = useState([]);
  const [TaskPerSection, setTaskPerSection] = useState([]);
  const [taskNumberLength, setTaskNumberLength] = useState([]);

  useEffect(() => {
    dataFetchFunc();
  }, []);

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
      } finally {
        setLoading(false);
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
        setLoading(false);
      }
    };
    fetchDataSection();
    fetchTaskPerSection();
    var x = [];
    for (let i = 0; i < SectionCountValue.length; i++) {
      x.push(TaskPerSection[i].length);
    }
    setTaskNumberLength(x);
    taskrepeation();
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

  var taskrepeation = () => {
    for (let j = 0; j < SectionCountValue.length; j++) {
      var section = document.getElementById("section-" + (j + 1));
      var num = document.getElementById("num-" + (j + 1));
      section.innerHTML = "";
      num.innerHTML = "<span>(" + taskNumberLength[j] + ")</span>";
      // Task-specific divs creation
      for (let i = 0; i < TaskPerSection[j].length; i++) {
        // Define the two dates
        const deadline = new Date(TaskPerSection[j][i].deadline); // Replace with your first date
        const startdate = new Date(TaskPerSection[j][i].startDate); // Current date and time

        // Find the difference in milliseconds
        const differenceInMilliseconds =
          (deadline - startdate) / 86400000 > 0
            ? (deadline - startdate) / 86400000 + " Days"
            : "Time Passed";

        // Create div element with class bor, flex, and text-sm
        var div = document.createElement("div");
        div.className = "bor flex text-sm";

        // Create div element with class inline-flex and items-center
        var innerDiv1 = document.createElement("div");
        innerDiv1.className = "inline-flex items-center mr-2";

        // Create input element with specified attributes
        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = "task-row-" + (j + 1) + "-" + (i + 1);
        input.addEventListener(
          "change",
          checkedboxcheck.bind(
            null,
            "task-row-" + (j + 1) + "-" + (i + 1),
            "x-" + (i + 1) + (j + 1)
          )
        );
        input.className = "form-checkbox h-5 w-5 text-blue-600 rounded";

        // Append input to innerDiv1
        innerDiv1.appendChild(input);

        // Append innerDiv1 to div
        div.appendChild(innerDiv1);

        // Create and append other div elements similarly
        var nameDiv = document.createElement("div");
        nameDiv.className = "x-" + (i + 1) + (j + 1) + " p-2 width-row";
        nameDiv.textContent = TaskPerSection[j][i].title;
        div.appendChild(nameDiv);

        // Create and append other div elements similarly
        var desdiv = document.createElement("div");
        desdiv.className = "x-" + (i + 1) + (j + 1) + " p-2 width-row-des";
        desdiv.textContent = TaskPerSection[j][i].description;
        div.appendChild(desdiv);

        var startDateDiv = document.createElement("div");
        startDateDiv.className =
          "x-" + (i + 1) + (j + 1) + " p-2 width-row-subs";
        startDateDiv.textContent = TaskPerSection[j][i].startDate;
        div.appendChild(startDateDiv);

        var dueDateDiv = document.createElement("div");
        dueDateDiv.className = "x-" + (i + 1) + (j + 1) + " p-2 width-row-subs";
        dueDateDiv.textContent = TaskPerSection[j][i].deadline;
        div.appendChild(dueDateDiv);

        var timeLeftDiv = document.createElement("div");
        timeLeftDiv.className =
          "x-" + (i + 1) + (j + 1) + " p-2 width-row-subs";
        timeLeftDiv.textContent = differenceInMilliseconds;
        div.appendChild(timeLeftDiv);

        var priorityDiv = document.createElement("div");
        priorityDiv.className =
          "x-" + (i + 1) + (j + 1) + " p-2 width-row-subs";
        priorityDiv.textContent = TaskPerSection[j][i].priority;
        div.appendChild(priorityDiv);

        var div1 = document.createElement("div");
        div1.className = "p-2 pl-3 pr-3";

        // Create the button for the first div
        var button1 = document.createElement("button");

        // Create the image for the first button
        var img1 = document.createElement("img");
        img1.src = UpdateIcon; // Assuming UpdateIcon is a variable holding the image source
        img1.alt = "";

        // Append the image to the button
        button1.appendChild(img1);

        // Append the button to the first div
        div1.appendChild(button1);

        // Create the second div
        var div2 = document.createElement("div");
        div2.className = "p-2 pl-3 pr-3";

        // Create the button for the second div
        var button2 = document.createElement("button");

        // Create the image for the second button
        var img2 = document.createElement("img");
        img2.src = DeleteIcon; // Assuming DeleteIcon is a variable holding the image source
        img2.alt = "";

        // Append the image to the button
        button2.appendChild(img2);

        // Append the button to the second div
        div2.appendChild(button2);

        div.appendChild(div1);
        div.appendChild(div2);

        // Append the newly created div to section
        section.appendChild(div);
      }
    }
  };
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
                          ></span>
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

                      <div id={`section-` + (index + 1)}></div>
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
                        id=""
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
                        id=""
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
                            value={UpdatePriorityVal}
                            onChange={handleDropdown}
                          >
                            <option value="" disabled selected>
                              Choose an option
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
                          <input type="date" value={UpdateDeadlineVal} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="add-section-3-title">Section</div>
                      <div className="add-section-2-div">
                        <select
                          className="add-section-2-dropdown"
                          value={UpdateSectionVal}
                          onChange={handleDropdown}
                        >
                          options=
                          {[
                            { value: "option1", label: "January" },
                            { value: "option2", label: "February" },
                            { value: "option3", label: "March" },
                          ]}
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
                        name=""
                        id=""
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
                      onClick={updatetogglePopup}
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

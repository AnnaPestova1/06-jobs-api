import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showData } from "./data.js";

let addEditDiv = null;
let event = null;
let name = null;
let date = null;
let description = null;
let addingData = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-data");
  event = document.getElementById("event");
  name = document.getElementById("name");
  date = document.getElementById("date");
  description = document.getElementById("description");
  addingData = document.getElementById("adding-data");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async e => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingData) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/data";
        if (addingData.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/data/${addEditDiv.dataset.id}`;
        }
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              event: event.value,
              name: name.value,
              date: date.value,
              description: description.value
            })
          });

          const responseData = await response.json();
          console.log(responseData);
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The data entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The data entry was created.";
            }
            event.value = "";
            name.value = "";
            date.value = "";
            description.value = "";
            showData();
          } else {
            message.textContent = responseData.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showData();
      }
    }
  });
};

export const showAddEdit = async (dataId, buttonValue) => {
  console.log(dataId, buttonValue);
  let method = "GET";
  if (!dataId) {
    event.value = "";
    name.value = "";
    date.value = "";
    description.value = "";
    addingData.textContent = "add";
    message.textContent = "";
    setDiv(addEditDiv);
  } else {
    enableInput(false);
    if (buttonValue === "deleteButton") {
      method = "DELETE";
    }
    try {
      const response = await fetch(`/api/v1/data/${dataId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const responseData = await response.json();
      console.log(responseData);
      if (method === "DELETE" && response.status === 200) {
        message.textContent =
          "The information about sky event was successfully deleted";
        showData();
      }
      if (response.status === 200) {
        let dateValue = "";
        if (responseData.data.date !== null) {
          dateValue = responseData.data.date.slice(0, 10);
        }

        event.value = responseData.data.event;
        name.value = responseData.data.name;
        date.value = dateValue;
        description.value = responseData.data.description;
        addingData.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = dataId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The data entry was not found";
        showData();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showData();
    }

    enableInput(true);
  }
};

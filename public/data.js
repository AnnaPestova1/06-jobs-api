import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let dataDiv = null;
let dataTable = null;
let dataTableHeader = null;

export const handleData = () => {
  dataDiv = document.getElementById("data");
  const logoff = document.getElementById("logoff");
  const addData = document.getElementById("add-data");
  dataTable = document.getElementById("data-table");
  dataTableHeader = document.getElementById("data-table-header");

  dataDiv.addEventListener("click", e => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      console.log(e.target.classList);
      if (e.target === addData) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        setToken(null);

        message.textContent = "You have been logged off.";

        dataTable.replaceChildren([dataTableHeader]);

        showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id, e.target.classList.value);
      } else if (e.target.classList.contains("deleteButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id, e.target.classList.value);
      }
    }
  });
};

export const showData = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const responseData = await response.json();
    console.log(responseData);
    let children = [dataTableHeader];
    if (response.status === 200) {
      if (responseData.count === 0) {
        dataTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < responseData.data.length; i++) {
          let rowEntry = document.createElement("tr");
          let showDate = "";
          if (responseData.data[i].date !== null) {
            showDate = responseData.data[i].date.slice(0, 10);
          }

          let editButton = `<td><button type="button" class="editButton" data-id=${responseData.data[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${responseData.data[i]._id}>delete</button></td>`;
          let rowHTML = `
            <td>${responseData.data[i].event}</td>
            <td>${responseData.data[i].name}</td>
            <td>${showDate}</td>
            <td>${responseData.data[i].description}</td>
            <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        dataTable.replaceChildren(...children);
      }
    } else {
      message.textContent = responseData.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(dataDiv);
};

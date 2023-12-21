import {
  inputEnabled,
  setDiv,
  token,
  message,
  enableInput,
  setToken
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showData } from "./data.js";

let loginDiv = null;
let email = null;
let password = null;

export const handleLogin = () => {
  loginDiv = document.getElementById("logon-div");
  email = document.getElementById("email");
  password = document.getElementById("password");
  const logonButton = document.getElementById("logon-button");
  const logonCancel = document.getElementById("logon-cancel");

  loginDiv.addEventListener("click", async e => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === logonButton) {
        enableInput(false);

        try {
          const response = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value
            })
          });

          const responseData = await response.json();
          console.log(responseData);
          if (response.status === 200) {
            message.textContent = `Logon successful.  Welcome ${responseData.user.name}`;
            setToken(responseData.token);

            email.value = "";
            password.value = "";

            showData();
          } else {
            message.textContent = responseData.msg;
          }
        } catch (err) {
          console.error(err);
          message.textContent = "A communications error occurred.";
        }

        enableInput(true);
      } else if (e.target === logonCancel) {
        email.value = "";
        password.value = "";
        showLoginRegister();
      }
    }
  });
};

export const showLogin = () => {
  email.value = null;
  password.value = null;
  setDiv(loginDiv);
};

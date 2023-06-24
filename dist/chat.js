const socket = io();

let message = document.getElementById("message");
let username = document.getElementById("username");
let buttonSend = document.getElementById("button-send");
let buttonShow = document.getElementById("button-show");
let userOnline = document.getElementById("userOnline");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

const usernameContainer = document.getElementById("username-container");
const chatContainer = document.getElementById("chat-container");

const showChatContainer = (e) => {
  e.preventDefault();
  usernameContainer.classList.add("hidden");
  chatContainer.classList.remove("hidden");
  document.removeEventListener("keydown", showChatContainerOnEnter);
};

const showChatContainerOnEnter = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    usernameContainer.classList.add("hidden");
    chatContainer.classList.remove("hidden");
    document.removeEventListener("keydown", showChatContainerOnEnter);
  }
};

const showUserOnline = () => {
  userOnline.innerHTML = `<span class="bg-black rounded-full p-2">Online</span>`
};
showUserOnline();
username.addEventListener("input", showUserOnline);

const sendMessage = (e) => {
  e.preventDefault();
  socket.emit("message", {
    message: message.value,
    username: username.value,
  });
  message.value = "";
};

const showChatContainerOnClick = (e) => {
  e.preventDefault();
  usernameContainer.classList.add("hidden");
  chatContainer.classList.remove("hidden");
};

buttonSend.addEventListener("click", sendMessage);
buttonShow.addEventListener("click", showChatContainerOnClick);

message.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage(e);
  } else {
    socket.emit("typing", { username: username.value });
  }
});

socket.on("message", (data) => {
  actions.innerHTML = "";
  let messageClass =
    data.username === username.value
      ? "text-left text-lime-400"
      : "text-right text-rose-400";
  let messageAlignment =
    data.username === username.value ? "table" : "table ml-auto";
  output.innerHTML += `<p class="${messageClass}"><span class="${messageAlignment}">${data.username}: ${data.message}</span></p>`;

  output.scrollTop = output.scrollHeight;
});

socket.on("typing", (data) => {
  actions.innerHTML = `<p class="text-cyan-500">${data.username} is typing a message</p>`;
});

document.addEventListener("keydown", showChatContainerOnEnter);

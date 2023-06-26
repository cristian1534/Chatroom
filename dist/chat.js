const socket = io();

let message = document.getElementById("message");
let username = document.getElementById("username");
let buttonSend = document.getElementById("button-send");
let buttonShow = document.getElementById("button-show");
let userOnline = document.getElementById("userOnline");
let output = document.getElementById("output");
let actions = document.getElementById("actions");
let count = document.getElementById("count");


const usernameContainer = document.getElementById("username-container");
const chatContainer = document.getElementById("chat-container");

let hasJoined = false; 

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
  userOnline.innerHTML = `<span>Users online</span>`;
};
showUserOnline();
username.addEventListener("input", showUserOnline);

const sendMessage = (e) => {
  e.preventDefault();
  socket.emit("message", {
    message: message.value,
    username: username.value,
  });
  if (!hasJoined) {
    socket.emit("joined", { username: username.value });
    hasJoined = true;
  }
  message.value = "";
};

const showChatContainerOnClick = (e) => {
  e.preventDefault();
  usernameContainer.classList.add("hidden");
  chatContainer.classList.remove("hidden");
};

buttonSend.addEventListener("click", sendMessage);
buttonShow.addEventListener("click", showChatContainerOnClick);

message.addEventListener("keydown", (e) => {
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
      : "text-right text-rose-300";
  let messageAlignment =
    data.username === username.value ? "table" : "table ml-auto";
  output.innerHTML += `<p class="${messageClass}"><span class="${messageAlignment} bg-slate-600 rounded-md p-2 my-1">${data.username}:<br/>${data.message}</span></p>`;
  output.scrollTop = output.scrollHeight;
});

socket.on("joined", (data) => {
  actions.innerHTML += `<p class="text-yellow-500">${data.username} has joined our chat!...</p>`;
});

socket.on("userDisconnected", (username) => {
  actions.innerHTML += `<p class="text-red-500">${username} has left...</p>`;
});

socket.on("typing", (data) => {
  actions.innerHTML = `<p class="text-cyan-500">${data.username} is typing...</p>`;
});

socket.on("count", (data) => {
 count.innerHTML = data;
})

document.addEventListener("keydown", showChatContainerOnEnter);

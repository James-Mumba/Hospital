var chat = document.getElementById("chat");
var chat2 = document.getElementById("chat2");
var chat3 = document.getElementById("chat3");
var chat4 = document.getElementById("chat4");
var chat5 = document.getElementById("chat5");

var cloze = document.getElementById("cloze");
var messanger = document.getElementById("messanger");

chat.onclick = function () {
  messanger.classList.remove("hidden");
};
chat2.onclick = function () {
  messanger.classList.remove("hidden");
};
chat3.onclick = function () {
  messanger.classList.remove("hidden");
};
chat4.onclick = function () {
  messanger.classList.remove("hidden");
};
chat5.onclick = function () {
  messanger.classList.remove("hidden");
};

cloze.onclick = function () {
  messanger.classList.add("hidden");
};

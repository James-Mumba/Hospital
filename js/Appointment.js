var display1 = document.getElementById("display1");
var display2 = document.getElementById("display2");
var show = document.getElementById("show");
var click = document.getElementById("click");

show.onclick = function () {
  display1.classList.remove("names");
  display2.classList.add("names");
};

click.onclick = function () {
  display2.classList.remove("names");
  display1.classList.add("names");
};

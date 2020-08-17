// tagline code
var ar = [
  "I am an epic gamer",
  "Just a really cool dude",
  "I will make your software (probably)",
  "Give me your money",
  "Wagga Whu!",
  "Please text me I need friends",
];
document.getElementById("tagline").innerHTML =
  ar[Math.floor(Math.random() * ar.length)];

// Modal Code (Definitly not ripped off of W3Schools)
var modal = document.getElementById("discordModal");
var btn = document.getElementById("discordModal_trigger");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// tagline code
var ar = ["I am an epic gamer", "Just a really cool dude", "I will make your software (probably)", "Give me your money", "Wagga Whu!", "Please text me I need friends"];
document.getElementById("tagline").innerHTML = ar[Math.floor(Math.random() * ar.length)];
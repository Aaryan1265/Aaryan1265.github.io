const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");

menu.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

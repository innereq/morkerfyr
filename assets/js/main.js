import * as DarkModeToggle from "dark-mode-toggle";

const darkModeToggle = document.querySelector("dark-mode-toggle");
const body = document.body;

// Set or remove the `dark` class the first time.
darkModeToggle.mode === "dark"
  ? body.classList.add("dark")
  : body.classList.remove("dark");

// Listen for toggle changes (which includes `prefers-color-scheme` changes)
// and toggle the `dark` class accordingly.
darkModeToggle.addEventListener("colorschemechange", () => {
  body.classList.toggle("dark", darkModeToggle.mode === "dark");
});

// Remember the user's last color scheme choice
darkModeToggle.setAttribute("permanent", "");

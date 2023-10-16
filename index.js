const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");
const form = document.getElementById("form");
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  resetUI();
  const now = new Date();
  let valid = true;
  if (dayInput.value === "") {
    setErrorState(dayInput, "This field is required.");
    valid = false;
  } else if (
    isNaN(dayInput.value) ||
    +dayInput.value < 1 ||
    +dayInput.value > 31
  ) {
    setErrorState(dayInput, "Must be a valid day");
    valid = false;
  }

  if (monthInput.value === "") {
    setErrorState(monthInput, "This field is required.");
    valid = false;
  } else if (
    isNaN(monthInput.value) ||
    +monthInput.value < 1 ||
    +monthInput.value > 31
  ) {
    setErrorState(monthInput, "Must be a valid month");
    valid = false;
  }

  if (yearInput.value === "") {
    setErrorState(yearInput, "This field is required.");
    valid = false;
  } else if (isNaN(yearInput.value) || +yearInput.value > now.getFullYear()) {
    setErrorState(yearInput, "Must be a valid year");
    valid = false;
  }

  if (!valid) {
    return;
  }

  const inputDate = new Date(
    `${yearInput.value}/${monthInput.value}/${dayInput.value}`
  );

  if (inputDate.getDate() !== +dayInput.value) {
    setErrorState(dayInput, "Must be a valid date");
    setErrorState(monthInput);
    setErrorState(yearInput);
    valid = false;
  }

  if (!valid) {
    return;
  }

  let yearsPassed = now.getFullYear() - inputDate.getFullYear();
  let monthsPassed = now.getMonth() - inputDate.getMonth();
  let daysPassed = now.getDate() - inputDate.getDate();
  if (monthsPassed < 0) {
    yearsPassed -= 1;
    monthsPassed += 12;
  }
  if (daysPassed < 0) {
    monthsPassed -= 1;
    daysPassed += new Date(+yearInput.value, +monthInput.value, 0).getDate();
  }

  document.getElementById("years").innerText = yearsPassed;
  document.getElementById("months").innerText =
    monthsPassed < 10 ? "0" + monthsPassed : monthsPassed;
  document.getElementById("days").innerText = daysPassed;
});

function resetUI() {
  document
    .querySelectorAll("#form .error")
    .forEach((elem) => elem.classList.remove("error"));
  document
    .querySelectorAll("#form .error-message")
    .forEach((elem) => elem.remove());
}

function setErrorState(elem, message = null) {
  if (message !== null) {
    elem.insertAdjacentHTML(
      "afterend",
      `<p class="error-message">${message}</p>`
    );
  }
  elem.parentElement.classList.add("error");
}

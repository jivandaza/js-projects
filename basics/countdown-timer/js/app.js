// data months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// data weekdays
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// select items
const $titleGiveaway = document.querySelector(".giveaway"),
  $deadLine = document.querySelector(".deadline"),
  $items = document.querySelectorAll(".deadline-format h4");

// date: 2023/Feb/28 | time: 17:30:00
let futureDate = new Date(2023, 1, 28, 17, 30, 0);

// get giveaway title
const getGiveawayTitle = () => {
  const year = futureDate.getFullYear(),
    hours = futureDate.getHours(),
    minutes = futureDate.getMinutes(),
    month = months[futureDate.getMonth()],
    date = futureDate.getDate(),
    weekday = weekdays[futureDate.getDay()];
  
  $titleGiveaway.textContent
    = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}: ${minutes}am`;
}

// get remaining time
const getRemainingTime = () => {
  let giveawayDate = futureDate - new Date();

  // the gift time is up
  if (giveawayDate < 0) {
    $items.forEach((item) => {
      item.innerHTML = "00";
    });
    clearInterval(countdown);
    $msgGiveaway = document.createElement("h4");
    $msgGiveaway.classList.add("expired")
    $msgGiveaway.textContent = "sorry, this giveaway has expired";
    $deadLine.insertAdjacentElement("afterend", $msgGiveaway);
    return; 
  }
  
  // value in ms
  const oneDay = 24 * 60 * 60 * 1000,
    oneHour = 1000 * 60 * 60,
    oneMinute = 1000 * 60,
    oneSeconds = 1000;
  
  // calculate values time
  const days = Math.floor(giveawayDate / oneDay);
  giveawayDate -= days * oneDay;
  const hours = Math.floor(giveawayDate / oneHour);
  giveawayDate -= hours * oneHour;
  const minutes = Math.floor(giveawayDate / (oneMinute));
  giveawayDate -= minutes * oneMinute;
  const seconds = Math.floor(giveawayDate / oneSeconds);
  giveawayDate -= seconds * oneSeconds;

  // set values time array
  const values = [days, hours, minutes, seconds];

  // show values time array
  $items.forEach((item, index) => {
    item.innerHTML = values[index] < 10 ? `0${values[index]}` : values[index];
  });
}

// run giveaway time
const countdown = 
  setInterval(
    () => getRemainingTime(),
    1000
  );

document.addEventListener("DOMContentLoaded", () => {
  getGiveawayTitle();
  getRemainingTime();
});



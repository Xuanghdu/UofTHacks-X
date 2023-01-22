const topContainer = document.getElementById("top-container");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

const clockPageIDs = [
  "point-towards-sun-page",
  "bisector-pointing-south-page",
  "real-south-direction-page",
  "error-sun-direction-page",
  "error-local-time-page",
  "error-system-error-page",
];
const mainPageIDs = ["introduction-page"].concat(clockPageIDs, ["thank-you-page"]);
const allPageIDs = ["splash-page"].concat(mainPageIDs);

function goToPageWithID(pageID) {
  topContainer.classList.remove("at-clock-pages", ...allPageIDs.map(id => "at-" + id));
  topContainer.classList.add("at-" + pageID);
  if (clockPageIDs.includes(pageID)) {
    topContainer.classList.add("at-clock-pages");
  }
  const index = mainPageIDs.indexOf(pageID);
  if (index === 0) {
    previousButton.classList.add("button-disabled");
  } else {
    previousButton.classList.remove("button-disabled");
    previousButton.onclick = () => goToPageWithID(mainPageIDs[index - 1]);
  }
  if (index === mainPageIDs.length - 1) {
    nextButton.classList.add("button-disabled");
  } else {
    nextButton.classList.remove("button-disabled");
    nextButton.onclick = () => goToPageWithID(mainPageIDs[index + 1]);
  }
}

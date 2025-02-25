function handleMenu() {
  const navDialog = document.getElementById("nav-dialog");
  navDialog.classList.toggle("hidden");
}

const initialTranslateLTR = -18 * 4;
const initialTranslateRTL = 18 * 4;

function setUpIntersectionObserver(element, isLTR, speed) {
  const intersectionCallback = (entries) => {
    const isIntersecting = entries[0].isIntersecting;
    if (isIntersecting) {
      document.addEventListener("scroll", scrollHandler);
    } else {
      document.removeEventListener("scroll", scrollHandler);
    }
  };
  const intersectionObserver = new IntersectionObserver(intersectionCallback);
  intersectionObserver.observe(element);

  function scrollHandler() {
    const translateX =
      (window.innerHeight - element.getBoundingClientRect().top) * speed;
    let totalTranslate = 0;
    if (isLTR) {
      totalTranslate = translateX + initialTranslateLTR;
    } else {
      totalTranslate = -(translateX + initialTranslateRTL);
    }
    element.style.transform = `translateX(${totalTranslate}px)`;
  }
}

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
const line4 = document.getElementById("line4");

setUpIntersectionObserver(line1, true, 0.15);
setUpIntersectionObserver(line2, false, 0.15);
setUpIntersectionObserver(line3, true, 0.15);
setUpIntersectionObserver(line4, true, 0.8);

const dtElements = document.querySelectorAll("dt").forEach((dtElement) => {
  dtElement.addEventListener("click", () => {
    console.log("clicked");
    const ddId = dtElement.getAttribute("aria-controls");
    const ddElement = document.getElementById(ddId);
    const arrowIcon = dtElement.querySelector("i");

    ddElement.classList.toggle("hidden");
    arrowIcon.classList.toggle("-rotate-180");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const codeSnippet = document.getElementById("code-snippet");
  const lines = codeSnippet.querySelectorAll(".hidden-line");

  // Intersection Observer to detect scroll into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lines.forEach((line, index) => {
            setTimeout(() => {
              line.style.opacity = "1";
            }, index * 300); // Delay each line by 500ms
          });

          setTimeout(() => {
            document.getElementById("app-icon").classList.add("bounce");
          }, lines.length * 300 + 500);

          setTimeout(() => {
            document.getElementById("badge").classList.add("opacity-100");
            document.getElementById("app-label").classList.add("opacity-100");
          }, lines.length * 300 + 1000);

          observer.unobserve(codeSnippet); // Stop observing once triggered
        }
      });
    },
    { threshold: 0.3 }
  ); // Trigger when 30% of the element is visible

  observer.observe(codeSnippet);
});

let posX = 0;
let posY = 0;
let speedX = 0.5; // Adjust speed for smoother movement
let speedY = 0.5;
let maxOffset = 200; // Maximum movement range

function animateBackground() {
  posX += speedX;
  posY += speedY;

  if (Math.abs(posX) >= maxOffset || Math.abs(posY) >= maxOffset) {
    speedX *= -1; // Reverse direction when reaching limits
    speedY *= -1;
  }

  document.getElementById("animatedDiv").style.setProperty("--posX", posX);
  document.getElementById("animatedDiv").style.setProperty("--posY", posY);

  requestAnimationFrame(animateBackground);
}

animateBackground();

const progressStages = [
  { message: "Downloading version 1.12.3...", percentage: 10 },
  { message: "Extracting app...", percentage: 40 },
  { message: "Installing packages...", percentage: 70 },
  { message: "Installed!", percentage: 100 },
];

let currentStage = 0;

function updateProgress() {
  if (currentStage < progressStages.length) {
    const { message, percentage } = progressStages[currentStage];

    document.getElementById("progressMessage").textContent = message;
    document.getElementById("progressBar").style.width = percentage + "%";

    currentStage++;
    setTimeout(updateProgress, 1500); // Delay before next stage
  }
}

let observerTriggered = false;
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !observerTriggered) {
      observerTriggered = true; // Prevent re-triggering
      updateProgress();
    }
  });
});

observer.observe(document.getElementById("progressContainer"));

const toggleSwitch = document.getElementById("auto-toggle");

const observernew = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        toggleSwitch.checked = !toggleSwitch.checked; // Toggle the switch
      }, 2000);
    }
  });
});

observernew.observe(document.getElementById("auto-toggle"));

let toggleBtn = document.querySelector(".menu-toggle");
let sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

let currentSlideIndex = 0;

let slides = document.querySelectorAll(".slides");
let prev = document.querySelector(".slideshow-nav .prev");
let next = document.querySelector(".slideshow-nav .next");

let lastSlideIndex = slides.length - 1;
let firstSlideIndex = 0;

function goLeft() {
  slides[currentSlideIndex].classList.remove("active");

  currentSlideIndex =
    currentSlideIndex === firstSlideIndex
      ? lastSlideIndex
      : currentSlideIndex - 1;

  slides[currentSlideIndex].classList.add("active");
}

function goRight() {
  slides[currentSlideIndex].classList.remove("active");

  currentSlideIndex =
    currentSlideIndex === lastSlideIndex
      ? firstSlideIndex
      : currentSlideIndex + 1;

  slides[currentSlideIndex].classList.add("active");
}

prev.addEventListener("click", goLeft);
next.addEventListener("click", goRight);

setInterval(goRight, 8000);

let tabcontents = document.querySelectorAll(".tabcontent");
let tabs = document.querySelectorAll(".blog-tab");

function changeActiveTab(clickedTab) {
  tabs.forEach((tab) => tab.classList.remove("active"));

  clickedTab.classList.add("active");
}

function changeTabContent(month) {
  tabcontents.forEach((tabcontent) =>
    tabcontent.setAttribute("style", "display: none")
  );

  document.getElementById(month).setAttribute("style", "display: block");
}

function openBlogs(e, month) {
  e.stopImmediatePropagation();
  let clickedTab = e.currentTarget;

  changeActiveTab(clickedTab);
  changeTabContent(month);
}

let allSections = [
  document.querySelector("header"),
  ...document.querySelectorAll("section"),
];

let sidebarItems = document.querySelectorAll(".sidebar-menu li");

function setActive(element) {
  sidebarItems.forEach((item) => item.classList.remove("active"));

  element.classList.add("active");
}

function changeActiveMenu() {
  let fromTop = window.scrollY;

  sidebarItems.forEach((item) => {
    let link = item.querySelector("a");
    let dot = item.querySelector(".dot");
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      item.classList.add("active");
      dot.classList.add("active");
    } else {
      item.classList.remove("active");
      dot.classList.remove("active");
    }
  });
}

sidebarItems.forEach((item) => {
  item.addEventListener("click", () => setActive(item));
});

window.addEventListener("scroll", _.throttle(changeActiveMenu, 150));

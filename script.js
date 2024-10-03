"use strict";

//////////////////////////////////////////////////////////
//modalBox
const modalBox = document.querySelector(".modal-cuntact");
const overly = document.querySelector(".overly");

const openModal = function () {
  modalBox.classList.remove("hidden");
  overly.classList.remove("hidden");
};
const closeModal = function () {
  modalBox.classList.add("hidden");
  overly.classList.add("hidden");
};
document.querySelector(".btn-contactUs").addEventListener("click", openModal);
document.querySelector(".close").addEventListener("click", closeModal);
document.querySelector(".overly").addEventListener("click", closeModal);

////////////////////////////////////////////////////
//////tab
const btnContainer = document.querySelector(".role-tabs__container");
const btnRole = document.querySelectorAll(".btn-role");
const contentContainer = document.querySelectorAll(".content-container");

btnContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".btn-role");
  if (!clicked) return;
  btnRole.forEach((el) => el.classList.remove("btn-role__active"));
  contentContainer.forEach((el) =>
    el.classList.remove("content-container__active")
  );

  clicked.classList.add("btn-role__active");
  document
    .querySelector(`.content-role__${clicked.dataset.tab}`)
    .classList.add("content-container__active");
});

//////////////////////////////////////////////////////////////////////////////
//scroll smoth
document.querySelector(".menu").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("menu-item")) {
    const id = e.target.getAttribute("href");
    const closeBtn = document.querySelector('.close');
    if(closeBtn.classList.contains('close-active')){
      document.querySelector(".menu").classList.remove('menu-active');
      closeBtn.classList.remove('close-active');
    }
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////////////////////////
//hover Navigation

const menuContainer = document.querySelector(".menu");
const menuItem = document.querySelectorAll(".menu-item");

const checkHover = function (e) {
  const link = e.target;
  if (link.classList.contains("menu-item")) {
    const soblings = link.closest(".menu").querySelectorAll(".menu-item");
    soblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

menuContainer.addEventListener("mouseover", checkHover.bind(0.5));
menuContainer.addEventListener("mouseout", checkHover.bind(1));

/////////////////////////////////////////////////
//sticky

const headerC = document.querySelector("#header");
const nav = document.querySelector(".nav");
const navHeight = document.querySelector(".nav").getBoundingClientRect().height;

const stickyCalc = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const stickyOps = new IntersectionObserver(stickyCalc, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

stickyOps.observe(headerC);

////////////////////////////////////////////////
//slomation section

const allSection = document.querySelectorAll("section");
const calcSectionSlowmation = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const slowmationObserver = new IntersectionObserver(calcSectionSlowmation, {
  root: null,
  threshold: 0.13,
});

allSection.forEach((e) => {
  slowmationObserver.observe(e);
  e.classList.add("section-hidden");
});

///////////////////////////////////////////////////
//show realQulity

const projectImg = document.querySelectorAll(".project-img");

const showObser = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  const highQuality = entry.target.dataset.img;
  entry.target.src = highQuality;
  entry.target.addEventListener("load", function () {
    console.log("aaa");

    entry.target.classList.remove("img-project__blur");
  });
  observer.unobserve(entry.target);
};

const displayImgObserver = new IntersectionObserver(showObser, {
  root: null,
  threshold: 0.1,
});

projectImg.forEach((e) => {
  displayImgObserver.observe(e);
});

/////////////////////////////////////////
//slider

const slides = document.querySelectorAll(".slidebox");

const btnRight = document.querySelector(".slide-to__right");
const btnLeft = document.querySelector(".slide-to__left");
let curSlide = 0;
const maxSlide = slides.length;

const dotActive = function (slide) {
  document
    .querySelectorAll(".dot")
    .forEach((el, i) => el.classList.remove("dot-active"));
  
  document.querySelector(`.dot[data-slide="${slide}"]`).classList.add('dot-active');
};


const calcSlider = function (slide) {
  slides.forEach((e, i) => {
    e.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  console.log(curSlide);
  calcSlider(curSlide);
  dotActive(curSlide);
};

const prevSlide = function () {
  if (curSlide <= 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  calcSlider(curSlide);
  dotActive(curSlide);
};


calcSlider(0);


btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function (e) {

  if (e.key === "ArrowRight") return nextSlide();
  if (e.key === "ArrowLeft") return prevSlide();
});

const dotContainer = document.querySelector(".slide-dots");

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    calcSlider(e.target.dataset.slide);
    dotActive(e.target.dataset.slide);
    // console.log();
  }
});


//////////////////////////////
//active burger
const menuBtn = document.querySelector(".burger");
const menuCloseBtn = document.querySelector(".close");
menuBtn.addEventListener('click', function(e){
  e.preventDefault();
  document.querySelector(".menu").classList.add('menu-active');
  document.querySelector(".close").classList.add('close-active');
});

menuCloseBtn.addEventListener('click',function(e){
  console.log('good');
  e.preventDefault();
  document.querySelector(".menu").classList.remove('menu-active');
  document.querySelector(".close").classList.remove('close-active');
});

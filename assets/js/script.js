'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // element toggle function
  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // modal variable
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }

  // add click event to modal close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }

  if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
  }

  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // add event in all select items
  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function (selectedValue) {
    filterItems.forEach(item => {
      if (selectedValue === "all") {
        item.classList.add("active");
      } else if (selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // add event to all form input field
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });

  // page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // add event to all nav link
  navigationLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault(); // Prevent any default button behavior
      
      // Remove active class from all links and pages
      navigationLinks.forEach(l => l.classList.remove("active"));
      pages.forEach(page => page.classList.remove("active"));
      
      // Add active class to clicked link
      this.classList.add("active");
      
      // Get the page name from the button text and convert to lowercase
      const pageName = this.textContent.toLowerCase().trim();
      
      // Find and activate the corresponding page
      const targetPage = document.querySelector(`[data-page="${pageName}"]`);
      if (targetPage) {
        targetPage.classList.add("active");
        console.log(`Activating page: ${pageName}`);
      } else {
        console.error(`Page not found: ${pageName}`);
      }
      
      // Scroll to top
      window.scrollTo(0, 0);
    });
  });
});

// Modal functions (these need to be global)
function closeAllOpenModals() {
  let modals = document.getElementsByClassName("modal");
  if (modals) {
    for (let i = 0; i < modals.length; i++) {
      let modal = modals[i];
      modal.classList.remove("show-modal");
    }
  }
}

function openModal(project) {
  //close all modals before
  closeAllOpenModals();

  let modalName = `.modal.${project}`;
  //get modal
  let modal = document.querySelector(modalName);
  //check if modal is set
  if (modal) {
    //show modal
    modal.classList.add("show-modal");
  }
}

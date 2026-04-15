const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

if (currentPage !== "index.html") {
  window.location.replace("./index.html");
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("nav-open");
  });
}

const issuesSearch = document.getElementById("issues-search");
const issuesList = document.getElementById("issues-list");

if (issuesSearch && issuesList) {
  const issuesItems = Array.from(issuesList.querySelectorAll(".issue-item"));

  issuesSearch.addEventListener("input", () => {
    const query = issuesSearch.value.trim().toLowerCase();

    issuesItems.forEach((item) => {
      const visible = item.textContent.toLowerCase().includes(query);
      item.style.display = visible ? "" : "none";
    });
  });
}

if (currentPage === "index.html") {
  const blockedControls = document.querySelectorAll(
    ".btn, .primary-nav a, .footer-links a, .phone-link, .top-contact-inner a, .menu-toggle, .calendly-inline-widget"
  );

  blockedControls.forEach((element) => {
    element.classList.add("is-disabled-control");
    element.setAttribute("aria-disabled", "true");

    if (element.tagName === "A") {
      element.setAttribute("href", "#");
      element.setAttribute("tabindex", "-1");
    }

    if (element.tagName === "BUTTON") {
      element.setAttribute("disabled", "true");
    }

    element.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  });
}

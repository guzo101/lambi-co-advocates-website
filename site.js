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

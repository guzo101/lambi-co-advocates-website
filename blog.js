(function () {
  const STORAGE_KEY = "lambi_blog_posts_v1";

  const defaultPosts = [
    {
      id: "post-energy-market-zambia-open-access",
      title: "Zambia's Electricity Open Access Market: What It Means",
      author: "LAMBI & Co. Advocates",
      category: "Energy Law",
      publishedAt: "2026-04-15T09:00:00.000Z",
      excerpt:
        "Zambia has launched an open access electricity market, allowing independent power producers to use ZESCO infrastructure and sell directly to bulk consumers.",
      content:
        "Zambia has launched the electricity open access market. This means Independent Power Producers (IPPs) can now use ZESCO or CEC infrastructure to sell directly to bulk consumers.\n\nThe market is no longer a monopoly; it is now a marketplace.\n\nFrom securing your ERB license to structuring high-stakes PPAs and PPS, we provide the legal foundation for solar developers and commercial consumers to power Zambia's future.\n\nContact us:\nInfo@lambilegal.com\n+260 950 078770",
      imageUrl: ""
    },
    {
      id: "post-land-transfers-due-diligence",
      title: "Land Transfers: Why Due Diligence Comes First",
      author: "LAMBI & Co. Advocates",
      category: "Property Law",
      publishedAt: "2026-04-14T08:30:00.000Z",
      excerpt:
        "Before buying land, proper legal checks protect you from title disputes and future loss.",
      content:
        "Land transactions in Zambia should always begin with legal due diligence. We verify title history, encumbrances, and transaction validity before commitment.\n\nThis reduces exposure to disputes, fraud, and registration delays.\n\nFor buyers and developers, proactive legal review is often the difference between a secure purchase and a costly dispute.",
      imageUrl: ""
    },
    {
      id: "post-employment-discipline-process",
      title: "Employment Discipline: Steps Employers Must Follow",
      author: "LAMBI & Co. Advocates",
      category: "Employment Law",
      publishedAt: "2026-04-13T10:00:00.000Z",
      excerpt:
        "Fair procedure and proper documentation are essential in workplace disciplinary matters.",
      content:
        "Employers should follow lawful disciplinary procedures, issue clear notices, and allow a proper hearing process.\n\nEmployees should understand their rights to respond and to be treated fairly.\n\nOur team supports both employers and employees in resolving disciplinary and termination matters in compliance with Zambian law.",
      imageUrl: ""
    },
    {
      id: "post-commercial-contracts-risk",
      title: "Commercial Contracts: Three Risks to Fix Early",
      author: "LAMBI & Co. Advocates",
      category: "Commercial Law",
      publishedAt: "2026-04-12T09:30:00.000Z",
      excerpt:
        "Unclear payment terms, vague obligations, and weak dispute clauses create avoidable risk.",
      content:
        "Most contract disputes start from preventable drafting gaps. We focus on three key areas early: payment certainty, performance obligations, and dispute-resolution mechanisms.\n\nWhen contracts are clear from the start, business relationships are stronger and enforcement is easier when disagreements arise.",
      imageUrl: ""
    }
  ];

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getPosts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        return [...defaultPosts];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        return [...defaultPosts];
      }
      const byId = new Map(parsed.map((post) => [post.id, post]));
      for (const defaultPost of defaultPosts) {
        if (!byId.has(defaultPost.id)) {
          byId.set(defaultPost.id, defaultPost);
        }
      }
      const merged = Array.from(byId.values()).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    } catch (error) {
      return [...defaultPosts];
    }
  }

  function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  function renderPosts() {
    const list = document.getElementById("blog-list");
    if (!list) return;

    const posts = getPosts();
    list.innerHTML = posts
      .map((post) => {
        const dateLabel = new Date(post.publishedAt).toLocaleDateString("en-ZM", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        const imageMarkup = post.imageUrl
          ? `<img class="blog-card-image" src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.title)}">`
          : "";
        return `
          <article class="blog-card">
            ${imageMarkup}
            <div class="blog-card-content">
              <p class="blog-meta">${escapeHtml(post.category)} | ${dateLabel} | ${escapeHtml(post.author)}</p>
              <h2>${escapeHtml(post.title)}</h2>
              <p>${escapeHtml(post.excerpt)}</p>
              <details class="blog-details">
                <summary>Read full post</summary>
                <p>${escapeHtml(post.content).replace(/\n/g, "<br>")}</p>
              </details>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderHomePreview() {
    const preview = document.getElementById("home-blog-preview");
    if (!preview) return;
    const posts = getPosts().slice(0, 4);
    preview.innerHTML = posts
      .map(
        (post) => `
          <article class="info-card">
            <p class="blog-meta">${escapeHtml(post.category)}</p>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.excerpt)}</p>
            <a href="./blog.html">Read on Blog</a>
          </article>
        `
      )
      .join("") + `
        <article class="info-card">
          <p class="blog-meta">More Insights</p>
          <h3>Read All Blog Posts</h3>
          <p>Explore all legal updates, analyses, and firm publications.</p>
          <a class="btn btn-primary" href="./blog.html">Go to Blog Page</a>
        </article>
      `;
  }

  function setupPostForm() {
    const form = document.getElementById("post-blog-form");
    if (!form) return;
    const statusEl = document.getElementById("post-blog-status");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const post = {
        id: `post-${Date.now()}`,
        title: String(formData.get("title") || "").trim(),
        author: String(formData.get("author") || "").trim(),
        category: String(formData.get("category") || "").trim(),
        excerpt: String(formData.get("excerpt") || "").trim(),
        content: String(formData.get("content") || "").trim(),
        imageUrl: String(formData.get("imageUrl") || "").trim(),
        publishedAt: new Date().toISOString()
      };

      if (!post.title || !post.author || !post.category || !post.excerpt || !post.content) {
        if (statusEl) statusEl.textContent = "Please fill all required fields.";
        return;
      }

      const posts = getPosts();
      posts.unshift(post);
      savePosts(posts);

      form.reset();
      const authorInput = document.getElementById("post-author");
      if (authorInput) authorInput.value = "LAMBI & Co. Advocates";
      if (statusEl) statusEl.textContent = "Blog post published successfully. Open the Blog page to view it.";
    });
  }

  function setupResetButton() {
    const resetBtn = document.getElementById("clear-blog-posts-btn");
    if (!resetBtn) return;

    resetBtn.addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
      renderPosts();
    });
  }

  renderPosts();
  renderHomePreview();
  setupPostForm();
  setupResetButton();
})();

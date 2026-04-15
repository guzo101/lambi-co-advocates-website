const contactForm = document.getElementById("contact-form");
const contactFormStatus = document.getElementById("contact-form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone || !service || !message) {
      if (contactFormStatus) {
        contactFormStatus.textContent = "Please fill all required fields before sending.";
      }
      return;
    }

    const lines = [
      "Hello LAMBI & Co. Advocates,",
      "",
      "I would like to make an enquiry:",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Service: ${service}`,
      `Message: ${message}`
    ];

    const text = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/260962268294?text=${text}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (contactFormStatus) {
      contactFormStatus.textContent = "Your enquiry has been prepared in WhatsApp. Please send it from the opened chat.";
    }
  });
}

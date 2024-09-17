AOS.init();
// menu
const mobileMenu = document.getElementById("mobile-menu");
const navbarMenu = document.querySelector(".navbar-menu");

mobileMenu.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
});
// recent work
const filterButtons = document.querySelectorAll(".filter-btn");
const workLinks = document.querySelectorAll(".worklink");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.getAttribute("data-category");

    workLinks.forEach((work) => {
      const workCategory = work.getAttribute("data-category");

      if (selectedCategory === "all" || workCategory === selectedCategory) {
        work.classList.remove("hidden");
      } else {
        work.classList.add("hidden");
      }
    });

    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");
  });
});
// swiper
const swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: false,
});
// rating
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const ratingInput = document.getElementById("rating-input");
  let selectedRating = 0;

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.getAttribute("data-value"));
      ratingInput.value = selectedRating;
      stars.forEach((s) => {
        s.classList.remove("selected");
        if (parseInt(s.getAttribute("data-value")) <= selectedRating) {
          s.classList.add("selected");
        }
      });
    });
  });
});

const ratbtn = document.getElementById("ratbtn");
ratbtn.addEventListener("click", function () {
  alert("Rated Successfully");
  location.reload();
});

// Email.js
const formmail = document.getElementById("contact_form");
const contactmesg = document.getElementById("contact_message");

const sendEmail = (e) => {
  e.preventDefault();

  // serviceId ,templateId,#form,publickey
  emailjs
    .sendForm(
      "service_qq9lo8r",
      "template_odk6y9p",
      "#contact_form",
      "BVrbKL6tfEuAhjrq4"
    )
    .then(() => {
      // show message
      contactmesg.textContent = "Message sent successfully";
      // remove msg after 5 sec
      setTimeout(() => {
        contactmesg.textContent = "";
      }, 5000);
      // clear input fields
      formmail.reset();
    });
};
formmail.addEventListener("submit", sendEmail);
// up button
const upButton = document.getElementById("up");

window.addEventListener("scroll", () => {
  if (scrollY > 400) {
    upButton.style.bottom = "20px";
  } else {
    upButton.style.bottom = "-50%";
  }
});
upButton.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// chatbot
const chatbot = document.getElementById("chatbot-container");
const messageContainer = document.getElementById("messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("send-btn");
const closeButton = document.getElementById("close-chat-btn");
const messageButton = document.getElementById("mesgbtn");

chatSend.addEventListener("click", () => {
  const userMessage = chatInput.value.trim();
  if (userMessage) {
    addMessage("User", userMessage);
    getBotResponse(userMessage);
    chatInput.value = "";
  }
});

function addMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
function getBotResponse(userMessage) {
  let botMessage = "Sorry, I don't understand that.";

  if (userMessage.toLowerCase().includes("hello")) {
    botMessage = "Hello! How can I assist you today?";
  } else if (userMessage.toLowerCase().includes("portfolio")) {
    botMessage =
      'You can check my recent work in the "Work" section of the site!';
  } else if (userMessage.toLowerCase().includes("contact")) {
    botMessage =
      "Feel free to contact me via the form at the bottom of the page.";
  } else if (userMessage.toLowerCase().includes("skills")) {
    botMessage =
      "I am proficient in HTML, CSS, JavaScript, PHP, MySQL, React, Laravel, and more!";
  } else if (userMessage.toLowerCase().includes("services")) {
    botMessage =
      "I offer web development, web design, fullstack development, and AI services.";
  } else if (userMessage.toLowerCase().includes("availability")) {
    botMessage =
      "I am currently available for projects. Feel free to reach out through the contact form.";
  } else if (userMessage.toLowerCase().includes("pricing")) {
    botMessage =
      "Pricing varies depending on the scope of the project. Let’s discuss your needs, and I can provide a custom quote.";
  } else if (userMessage.toLowerCase().includes("experience")) {
    botMessage =
      "I have over 3 years of experience in web development, working on both frontend and backend projects.";
  } else if (userMessage.toLowerCase().includes("framework")) {
    botMessage = "I work with frameworks like React, Laravel, and Bootstrap.";
  } else if (userMessage.toLowerCase().includes("hire")) {
    botMessage =
      "I am always open to new opportunities. You can contact me via the form or connect with me on LinkedIn.";
  } else if (userMessage.toLowerCase().includes("thank you")) {
    botMessage = "You’re welcome! Feel free to ask if you have more questions.";
  } else if (userMessage.toLowerCase().includes("bye")) {
    botMessage = "Goodbye! Feel free to return if you have more questions.";
  } else if (userMessage.toLowerCase().includes("education")) {
    botMessage =
      "I have a solid foundation in web development through both self-learning and formal education.";
  } else if (userMessage.toLowerCase().includes("tools")) {
    botMessage =
      "I use a variety of tools including VSCode, Git, Postman, and Figma for design and development.";
  } else if (userMessage.toLowerCase().includes("recommend")) {
    botMessage =
      "I recommend learning JavaScript for anyone interested in web development. It’s versatile and widely used!";
  } else if (userMessage.toLowerCase().includes("hobbies")) {
    botMessage =
      "When I’m not coding, I enjoy exploring new technologies, playing video games, and keeping up with the latest in AI.";
  } else if (userMessage.toLowerCase().includes("projects")) {
    botMessage =
      'I have worked on a variety of projects including dynamic websites, portfolios, and fullstack applications. Check out the "Work" section!';
  } else if (userMessage.toLowerCase().includes("blog")) {
    botMessage =
      "You can find my technical blog posts where I share insights and tutorials on web development and programming.";
  } else if (userMessage.toLowerCase().includes("challenge")) {
    botMessage =
      "I’m always up for a challenge! Tell me more about the project you have in mind, and I’ll see how I can help.";
  } else if (userMessage.toLowerCase().includes("hi")) {
    botMessage = "hi! How can I assist you today?";
  } else if (userMessage.toLowerCase().includes("welcome")) {
    botMessage = "welcome! How can I assist you today?";
  } else {
    botMessage =
      "I'm sorry, I don't quite understand. Can you please rephrase?";
  }

  setTimeout(() => {
    addMessage("Bot", botMessage);
  }, 1000);
}

closeButton.addEventListener("click", () => {
  chatbot.style.display = "none";
  messageButton.style.display = "block";
});
messageButton.addEventListener("click", () => {
  chatbot.style.display = "block";
  messageButton.style.display = "none";
});

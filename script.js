
// Scroll progress bar
window.addEventListener("scroll", () => {
    const bar = document.getElementById("scrollBar");
    if (!bar) return;

    const scrollTop = document.documentElement.scrollTop;
    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    bar.style.width = (scrollTop / height) * 100 + "%";
});

// Active menu highlight
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Feedback form + localStorage
const form = document.getElementById("feedbackForm");
const successMsg = document.getElementById("successMsg");
const feedbackList = document.getElementById("feedbackList");

if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email.includes("@")) {
            alert("Please enter valid details");
            return;
        }

        const data = { name, message };
        const list = JSON.parse(localStorage.getItem("feedbacks")) || [];
        list.push(data);
        localStorage.setItem("feedbacks", JSON.stringify(list));

        successMsg.textContent = "Feedback submitted successfully!";
        form.reset();
        showFeedback();
    });
}

function showFeedback() {
    if (!feedbackList) return;
    feedbackList.innerHTML = "";
    (JSON.parse(localStorage.getItem("feedbacks")) || []).forEach(f => {
        const div = document.createElement("div");
        div.textContent = `${f.name}: ${f.message}`;
        feedbackList.appendChild(div);
    });
}
showFeedback();
// ===== Animated Counters (SAFE VERSION) =====
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let count = 0;
        const speed = 40;

        const updateCounter = () => {
            if (count < target) {
                count++;
                counter.textContent = count;
                setTimeout(updateCounter, speed);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
});

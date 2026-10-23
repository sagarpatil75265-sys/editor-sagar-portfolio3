/* ==========================================================
   EDITOR SAGAR, script.js
   1) Edit PROJECTS below to change, add or remove work.
   2) Everything else runs automatically.
   Paths are relative (no leading "/") so the site works
   inside a GitHub Pages repo subfolder.
   ========================================================== */

const PROJECTS = [
  {
    title: "vighnaharta phone shop ",
    category: "bussness owner",
    orientation: "vertical",
    thumbnail: "assets/images/vighnaharta.png",
    driveId: "1SQiL77Mq2orQUX05865KECzA6Bj87cgt",
    video: "",
  },
  {
    title: "fortuner legender",
    category: "Brand video",
    orientation: "horizontal",
    thumbnail: "assets/images/fortunerlegender.jpg",
    driveId: "1HYdaBDbRXPQ0W1ec0Qx7MynNJ8qT5rQ4",
    video: "",
  },
  {
    title: "fortuner amul edit",
    category: "Social Media Reel",
    orientation: "horizontal",
    thumbnail: "assets/images/fortuner-legender.jpg",
    driveId: "1_URBD98Rl9tdInOp1xvTAVd34xfWIMGD",
    video: "" ,
  },
  {
    title: "fortuner legender 2",
    category: "Local Business Promo",
    orientation: "horizontal",
    thumbnail: "assets/images/fortuner-reel.jpg",
    driveId: "1RaFuHanM_DNPuaQkH0uGqxjFYsjOPnQz",
    video: "",
  },
  {
    title: "munawar faruq",
    category: "Creator reel",
    orientation: "vertical",
    thumbnail: "assets/images/munavar.jpg",
    video: "assets/videos/munawarfinal.mp4",
  },
  {
    title: "prach vlogs degloor",
    category: "Social Media Reel",
    orientation: "horizontal",
    thumbnail: "assets/images/prachi vlogs.png",
    video: "assets/videos/prach-vlogs-degloor.mp4" ,
  },
  {
    title: "obssetion ",
    category: "movie edit",
    orientation: "horizontal",
    thumbnail: "assets/images/obession.jpg",
    driveId: "16jcd0DB854m0VMkouM_1-VljYTCPvMxM",
    video: "",
  },
];

// ---------- Elements ----------
const PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const grid = document.getElementById("project-grid");
const player = document.getElementById("player");
const video = document.getElementById("player-video");
const note = document.getElementById("player-note");
let lastCard = null;

document.documentElement.classList.add("js");
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Build the gallery ----------
PROJECTS.forEach((p) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card";
  card.setAttribute("aria-label", `Play ${p.title}`);
  card.innerHTML = `
    <div class="thumb" data-missing="Add thumbnail: ${p.thumbnail}">
      <img src="${p.thumbnail}" alt="" loading="lazy"
           onerror="this.parentElement.classList.add('is-missing')">
      <span class="play">${PLAY_ICON}</span>
    </div>
    <div class="card-meta">
      <h3>${p.title}</h3>
      <p>${[p.category, p.year].filter(Boolean).join(", ")}</p>
    </div>`;
  card.addEventListener("click", () => openPlayer(p, card));
  grid.appendChild(card);
});

// ---------- Video player ----------
const frame = document.getElementById("player-frame");

function openPlayer(p, card) {
  lastCard = card;
  document.getElementById("player-title").textContent = p.title;
  document.getElementById("player-meta").textContent =
    [p.category, p.year, p.description].filter(Boolean).join(" — ");
  note.hidden = true;

  if (p.driveId) {
    video.hidden = true;
    frame.hidden = false;
    frame.src = `https://drive.google.com/file/d/${p.driveId}/preview`;
  } else {
    frame.hidden = true;
    frame.removeAttribute("src");
    video.hidden = false;
    video.src = p.video;
    video.play().catch(() => {});
  }
  player.showModal();
}

function resetVideo() {
  video.pause();
  video.removeAttribute("src");
  video.load();
  frame.removeAttribute("src");
}
video.addEventListener("error", () => {
  const src = video.getAttribute("src");
  if (!src) return; // Ignore the error we cause when resetting
  note.textContent = `Video not found: ${src}. Add the file to assets/videos/ and check its name in js/script.js.`;
  note.hidden = false;
});

document.getElementById("player-close").addEventListener("click", () => player.close());

// Esc is handled natively by <dialog>; the close event handles cleanup for every close path
player.addEventListener("close", () => {
  resetVideo();
  if (lastCard) lastCard.focus();
});

// Click on the dark backdrop closes the player
player.addEventListener("click", (e) => {
  if (e.target === player) player.close();
});

// ---------- Subtle reveal on scroll ----------
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

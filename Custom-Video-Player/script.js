/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* Build out functions */
function playVideo() {
  video[video.paused ? "play" : "pause"]();
}
function changeIcon() {
  btnToggle.textContent = video.paused ? "►" : "❚ ❚";
}
function currentTime() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function changeRange() {
  video[this.name] = this.value;
}

function changeProgress(e) {
  let scrub = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrub;
}
function changeBar() {
  let persent = (this.currentTime / this.duration) * 100;
  progressBar.style.width = `${persent}%`;
}
function fullScreen() {
  player.classList.toggle("full-screen");
}
video.addEventListener("click", playVideo);
video.addEventListener("play", changeIcon);
video.addEventListener("pause", changeIcon);
video.addEventListener("timeupdate", changeBar);

btnToggle.addEventListener("click", playVideo);
btnSkip.forEach((skip) => skip.addEventListener("click", currentTime));
range.forEach((slider) => slider.addEventListener("change", changeRange));
range.forEach((slider) => slider.addEventListener("mousemove", changeRange));

size.addEventListener("click", fullScreen);

let mouseUse = false;
progress.addEventListener("mousemove", (e) => mouseUse && changeProgress(e));
progress.addEventListener("mousedown", () => (mouseUse = true));
progress.addEventListener("mouseup", () => (mouseUse = false));
progress.addEventListener("click", changeProgress);

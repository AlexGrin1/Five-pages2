/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".player__video__viewer");
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
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}
function currentTime() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function changeRange() {
  video[this.name] = this.value;
}

function changeProgress(e) {
  var scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
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

toggle.addEventListener("click", playVideo);
skipButtons.forEach((skip) => skip.addEventListener("click", currentTime));
ranges.forEach((slider) => slider.addEventListener("change", changeRange));
ranges.forEach((slider) => slider.addEventListener("mousemove", changeRange));

player.addEventListener("dblclick", fullScreen);

let mouseUse = false;
progress.addEventListener("mousemove", (e) => mouseUse && changeProgress(e));
progress.addEventListener("mousedown", () => (mouseUse = true));
progress.addEventListener("mouseup", () => (mouseUse = false));
progress.addEventListener("click", changeProgress);

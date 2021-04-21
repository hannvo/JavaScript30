// get elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const playButton = player.querySelector('.toggle');
const progressBox = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const sliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('.player__button[data-skip]');

// write functions
const togglePlay = () => {
  video.paused ? video.play() : video.pause();
}

const updatePlayButton = (e) => {
  playButton.innerText = e.target.paused ? '►' : '❚ ❚';
}

const skip = (e) => {
  const amount = parseFloat(e.currentTarget.dataset.skip);
  video.currentTime += amount;
}

const handleRangeUpdate = (e) => {
  const attr = e.currentTarget['name'];
  video[attr] = e.currentTarget.value;
}

const handleProgress = (e) => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

const scrub = (e) => {
  const ratio = (e.offsetX / progressBox.offsetWidth);
  video.currentTime = video.duration * ratio;
}

// hook up event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);
playButton.addEventListener('click', togglePlay);
skipButtons.forEach((button) => {
  button.addEventListener('click', skip);
})
sliders.forEach((slider) => {
  slider.addEventListener('change', handleRangeUpdate);
})
sliders.forEach((slider) => {
  slider.addEventListener('mousemove', handleRangeUpdate);
})

let mousedown = false
progressBox.addEventListener('click', scrub);
progressBox.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBox.addEventListener('mousedown', () => mousedown = true);
progressBox.addEventListener('mouseup', () => mousedown = false);

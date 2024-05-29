const img = document.querySelector("#img");
const playPause = document.querySelector("#playpause");
const playPauseBtn = document.querySelector("#playpause-btn");
const audio = document.querySelector("#audio");
const title = document.querySelector("#title");
const prevBtn = document.querySelector("#prevbtn");
const nextBtn = document.querySelector("#nextbtn");
const progress = document.querySelector("#progress");
const progressBar = document.querySelector(".progress-bar");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".duration-time");
const volume = document.querySelector("#volume");
const layer = document.querySelector(".layer");
const volBar = document.querySelector(".bar");
const progressLine = document.querySelector(".progress-line");
const volumeRange = document.querySelector(".volumerange");
const repeatBtn = document.querySelector("#repeat");
const likeBtn = document.querySelector("#like");
const likeIcon = document.querySelector("#likeicon");
const songListBtn = document.querySelector("#list");
const songList = document.querySelector("#songs-list");
const innerList = document.querySelector("#inner-list");
const listCloseBtn = document.querySelector("#listclose");
// songs array

let songs = [
  {
    path: "https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/1.mp3",
    displayName: "Yıldız Tozu",
    artist: "Ozbi",
    cover:
      "https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
  },
  {
    path: "https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/2.mp3",
    displayName: "You're Somebody Else",
    artist: "flora cash",
    cover: "https://pbs.twimg.com/media/D2NZH-2U4AAL9Xs.jpg",
  },
  {
    path: "https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/3.mp3",
    displayName: "Powerless",
    artist: "Linkin Park",
    cover:
      "https://images.genius.com/c5a58cdaab9f3199214f0e3c26abbd0e.1000x1000x1.jpg",
  },
  {
    path: "./assets/musics/jony_-_lali.mp3",
    displayName: "Лали",
    artist: "Jony",
    cover: "https://i.ru-music.cc/img/artists/full/jony.png",
  },
  {
    path: "https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/5.mp3",
    displayName: "Ederlezi",
    artist: "Solomun",
    cover: "https://m.media-amazon.com/images/I/616t0841uvL._SS500_.jpg",
  },
  {
    path: "https://raw.githubusercontent.com/saranshbhardwaj1999/audio/main/Justin_Bieber_Anyone.mp3",
    displayName: "Anyone",
    artist: "Justin Bieber",
    cover:
      "http://universalmusic.at/website2016/wp-content/uploads/2021/01/jb_anyone-single-cover_hr-1024x1024.jpg",
  },
  {
    path: "https://raw.githubusercontent.com/saranshbhardwaj1999/audio/main/Jon_Bellion_All_Time_Low.mp3",
    displayName: "All Time Low",
    artist: "Jon Bellion",
    cover:
      "https://www.teahub.io/photos/full/251-2512846_all-time-low-jon-bellion-album-art.jpg",
  },
];

// deafult song index

let songIndex = 0;

// song default state

let isPlaying = false;

let wishes = {
  list: [],
  count: 0,
  page: 1,
};

// song pause function

function playSong() {
  isPlaying = true;
  playPauseBtn.classList.replace("fa-play", "fa-pause");
  audio.play();
}

// song play function

function pauseSong() {
  isPlaying = false;
  playPauseBtn.classList.replace("fa-pause", "fa-play");
  audio.pause();
}

// loading songs

function loadSong(song) {
  img.src = song.cover;
  title.textContent = song.displayName;
  audio.src = song.path;
}

// previous song

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
  const isSong = songs.find((_, _index) => songIndex === _index);
  if (isSong.isLiked) {
    likeIcon.classList.replace("far", "fas");
  } else {
    likeIcon.classList.replace("fas", "far");
  }
}

// play song

function playMusic(index, isPlayed) {
  if (isPlayed) {
    return console.log("IsRunning");
  }
  songIndex = index;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
  musicList();
  renderList();
  const isSong = songs.find((_, _index) => index === _index);
  if (isSong.isLiked) {
    likeIcon.classList.replace("far", "fas");
  } else {
    likeIcon.classList.replace("fas", "far");
  }
}

// next song

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
  const isSong = songs.find((_, _index) => songIndex === _index);
  if (isSong.isLiked) {
    likeIcon.classList.replace("far", "fas");
  } else {
    likeIcon.classList.replace("fas", "far");
  }
}

// progress bar function

function updateProgress(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.target;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;
    progressLine.style.width = `${progressPercent}%`;
    if (progressPercent == 100) {
      return nextSong();
    }
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function progressSlide(e) {
  const { value } = e.target;
  const progressTime = Math.ceil((audio.duration / 100) * value);
  audio.currentTime = progressTime;
  if (!isPlaying) {
    progressLine.style.width = `${value}%`;
  }
}

function volumeBar() {
  layer.classList.toggle("hide");
  setTimeout(() => {
    if (layer.classList.contains("hide")) {
      layer.classList.remove("hide");
    }
  }, 5000);
}

function setVolume() {
  audio.volume = volumeRange.value;
  const barWidth = (volumeRange.value / 1) * 100;
  volBar.style.width = `${barWidth}%`;
}

function repeat() {
  repeatBtn.classList.toggle("color");
  const repeatBtnState = repeatBtn.classList.contains("color");
  if (repeatBtnState) {
    audio.loop = true;
    loadSong();
  } else {
    audio.loop = false;
    loadSong();
  }
}

function like() {
  songs = songs.map((item, index) => {
    if (index === songIndex) {
      if (!item?.isLiked) {
        likeIcon.classList.replace("far", "fas");
      } else {
        likeIcon.classList.replace("fas", "far");
      }
      return { ...item, isLiked: !item?.isLiked };
    }
    return item;
  });
  renderList();
}

function musicList() {
  songList.classList.toggle("showlist");

  listCloseBtn.addEventListener("click", () => {
    songList.classList.remove("showlist");
  });
}

function renderList() {
  innerList.innerHTML = songs
    .map(
      (music, index) =>
        `<div class="item-music ${
          songIndex === index ? "active" : ""
        }" onclick="playMusic(${index}, ${songIndex === index})">
        <img src="${music.cover}" alt="${music.artist}">
        <span>${music.displayName}</span>
        <button class="like btn">
        <i class="${music?.isLiked ? "fas fa-heart" : "far fa-heart"}"></i>
      </button>
      </div>`
    )
    .join("");
}

playPause.addEventListener("click", () =>
  isPlaying ? pauseSong() : playSong()
);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", progressSlide);
volume.addEventListener("click", volumeBar);
volumeRange.addEventListener("input", setVolume);
repeatBtn.addEventListener("click", repeat);
likeBtn.addEventListener("click", like);
songListBtn.addEventListener("click", musicList);

window.addEventListener("DOMContentLoaded", renderList);

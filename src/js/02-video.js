import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

// Listen to timeupdate event and save playback time to Local Storage
player.on(
  'timeupdate',
  throttle(() => {
    player.getCurrentTime().then(time => {
      localStorage.setItem('videoplayer-current-time', time);
    });
  }, 1000)
);

// When the page loads, it checks if there is a playback time saved in the local storage and continues playing from that time
window.addEventListener('DOMContentLoaded', () => {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime));
  }
});

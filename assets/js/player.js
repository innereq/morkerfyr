import Plyr from "plyr";

const controls = `
<div class="plyr__controls justify-center items-center bg-white">
  <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
    <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
    <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
  </button>
  <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
    <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
    <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
  </button>
    <div class="plyr__volume">
      <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
    </div>
  </button>
</div>
`;
const player = new Plyr("#player", {
  controls,
});

<script>
  import { RADIO_HOST, RADIO_MOUNT } from "../../morkerfyr.config";
  import { onMount } from "svelte";
  import Plyr from "plyr";

  let logoImage = "beacon_couple.webp";
  let radioStream = RADIO_HOST + RADIO_MOUNT;

  onMount(() => {
    // Audio player.
    // https://github.com/sampotts/plyr/blob/master/CONTROLS.md
    const controls = `
      <div class="plyr__controls flex-col dark:text-gray-300">
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

    return(() => {
      player.destroy();
    });
  });
</script>

<style>
  img {
    max-width: 341px;
  }
</style>

<div class="relative pb-5">
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src={logoImage} class="mx-auto rounded-full" />
  <div class="absolute inset-0 mx-auto pt-12 text-center">
    <h4 class="text-white text-3xl font-bold dark:text-gray-300">
      Mörkerfyr Radio
    </h4>
  </div>
  <div class="absolute inset-0 mx-auto pt-48">
    <!-- svelte-ignore a11y-media-has-caption -->
    <audio id="player" controls="controls" preload="none">
      <source src={radioStream} type="audio/mpeg" />
    </audio>
  </div>
</div>

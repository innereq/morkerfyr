<script>
  import {
    RADIO_HOST,
    RADIO_MOUNT,
    RADIO_MOUNT_SECONDARY,
  } from "../../morkerfyr.config";
  import { onMount } from "svelte";
  import ReconnectingEventSource from "reconnecting-eventsource";

  // Init global values.
  let songCurrent = "ничего";
  let songHistory = [];
  let mainRadioMountIsAlive = false;

  class Radio {
    constructor(mount) {
      this.url = RADIO_HOST + mount;
      this.metadata = this.url + "/metadata";
      this.history = this.metadata + "-history";
    }
  }

  // Get JSON from EventSource stream and set now playing track from it.
  function setNowPlayingSong(event) {
    const metadata = JSON.parse(event.data);
    songCurrent = metadata["metadata"];
    // Print now playing song.
    console.log("Now playing: " + songCurrent);
  }

  // Update and print history of last played songs.
  function updatePlayedSongsHistory(history) {
    fetch(history)
      .then((res) => res.json())
      .then((out) => {
        songHistory = out;
        console.log("History: ", songHistory);
      });
  }

  // Do things only when DOM is rendered.
  onMount(() => {
    // Main radio mount. Should be used when everything is fine.
    const radioStreamMain = new Radio(RADIO_MOUNT);
    // Secondary radio mount. Should be used if the main one is down. Fallback.
    const radioStreamSecondary = new Radio(RADIO_MOUNT_SECONDARY);

    try {
      const eventSourceMain = new ReconnectingEventSource.default(
        radioStreamMain.metadata
      );

      eventSourceMain.onmessage = function (event) {
        setNowPlayingSong(event);
        updatePlayedSongsHistory(radioStreamMain.history);
        mainRadioMountIsAlive = true;
      };

      eventSourceMain.onerror = function () {
        mainRadioMountIsAlive = false;
      };
    } catch (error) {
      console.log(error);
    }

    try {
      const eventSourceSecondary = new ReconnectingEventSource.default(
        radioStreamSecondary.metadata
      );

      // If value of now playing song on the main radio mount is empty,
      // replace it with value from the secondary radio mount. Fallback.
      //
      // If array of last played songs on the main radio mount is empty,
      // replace it with array from the secondary radio mount. Fallback.
      eventSourceSecondary.onmessage = function (event) {
        if (mainRadioMountIsAlive === false) {
          setNowPlayingSong(event);
          updatePlayedSongsHistory(radioStreamSecondary.history);
        }
      };
    } catch (error) {
      console.log(error);
    }
  });
</script>

<style>
</style>

<div class="text-center">
  <div class="mx-auto">
    <h4 class="text-3xl">🎶 {songCurrent} 🎶</h4>
  </div>

  <h4 class="text-3xl font-bold">История</h4>
  <ul>
    {#each songHistory.slice(1) as data}
      <li class="text-lg">{data.metadata.song}</li>
    {/each}
  </ul>
</div>

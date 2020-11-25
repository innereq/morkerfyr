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

  // Do things only when DOM is rendered.
  onMount(() => {
    // Main radio mount. Should be used when everything is fine.
    var radioStreamMain = new Radio(RADIO_MOUNT);
    // Secondary radio mount. Should be used if the main one is down. Fallback.
    var radioStreamSecondary = new Radio(RADIO_MOUNT_SECONDARY);

    try {
      var eventSourceMain = new ReconnectingEventSource.default(
        radioStreamMain.metadata
      );
      var eventSourceSecondary = new ReconnectingEventSource.default(
        radioStreamSecondary.metadata
      );

      eventSourceMain.onmessage = function (event) {
        // Get JSON from EventSource stream and get now playing track from it.
        var metadata = JSON.parse(event.data);
        songCurrent = metadata["metadata"];
        // Print now playing song.
        console.log("Now playing: " + songCurrent);

        // Set and print history of played songs.
        try {
          fetch(radioStreamMain.history)
            .then((res) => res.json())
            .then((out) => {
              songHistory = out;
              console.log("History: ", songHistory);
            });

          mainRadioMountIsAlive = true;
        } catch (error) {
          mainRadioMountIsAlive = false;
          console.log(error);
        }
      };

      eventSourceSecondary.onmessage = function (event) {
        // If value of now playing song on the main radio mount is empty,
        // replace it with value from the secondary radio mount. Fallback.
        if (mainRadioMountIsAlive === false) {
          // Get JSON from EventSource stream and get now playing track from it.
          var metadata = JSON.parse(event.data);
          songCurrent = metadata["metadata"];
          // Print now playing song.
          console.log("Now playing: " + songCurrent);
        }

        // Set and print history of played songs.
        try {
          // If array of latest played songs on the main radio mount is empty,
          // replace it with array from the secondary radio mount. Fallback.
          if (mainRadioMountIsAlive === false) {
            fetch(radioStreamMain.history)
              .then((res) => res.json())
              .then((out) => {
                songHistory = out;
                console.log("History: ", songHistory);
              });
          }
        } catch (error) {
          console.log(error);
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

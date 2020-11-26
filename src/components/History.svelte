<script>
  import { RADIO_MOUNT, RADIO_MOUNT_SECONDARY } from "../../morkerfyr.config";
  import { Radio } from "./Radio";
  import { onMount } from "svelte";

  // Init global values.
  let songCurrent = "ничего";
  let songHistory = [];
  let mainRadioMountIsAlive = false;

  // Get JSON from EventSource stream and set now playing track from it.
  async function setNowPlayingSong(event) {
    const metadata = await JSON.parse(event.data);
    songCurrent = metadata["metadata"];
    // Print now playing song.
    console.log("Now playing: " + songCurrent);
  }

  // Update and print history of last played songs.
  async function updatePlayedSongsHistory(history) {
    await fetch(history)
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
    const eventSourceMain = radioStreamMain.initEventSource();
    // Secondary radio mount. Should be used if the main one is down. Fallback.
    const radioStreamSecondary = new Radio(RADIO_MOUNT_SECONDARY);
    const eventSourceSecondary = radioStreamSecondary.initEventSource();

    eventSourceMain.addEventListener("message", (event) => {
      setNowPlayingSong(event);
      updatePlayedSongsHistory(radioStreamMain.history);
      mainRadioMountIsAlive = true;
    });

    eventSourceMain.addEventListener("error", () => {
      mainRadioMountIsAlive = false;
    });

    // If main radio mount is down, replace metadata with the secondary one.
    eventSourceSecondary.addEventListener("message", (event) => {
      if (mainRadioMountIsAlive === false) {
        setNowPlayingSong(event);
        updatePlayedSongsHistory(radioStreamSecondary.history);
      }
    });

    // Close spawned EventSource instances.
    return(async () => {
      await eventSourceMain.close();
      await eventSourceSecondary.close();
    });
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

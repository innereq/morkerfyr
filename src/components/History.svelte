<script>
  import { RADIO_HOST, RADIO_MOUNT } from "../../morkerfyr.config";
  import { onMount } from "svelte";
  import { nowplaying } from "../stores";

  // Init global value for now playing song.
  let songCurrent;
  let songHistory = [];
  // https://svelte.dev/tutorial/writable-stores
  const unsubscribe = nowplaying.subscribe((value) => {
    songCurrent = value;
  });

  // Do things only when DOM is rendered.
  onMount(() => {
    var urlStream = RADIO_HOST + RADIO_MOUNT;
    var urlMetadata = urlStream + "/metadata";
    var urlHistory = urlMetadata + "-history";

    try {
      var eventSource = new EventSource(urlMetadata);

      eventSource.onmessage = function (event) {
        var metadata = JSON.parse(event.data);
        songCurrent = metadata["metadata"];

        // Print now playing song.
        console.log("Now playing: " + songCurrent);
        // Change global state of now playing song.
        nowplaying.set(songCurrent);

        // Print history of played songs.
        try {
          fetch(urlHistory)
            .then((res) => res.json())
            .then((out) => {
              songHistory = out;
              console.log("History: ", songHistory);
            });
        } catch (error) {
          console.log(
            "Can't get history of played songs! (JSON parsing is failed)"
          );
          console.log(error);
        }
      };
    } catch (error) {
      console.log(
        "Can't get now playing song! (EventSource initializaion is failed)"
      );
      console.log(error);
    }
  });
</script>

<style>
</style>

<div class="text-center">
  <div class="mx-auto">
    <h4 class="text-3xl">🎶 {$nowplaying} 🎶</h4>
  </div>

  <h4 class="text-3xl font-bold">История</h4>
  <ul>
    {#each songHistory.slice(1) as data}
      <li class="text-lg">{data.metadata.song}</li>
    {/each}
  </ul>
</div>

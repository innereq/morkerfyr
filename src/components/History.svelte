<script>
  import { RADIO_HOST, RADIO_MOUNT, RADIO_MOUNT_SECONDARY } from "../../morkerfyr.config";
  import { onMount } from "svelte";
  import ReconnectingEventSource from "reconnecting-eventsource";

  // Init global values.
  let songCurrent = "ничего";
  let songHistory = [];

  // Do things only when DOM is rendered.
  onMount(() => {
    var urlStreamMain = RADIO_HOST + RADIO_MOUNT;
    var urlMetadataMain = urlStreamMain + "/metadata";
    var urlHistoryMain = urlMetadataMain + "-history";

    var urlStreamSecondary = RADIO_HOST + RADIO_MOUNT_SECONDARY;
    var urlMetadataSecondary = urlStreamSecondary + "/metadata";
    var urlHistorySecondary = urlMetadataSecondary + "-history";

    try {
      var eventSourceMain = new ReconnectingEventSource.default(urlMetadataMain);

      eventSourceMain.onmessage = function (event) {
        var metadata = JSON.parse(event.data);
        songCurrent = metadata["metadata"];

        // Print now playing song.
        console.log("Now playing: " + songCurrent);

        // Print history of played songs.
        try {
          fetch(urlHistoryMain)
            .then((res) => res.json())
            .then((out) => {
              songHistory = out;
              console.log("History: ", songHistory);
            });
        } catch (error) {
          console.log(error);
        }
      };
    } catch (error) {
      console.log(error);
    }

    try {
      var eventSourceSecondary = new ReconnectingEventSource.default(urlMetadataSecondary);

      eventSourceSecondary.onmessage = function (event) {
        if (songCurrent === "ничего") {
          var metadata = JSON.parse(event.data);
          songCurrent = metadata["metadata"];

          // Print now playing song.
          console.log("Now playing: " + songCurrent);
        }

        // Print history of played songs.
        try {
          if (!songHistory?.length) {
            fetch(urlHistorySecondary)
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
    } catch(error) {
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
